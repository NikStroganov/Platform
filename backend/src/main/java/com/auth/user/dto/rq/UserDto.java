package com.auth.user.dto.rq;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

//TODO Определить минимальные длины данных
@Schema(description = "Dto для авторизации")
public record UserDto(
        @Email(message = "Email должен содержать корректный адрес")
        @NotBlank(message = "Email обязателен")
        String email,
        @NotBlank(message = "Пароль обязателен")
        String password
) {}
