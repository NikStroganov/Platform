package com.auth.user.dto.rs;

import com.auth.user.roles.Role;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.Instant;
import java.util.UUID;

@Schema(description = "Данные авторизованного пользователя")
public record CurrentUserProfileDto(
        UUID id,
        String email,
        Role role,
        Instant createdAt
) {
}
