package com.verification.controller;

import com.verification.dto.rq.SendOtpDto;
import com.verification.dto.rq.UserEmailDto;
import com.utils.responsevalidator.ApiResponse;
import com.verification.dto.rq.ValidateOtpDto;
import com.verification.dto.rs.UserExistResponse;
import com.verification.dto.rs.VerificationToken;
import com.verification.service.OtpService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/verify")
public class OtpController {

    private final OtpService otpService;

    public OtpController(OtpService otpService) {
        this.otpService = otpService;
    }

    @PostMapping("/isUser")
    public ResponseEntity<ApiResponse<UserExistResponse>> isUser(@RequestBody @Valid UserEmailDto userEmailDto) {
        boolean exists = otpService.isUser(userEmailDto.email());
        return ResponseEntity
                .ok()
                .body(ApiResponse.success(
                        null,
                        new UserExistResponse(exists)
                ));
    }

    @PostMapping("/sendOtp")
    public ResponseEntity<ApiResponse<Void>> resetPassword(@RequestBody @Valid SendOtpDto sendOtpDto) {
        otpService.sendOtp(sendOtpDto.email(), sendOtpDto.purpose());
        return ResponseEntity
                .ok()
                .body(ApiResponse.success(
                        "Otp code was sent",
                        null
                ));
    }

    @PostMapping("/validateOtp")
    public ResponseEntity<ApiResponse<VerificationToken>> sendConfirmCode(@RequestBody @Valid ValidateOtpDto validateOtpDto) {
        UUID token = otpService.validateOtp(validateOtpDto.email(), validateOtpDto.otp());
        return ResponseEntity
                .ok()
                .body(ApiResponse.success(
                        "Otp code is valid",
                        new VerificationToken(token)
                ));
    }
}