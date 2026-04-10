package com.verification.dto.rq;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Dto для проверки OTP")
public record ValidateOtpDto(
        @Email(message = "Email должен содержать корректный адрес")
        @NotBlank(message = "Email обязателен")
        String email,

        @NotBlank(message = "OTP обязателен")
        @Size(min = 6, max = 6, message = "Некорректный OTP")
        String otp
) {}