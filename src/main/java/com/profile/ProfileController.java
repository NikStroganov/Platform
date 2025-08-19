package com.profile;

import com.profile.dto.ProfileDto;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.utils.responsevalidator.ApiResponse;
import com.profile.service.ProfileService;

import java.util.List;

/*
    @RequestBody — Spring автоматически маппит JSON из запроса в DTO
    @GetMapping("/{id}") значит, что id должен идти в URL, а не в теле запроса
 */

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/userProfile")
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping
    @Operation(summary = "Получить список профилей", description = "Возврашает список существующих профилей из БД")
    public List<ProfileDto> getProfilesList() {
        return profileService.getProfiles();
    }

    @PostMapping
    @Operation(summary = "Создать нового пользователя")
    public ResponseEntity<ApiResponse> createProfile(@Valid @RequestBody ProfileDto profileDto) {
        ProfileDto createdProfile = profileService.createProfile(profileDto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(201,"Пользователь успешно создан", createdProfile, "endpoint"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Получить профиль клиента", description = "Возврашает профиль конкретного клиента по уникальному id")
    public ResponseEntity<ApiResponse> getProfile(@PathVariable Long id) {
        ProfileDto profileDto = profileService.findProfileById(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ApiResponse.success(200, "Профиль найден", profileDto, "endpoint"));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Обновление профиля клиента", description = "Обновляет данные в БД по клиенту")
    public ResponseEntity<ApiResponse> updateProfile(@PathVariable Long id,
                                                     @Valid @RequestBody ProfileDto profileDto) {

        ProfileDto updatedProfile = profileService.updateProfile(id, profileDto);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ApiResponse.success(200, "Данные о пользователе обновлены", updatedProfile, "endpoint"));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Удаление профиля клиента", description = "Удалить профиль из БД по полученному id")
    public ResponseEntity<ApiResponse> deleteProfile(@PathVariable Long id) {
        profileService.deleteProfile(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(ApiResponse.success(200, "Профиль удален", null, "endpoint"));
    }
}
