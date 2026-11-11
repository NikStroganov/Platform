package com.onboarding.controller;

import com.onboarding.dto.NicknameAvailabilityDto;
import com.onboarding.dto.OnboardingStatusResponse;
import com.onboarding.dto.OnboardingDto;
import com.onboarding.service.OnboardingService;
import com.utils.responsevalidator.ApiResponse;
import com.verification.dto.rq.UserEmailDto;
import com.verification.dto.rs.UserExistResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/onboarding")
public class OnboardingController {

    private final OnboardingService onboardingService;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> saveOnboarding(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody OnboardingDto dto
    ) {
        String email = jwt.getSubject();

        onboardingService.saveOnboardingData(email, dto);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Onboarding saved successfully",
                        null
                )
        );
    }

    @GetMapping("/nickname/availability")
    public ResponseEntity<ApiResponse<NicknameAvailabilityDto>>
    checkNicknameAvailability(@RequestParam @Size(min = 2, max = 50) String nickname) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Nickname availability checked",
                        onboardingService.checkNicknameAvailability(nickname)
                )
        );
    }

    @PostMapping("/status")
    public ResponseEntity<ApiResponse<OnboardingStatusResponse>> getOnboardingStatus(
            @AuthenticationPrincipal Jwt jwt
    ) {
        String email = jwt.getSubject();
        return ResponseEntity
                .ok()
                .body(ApiResponse.success(
                        "Onboarding status received",
                        onboardingService.getOnboardingStatus(email)
                ));
    }
}