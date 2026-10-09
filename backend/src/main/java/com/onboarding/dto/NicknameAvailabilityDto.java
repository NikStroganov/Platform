package com.onboarding.dto;

public record NicknameAvailabilityDto(
        String nickname,
        boolean available
) {}