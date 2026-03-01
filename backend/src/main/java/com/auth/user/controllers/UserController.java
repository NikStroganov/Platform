package com.auth.user.controllers;

import com.auth.user.dto.rq.RefreshTokenDto;
import com.auth.user.dto.rq.UserDto;
import com.auth.user.dto.rs.AuthResponseDto;
import com.auth.user.service.UserService;
import com.utils.responsevalidator.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
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
    public ResponseEntity<ApiResponse<AuthResponseDto>> register(@RequestBody @Valid UserDto userDto) {
        var pairOfToken = userService.createUser(userDto.email(), userDto.password());
        return ResponseEntity
                .ok()
                .body(ApiResponse.success(
                        "Пользователь зарегистрирован",
                        pairOfToken
                ));
    }

    @PostMapping("/set-new-password")
    public ResponseEntity<ApiResponse<AuthResponseDto>> setNewPassword(@RequestBody @Valid UserDto userDto) {
        var newPairOfToken = userService.setNewPassword(userDto.email(), userDto.password());
        return ResponseEntity
                .ok()
                .body(ApiResponse.success(
                        "Пароль сменен",
                        newPairOfToken
                ));
    }
}