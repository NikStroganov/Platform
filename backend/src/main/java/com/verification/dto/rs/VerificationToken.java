package com.verification.dto.rs;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record VerificationToken(
        @NotNull(message = "Verification token обязателен")
        UUID verificationToken
) {}