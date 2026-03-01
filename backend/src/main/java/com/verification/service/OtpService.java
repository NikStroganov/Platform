package com.verification.service;

import com.auth.user.repo.UserRepo;
import com.email.config.MailProperties;
import com.email.services.EmailService;
import com.verification.entity.OtpEntity;
import com.verification.repo.OtpRepo;
import com.verification.util.OtpGenerator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
@Slf4j
@Service
public class OtpService {

    @Value("${otp.code.otpCodeExpiration:120}")
    private Long otpCodeExpirationSeconds;

    private final UserRepo userRepo;
    private final OtpRepo otpRepo;
    private final OtpGenerator otpGenerator;
    private final BCryptPasswordEncoder passwordEncoder;
    private final EmailService mailSender;
    private final MailProperties mailProperties;

    public OtpService(UserRepo userRepo,
                      OtpRepo otpRepo,
                      OtpGenerator otpGenerator,
                      BCryptPasswordEncoder passwordEncoder,
                      EmailService mailSender,
                      MailProperties mailProperties) {
        this.userRepo = userRepo;
        this.otpRepo = otpRepo;
        this.otpGenerator = otpGenerator;
        this.passwordEncoder = passwordEncoder;
        this.mailSender = mailSender;
        this.mailProperties = mailProperties;
    }

    public boolean isUser(String email) {
        return userRepo.findByEmail(email).isPresent();
    }
    @Transactional
    public void createOtp(String otp, String email) {
        String code = passwordEncoder.encode(otp);
        var otpEntity = new OtpEntity(
                email,
                code,
                Instant.now(),
                Instant.now().plusSeconds(otpCodeExpirationSeconds),
                false);
        otpRepo.save(otpEntity);
    }

    public void verifyEmail(String email) {
        if(userRepo.findByEmail(email).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "email already exist");
        }
        String otp = otpGenerator.generateOtp();
        log.info("OTP for {} = {}", email, otp); // только для dev
        createOtp(otp, email);
        //TODO параметры
        //mailSender.sendEmail(mailProperties.getSendFrom(), null, null);
    }

    public void resetPassword(String email) {
        if (!userRepo.findByEmail(email).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email not found");
        }
        String otp = otpGenerator.generateOtp();
        log.info("OTP for {} = {}", email, otp); // только для dev
        createOtp(otp, email);
        //TODO параметры
        //mailSender.sendEmail(mailProperties.getSendFrom(), null, null);
    }
    @Transactional
    public void validateOtp(String email, String otp) {
        var code = otpRepo.findTopByEmailAndUsedFalseOrderByCreatedAtDesc(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Otp not found"));

        if (code.getExpiredAt().isBefore(Instant.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Otp is expired");
        }

        if (!passwordEncoder.matches(otp, code.getCode())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Otp");
        }
        code.setUsed(true);
        otpRepo.save(code);
    }
    //TODO Как обойти вопрос создания нового пароля сразу через postman в обход OTP
}
