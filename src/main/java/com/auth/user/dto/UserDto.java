package com.auth.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "Dto для авторизации")
public record UserDto(@Email @NotBlank @Min(4) String email, @NotBlank @Min(5) String password) {}
