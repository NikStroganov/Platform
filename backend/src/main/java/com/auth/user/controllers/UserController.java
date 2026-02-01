package com.auth.user.controllers;

import com.auth.user.dto.*;
import com.auth.user.service.UserService;
import com.utils.responsevalidator.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


//DONE переделать ответы контроллера с мапы на DTO + ApiResponse
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponseDto>> login(@RequestBody @Valid UserDto userDto) {
        var loginToken = userService.login(userDto.email(), userDto.password());
        return ResponseEntity
                .ok()
                .body(ApiResponse.success(
                        "Access и refresh токены получены",
                        loginToken
                ));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponseDto>> refresh(@RequestBody @Valid RefreshTokenDto refreshTokenDto) {
        var refreshToken = userService.refreshToken(refreshTokenDto.refreshToken());
        return ResponseEntity
                .ok()
                .body(ApiResponse.success(
                        "Access и refresh токены получены",
                        refreshToken
                ));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Void>> register(@RequestBody @Valid UserDto userDto) {
        userService.createUser(userDto.email(), userDto.password());
        return ResponseEntity
                .ok()
                .body(ApiResponse.success(
                        "Пользователь зарегистрирован",
                        null
                ));
    }

    @PostMapping("/redeem-password")
    public ResponseEntity<ApiResponse<Void>> redeemPassword(@RequestBody @Valid UserRedeemPasswordDto userRedeemPasswordDto) {
        userService.redeemPassword(userRedeemPasswordDto.email());
        return ResponseEntity
                .ok()
                .body(ApiResponse.success(
                        "Токен для сброса сгенерирован",
                        null
                ));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(@RequestBody @Valid UserResetPasswordDto userResetPasswordDto) {
        userService.resetPassword(userResetPasswordDto.token(), userResetPasswordDto.password());
        return ResponseEntity
                .ok()
                .body(ApiResponse.success(
                        "Пароль изменен",
                        null
                ));
    }
}