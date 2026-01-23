package com.auth.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Dto для сброса пароля (кнопка Забыли пароль?)")
public record UserRedeemPasswordDto(
        @Email(message = "Email должен содержать корректный адрес")
        @NotBlank
        @Size(min = 4)
        String email
) {}
