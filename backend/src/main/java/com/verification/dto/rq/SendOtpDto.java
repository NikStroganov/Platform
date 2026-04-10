package com.verification.dto.rq;

import com.utils.enums.VerificationPurpose;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Schema(description = "Dto для отправки OTP")
public record SendOtpDto(
        @Email(message = "Email должен содержать корректный адрес")
        @NotBlank(message = "Email обязателен")
        String email,

        @NotNull(message = "Purpose обязателен")
        VerificationPurpose purpose
)
{}