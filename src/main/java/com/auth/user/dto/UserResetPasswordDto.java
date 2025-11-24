package com.auth.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "Dto для смены пароля")
public record UserResetPasswordDto (@NotBlank String token, @NotBlank String password) {}
