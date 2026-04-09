package com.auth.user.dto.rq;

import jakarta.validation.constraints.*;

import java.util.UUID;

public record UserRegisterDto(
        @Email(message = "Email должен содержать корректный адрес")
        @NotBlank(message = "Email обязателен")
        String email,

        @NotBlank(message = "Пароль обязателен")
        @Pattern(
                regexp = "^(?=.*[A-Z])(?=.*\\d).{6,}$",
                message = "Пароль должен содержать минимум 6 символов, одну заглавную букву и одну цифру")
        String password,

        @NotNull(message = "Токен обязателен")
        UUID verificationToken
) {}
