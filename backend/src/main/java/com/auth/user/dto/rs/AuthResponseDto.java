package com.auth.user.dto.rs;

import io.swagger.v3.oas.annotations.media.Schema;
@Schema(description = "Ответ при авторизации с access и refresh токенами")
public record AuthResponseDto(
        String accessToken,
        String refreshToken
) {}
