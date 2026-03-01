package com.verification.dto.rq;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Dto для проверки существования пользователя")
public record UserEmailDto (
        @Email(message = "Email должен содержать корректный адрес")
        @NotBlank @Size(min = 4)
        String email
) {}