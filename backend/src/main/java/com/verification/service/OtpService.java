package com.verification.service;

import com.auth.user.repo.UserRepo;
import com.email.services.EmailService;
import com.utils.enums.Errors;
import com.utils.enums.VerificationPurpose;
import com.utils.exceptions.ApiException;
import com.verification.entity.OtpEntity;
import com.verification.repo.OtpRepo;
import com.verification.util.OtpGenerator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Instant;
import java.util.UUID;

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

    public OtpService(UserRepo userRepo,
                      OtpRepo otpRepo,
                      OtpGenerator otpGenerator,
                      BCryptPasswordEncoder passwordEncoder,
                      EmailService mailSender) {
        this.userRepo = userRepo;
        this.otpRepo = otpRepo;
        this.otpGenerator = otpGenerator;
        this.passwordEncoder = passwordEncoder;
        this.mailSender = mailSender;
    }

    public boolean isUser(String email) {
        return userRepo.findByEmail(email).isPresent();
    }

    @Transactional
    public void sendOtp(String email, VerificationPurpose purpose) {
        if(purpose == VerificationPurpose.REGISTER && userRepo.findByEmail(email).isPresent()) {
            throw new ApiException(Errors.EMAIL_ALREADY_EXISTS, "email");
        }
        if(purpose == VerificationPurpose.RESET_PASSWORD && !userRepo.findByEmail(email).isPresent()) {
            throw new ApiException(Errors.INVALID_EMAIL, "email");
        }
        String otp = otpGenerator.generateOtp();
        log.info("OTP for {} = {}", email, otp); // только для dev
        var otpEntity = OtpEntity.builder()
                .email(email)
                .code(passwordEncoder.encode(otp))
                .createdAt(Instant.now())
                .expiredAt(Instant.now().plusSeconds(otpCodeExpirationSeconds))
                .otpUsed(false)
                .tokenVerified(false)
                .purpose(purpose)
                .build();
        otpRepo.save(otpEntity);
        var subject = purpose == VerificationPurpose.REGISTER
                ? "OTP code for registration"
                : "OTP code for password reset";
        var body = "Your OTP code: " + otp + "\nIt expires in " + otpCodeExpirationSeconds + " seconds.";

        try {
            mailSender.sendEmail(email, subject, body);
        } catch (MailException ex) {
            log.error("Failed to send OTP email to {}", email, ex);
            throw new ApiException(Errors.INTERNAL_SYSTEM_ERROR);
        }
    }

    @Transactional
    public UUID validateOtp(String email, String otp) {
        OtpEntity code = otpRepo
                .findTopByEmailAndOtpUsedFalseOrderByCreatedAtDesc(email)
                .orElseThrow(() -> new ApiException(Errors.OTP_CODE_NOT_FOUND, "otp"));

        if (!passwordEncoder.matches(otp, code.getCode())) {
            throw new ApiException(Errors.INVALID_OTP, "otp");
        }

        if (code.getExpiredAt().isBefore(Instant.now())) {
            throw new ApiException(Errors.OTP_CODE_IS_EXPIRED, "otp");
        }
        code.setOtpUsed(true);
        code.setTokenVerified(true);
        UUID token = UUID.randomUUID();
        code.setVerificationToken(token);
        otpRepo.save(code);
        return token;
    }
}
