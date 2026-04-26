package com.auth.user.service;

import com.email.services.EmailService;
import com.auth.user.dto.rs.AuthResponseDto;
import com.auth.user.dto.rs.CurrentUserProfileDto;
import com.auth.user.entity.UserEntity;
import com.auth.user.repo.UserRepo;
import com.auth.user.roles.Role;
import com.auth.utils.JwtProvider;
import com.utils.enums.Errors;
import com.utils.enums.VerificationPurpose;
import com.utils.exceptions.ApiException;
import com.verification.repo.OtpRepo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Instant;
import java.util.UUID;

@Service
public class UserService {

    @Value("${jwt.tokens.access-expiration:300}")
    private Long accessTokenExpirationSeconds;

    @Value("${jwt.tokens.refresh-expiration:2592000}")
    private Long refreshTokenExpirationSeconds;
    private final UserRepo userRepo;
    private final OtpRepo otpRepo;
    private final JwtProvider jwtProvider;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final EmailService emailService;

    public UserService(UserRepo userRepo, OtpRepo otpRepo, JwtProvider jwtProvider, BCryptPasswordEncoder bCryptPasswordEncoder, EmailService emailService) {
        this.userRepo = userRepo;
        this.otpRepo = otpRepo;
        this.jwtProvider = jwtProvider;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.emailService = emailService;
    }

    public boolean passwordMatch(String stringPassword, String encodedPassword) {
        return bCryptPasswordEncoder.matches(stringPassword, encodedPassword);
    }

    @Transactional
    public AuthResponseDto createUser(String email, String password, UUID verificationToken) {
        if(userRepo.findByEmail(email).isPresent()) {
            throw new ApiException(Errors.EMAIL_ALREADY_EXISTS, "email");
        }

        if(otpRepo.findByEmailAndVerificationTokenAndPurposeAndTokenVerifiedTrue(email, verificationToken, VerificationPurpose.REGISTER).isEmpty()) {
            throw new ApiException(Errors.UNVERIFIED_BY_OTP_USER);
        }

        var encodedPassword = bCryptPasswordEncoder.encode(password);
        var newUser = new UserEntity(email, Role.USER, encodedPassword);
        newUser.setCreatedAt(Instant.now());
        //Берем почту и роль из БД, а не из запроса, чтобы никто не присвоил админские права через постман
        String accessToken = jwtProvider.createAccessToken(
                newUser.getEmail(),
                newUser.getRole().toString());
        String refreshToken;
        refreshToken = jwtProvider.createRefreshToken(newUser.getEmail());
        newUser.setRefreshToken(refreshToken);
        newUser.setRefreshTokenExpiration(Instant
                .now()
                .plusSeconds(refreshTokenExpirationSeconds));
        newUser.setPassword(encodedPassword);
        userRepo.save(newUser);
        return new AuthResponseDto(accessToken, refreshToken);
    }

    public AuthResponseDto login(String email, String password) {
        var user = userRepo.findByEmail(email)
                        .orElseThrow(() -> new ApiException(Errors.INVALID_EMAIL, "email"));
        if(!(passwordMatch(password, user.getPassword()))) {
            throw new ApiException(Errors.INVALID_PASSWORD, "password");
        }
        //Берем почту и роль из БД, а не из запроса, чтобы никто не присвоил админские права через постман
        String accessToken = jwtProvider.createAccessToken(
                user.getEmail(),
                user.getRole().toString());
        String refreshToken;
        if(user.getRefreshToken() == null || user.getRefreshTokenExpiration().isBefore(Instant.now())) {
            refreshToken = jwtProvider.createRefreshToken(user.getEmail());
            user.setRefreshToken(refreshToken);
            user.setRefreshTokenExpiration(Instant
                    .now()
                    .plusSeconds(refreshTokenExpirationSeconds));
            userRepo.save(user);
        } else {
            refreshToken = user.getRefreshToken();
        }
        return new AuthResponseDto(accessToken, refreshToken);
    }

    //DONE Если refresh истек прямо во время сессии
    //TODO Rotate refresh token
    public AuthResponseDto refreshToken(String refreshToken) {
        String email = jwtProvider.validateRefreshToken(refreshToken);
        var user = userRepo.findByEmail(email)
                .orElseThrow(() -> new ApiException(Errors.USER_NOT_FOUND));

        if(!(refreshToken.equals(user.getRefreshToken()))) {
            throw new ApiException(Errors.REFRESH_TOKEN_MISMATCH);
        }

        if(user.getRefreshTokenExpiration().isBefore(Instant.now())) {
            throw new ApiException(Errors.REFRESH_TOKEN_EXPIRED);
        }

        String accessToken = jwtProvider.createAccessToken(
                user.getEmail(),
                user.getRole().toString());

        return new AuthResponseDto(accessToken, refreshToken);
    }

    public AuthResponseDto setNewPassword(String email, String password, UUID verificationToken) {
        var user = userRepo.findByEmail(email)
                .orElseThrow(() -> new ApiException(Errors.INVALID_EMAIL, "email"));

        if(otpRepo.findByEmailAndVerificationTokenAndPurposeAndTokenVerifiedTrue(email, verificationToken, VerificationPurpose.RESET_PASSWORD).isEmpty()) {
            throw new ApiException(Errors.UNVERIFIED_BY_OTP_USER);
        }

        if(passwordMatch(password, user.getPassword())) {
            throw new ApiException(Errors.SAMENESS_PASSWORD, "password");
        }

        var encodedPassword = bCryptPasswordEncoder.encode(password);
        //Берем почту и роль из БД, а не из запроса, чтобы никто не присвоил админские права через постман
        String accessToken = jwtProvider.createAccessToken(
                user.getEmail(),
                user.getRole().toString());
        String refreshToken;
        refreshToken = jwtProvider.createRefreshToken(user.getEmail());
        user.setRefreshToken(refreshToken);
        user.setRefreshTokenExpiration(Instant
                    .now()
                    .plusSeconds(refreshTokenExpirationSeconds));
        user.setPassword(encodedPassword);
        userRepo.save(user);
        return new AuthResponseDto(accessToken, refreshToken);
    }
//TODO проработать механизм отправки письма - где хранится адрес отправителя, сформировать API тела с токеном

    public CurrentUserProfileDto getCurrentUserProfile(String email) {
        var user = userRepo.findByEmail(email)
                .orElseThrow(() -> new ApiException(Errors.USER_NOT_FOUND));

        return new CurrentUserProfileDto(
                user.getId(),
                user.getEmail(),
                user.getRole(),
                user.getCreatedAt()
        );
    }
}
