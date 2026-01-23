package com.auth.user.service;

import com.auth.email.services.EmailService;
import com.auth.user.dto.AuthResponseDto;
import com.auth.user.entity.UserEntity;
import com.auth.user.repo.UserRepo;
import com.auth.user.roles.Role;
import com.auth.utils.JwtProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.UUID;

@Service
public class UserService {

    //DONE Поменять время жизни токена
    //DONE Точно ли тут Instant и что это за класс
    @Value("${jwt.tokens.access-expiration:300}")
    private Long accessTokenExpirationSeconds;

    @Value("${jwt.tokens.refresh-expiration:2592000}")
    private Long refreshTokenExpirationSeconds;
    private final UserRepo userRepo;
    private final JwtProvider jwtProvider;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final EmailService emailService;

    public UserService(UserRepo userRepo, JwtProvider jwtProvider, BCryptPasswordEncoder bCryptPasswordEncoder, EmailService emailService) {
        this.userRepo = userRepo;
        this.jwtProvider = jwtProvider;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.emailService = emailService;
    }

    public boolean passwordMatch(String stringPassword, String encodedPassword) {
        return bCryptPasswordEncoder.matches(stringPassword, encodedPassword);
    }

    public void createUser(String email, String password) {
        if(userRepo.findByEmail(email).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "email already exist");
        }

        var encodedPassword = bCryptPasswordEncoder.encode(password);
        var newUser = new UserEntity(email, Role.USER, encodedPassword);
        userRepo.save(newUser);
    }

    public AuthResponseDto login(String email, String password) {
        var user = userRepo.findByEmail(email)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid email credentials"));
        if(!(passwordMatch(password, user.getPassword()))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid password");
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
                    //TODO Нужен ли this здесь и ниже
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
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));

        if(!(refreshToken.equals(user.getRefreshToken()))) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Refresh token mismatch");
        }

        if(user.getResetTokenExpiration().isBefore(Instant.now())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Refresh token expired");
        }

        String accessToken = jwtProvider.createAccessToken(
                user.getEmail(),
                user.getRole().toString());

        return new AuthResponseDto(accessToken, refreshToken);
    }

    public void redeemPassword(String email) {
        var user = userRepo.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));

        var token = UUID.randomUUID().toString();
        user.setResetToken(token);
        user.setResetTokenExpiration(Instant
                .now()
                .plusSeconds(this.accessTokenExpirationSeconds));
        userRepo.save(user);

        //TODO проработать механизм отправки письма - где хранится адрес отправителя, сформировать API тела с токеном
        emailService.sendEmail(user.getEmail(),"Сброс пароля", "Тело письма (тут токен в теле)");
    }

    public void resetPassword(String token, String password) {
        var user = userRepo.findByResetToken(token)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Temp token not found"));

        if(user.getResetTokenExpiration().isAfter(Instant.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token expired");
        }

        user.setPassword(password);
        user.setResetToken(null);
        user.setResetTokenExpiration(null);
        userRepo.save(user);
    }
}
