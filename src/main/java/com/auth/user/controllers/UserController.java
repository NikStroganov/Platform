package com.auth.user.controllers;

import java.util.Map;

import com.auth.user.dto.UserDto;
import com.auth.user.dto.UserRedeemPasswordDto;
import com.auth.user.dto.UserResetPasswordDto;
import com.auth.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody @Valid UserDto userDto) {
        var token = userService.login(userDto.email(), userDto.password());
        return ResponseEntity
                .ok()
                .body(Map.of("token", token));
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody @Valid UserDto userDto) {
        userService.createUser(userDto.email(), userDto.password());
        return ResponseEntity
                .ok()
                .body(Map.of("message", "User created successfully"));
    }

    @PostMapping("/redeem-password")
    public ResponseEntity<Map<String, String>> redeemPassword(@RequestBody @Valid UserRedeemPasswordDto userRedeemPasswordDto) {
        userService.redeemPassword(userRedeemPasswordDto.email());
        return ResponseEntity
                .ok()
                .body(Map.of("message", "email with reset password link sent to email"));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestBody @Valid UserResetPasswordDto userResetPasswordDto) {
        userService.resetPassword(userResetPasswordDto.token(), userResetPasswordDto.password());
        return ResponseEntity
                .ok()
                .body(Map.of("message", "Credentials updated"));
    }
}
