package com.auth.user.dto.rq;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Dto для сброса пароля по ссылке из письма на почте")
public record UserResetPasswordDto (
        @NotBlank
        String token,
        @NotBlank
        @Size(min = 5)
        String password
) {}
