package com.auth.user.controllers;

import com.auth.user.dto.rs.CurrentUserProfileDto;
import com.auth.user.service.UserService;
import com.utils.responsevalidator.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/profile")
public class CurrentUserProfileController {

    private final UserService userService;

    public CurrentUserProfileController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @Operation(
            summary = "Получить профиль текущего пользователя",
            description = "Возвращает информацию об авторизованном пользователе на основе access token"
    )
    public ResponseEntity<ApiResponse<CurrentUserProfileDto>> getCurrentUserProfile(Authentication authentication) {
        var currentUserProfile = userService.getCurrentUserProfile(authentication.getName());
        return ResponseEntity
                .ok(ApiResponse.success(
                        "Профиль текущего пользователя получен",
                        currentUserProfile
                ));
    }
}
