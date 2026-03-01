package com.verification.controller;

import com.verification.dto.rq.OtpCodeDto;
import com.verification.dto.rq.UserEmailDto;
import com.utils.responsevalidator.ApiResponse;
import com.verification.dto.rs.UserExistResponse;
import com.verification.service.OtpService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/verify")
public class OtpController {

    private final OtpService otpService;

    public OtpController(OtpService otpService) {
        this.otpService = otpService;
    }

    @PostMapping("isUser")
    public ResponseEntity<ApiResponse<UserExistResponse>> isUser(@RequestBody @Valid UserEmailDto userEmailDto) {
        boolean exists = otpService.isUser(userEmailDto.email());
        return ResponseEntity
                .ok()
                .body(ApiResponse.success(
                        null,
                        new UserExistResponse(exists)
                ));
    }

    @PostMapping("verifyEmail")
    public ResponseEntity<ApiResponse<Void>> verifyEmail(@RequestBody @Valid UserEmailDto userEmailDto) {
        otpService.verifyEmail(userEmailDto.email());
        return ResponseEntity
                .ok()
                .body(ApiResponse.success(
                        "OTP code has been sent",
                        null
                ));
    }

    @PostMapping("send-confirm-code")
    public ResponseEntity<ApiResponse<Void>> sendConfirmCode(@RequestBody @Valid OtpCodeDto otpCodeDto) {
        otpService.validateOtp(otpCodeDto.email(), otpCodeDto.otp());
        return ResponseEntity
                .ok()
                .body(ApiResponse.success(
                        "Otp code is valid",
                        null
                ));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(@RequestBody @Valid UserEmailDto userEmailDto) {
        otpService.resetPassword(userEmailDto.email());
        return ResponseEntity
                .ok()
                .body(ApiResponse.success(
                        "Otp code to reset password was sent",
                        null
                ));
    }
}