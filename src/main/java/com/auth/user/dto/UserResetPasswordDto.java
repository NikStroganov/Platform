package com.auth.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "Dto для сброса пароля по ссылке из письма на почте")
public record UserResetPasswordDto (@NotBlank String token, @NotBlank String password) {}
