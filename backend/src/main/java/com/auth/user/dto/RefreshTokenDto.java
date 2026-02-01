package com.auth.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "Dto для запроса нового access токена по refresh токену")
public record RefreshTokenDto(
        @NotBlank
        String refreshToken
) {}
