package com.auth.user.service;

import com.auth.configs.JwtConfig;
import com.auth.email.services.EmailService;
import com.auth.user.entity.UserEntity;
import com.auth.user.repo.UserRepo;
import com.auth.user.roles.Role;
import com.auth.utils.JwtActions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.UUID;

@Service
public class UserService {

    @Value("${token.expiration.seconds:300}")
    private Long tokenExpirationSeconds;
    private final UserRepo userRepo;
    private final JwtActions jwtActions;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final EmailService emailService;

    public UserService(UserRepo userRepo, JwtActions jwtActions, BCryptPasswordEncoder bCryptPasswordEncoder, EmailService emailService) {
        this.userRepo = userRepo;
        this.jwtActions = jwtActions;
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

        //TODO разобраться почему именно через bCrypt  зачем тогда нужен JwtConfig
        var encodedPassword = bCryptPasswordEncoder.encode(password);
        var newUser = new UserEntity(email, Role.USER, encodedPassword);
        userRepo.save(newUser);
    }

    public String login(String email, String password) {
        var user = userRepo.findByEmail(email).
                orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid email credentials"));
        if(!(passwordMatch(password, user.getEmail()))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid password");
        }
        //DONE добавить JwtActions в utils
        return jwtActions.jwtCreate(user.getEmail(), user.getRole().toString());
    }

    public void redeemPassword(String email) {
        var user = userRepo.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));

        var token = UUID.randomUUID().toString();
        user.setResetToken(token);
        user.setResetTokenExpiration(Instant.now().plusSeconds(this.tokenExpirationSeconds));
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
