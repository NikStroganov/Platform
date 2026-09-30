package com.onboarding;

import com.onboarding.dto.OnboardingDto;
import com.onboarding.service.OnboardingService;
import com.utils.responsevalidator.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}