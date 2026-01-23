package com.auth.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

//TODO Определить минимальные длины данных
@Schema(description = "Dto для авторизации")
public record UserDto(
        @Email(message = "Email должен содержать корректный адрес")
        @NotBlank @Size(min = 4)
        String email,
        @NotBlank
        @Size(min = 5)
        String password
) {}
