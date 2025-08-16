package profile;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import profile.service.ProfileService;
import java.util.List;
import java.util.Optional;

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
        return profileService.getProfile();
    }

    @PostMapping
    @Operation(summary = "Создать нового пользователя")
    public ResponseEntity<ProfileDto> createProfile(@RequestBody ProfileDto profileDto) {
        try {
            ProfileDto createdProfile = profileService.createProfile(profileDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdProfile);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    @GetMapping("/{id}")
    @Operation(summary = "Получить профиль клиента", description = "Возврашает профиль конкретного клиента по уникальному id")
    public Optional<ProfileDto> getProfile(@PathVariable Long id) {
        return profileService.findProfileById(id);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Обновление профиля клиента", description = "Обновляет запись в БД по клиенту")
    public ResponseEntity<ProfileDto> updateProfile(@PathVariable Long id,
                                                    @RequestBody ProfileDto profileDto) {
        try {
            ProfileDto updatedProfile = profileService.updateProfile(id, profileDto);
            return ResponseEntity.status(HttpStatus.OK).body(updatedProfile);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Удаление профиля клиента", description = "Удалить профиль из БД по полученному id")
    public ResponseEntity<Optional<ProfileDto>> deleteProfile(@PathVariable Long id) {
        try {
            profileService.deleteProfile(id);
            return ResponseEntity.status(HttpStatus.OK).body(profileService.findProfileById(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
