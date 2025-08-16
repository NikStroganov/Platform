package profile;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import profile.dto.ProfileApiResponse;
import profile.dto.ProfileDto;
import profile.service.ProfileService;
import java.util.List;
import java.util.NoSuchElementException;
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
        return profileService.getProfiles();
    }

    @PostMapping
    @Operation(summary = "Создать нового пользователя")
    public ResponseEntity<ProfileApiResponse> createProfile(@RequestBody ProfileDto profileDto) {
        try {
            ProfileDto createdProfile = profileService.createProfile(profileDto);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(ProfileApiResponse.success(201, "Пользователь успешно создан", createdProfile));
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(ProfileApiResponse.error(400, e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    @Operation(summary = "Получить профиль клиента", description = "Возврашает профиль конкретного клиента по уникальному id")
    public ResponseEntity<ProfileApiResponse> getProfile(@PathVariable Long id) {
        try {
            ProfileDto profileDto = profileService.findProfileById(id);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(ProfileApiResponse.success(200, "Профиль найден", profileDto));
        } catch (EntityNotFoundException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ProfileApiResponse.error(400, e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    @Operation(summary = "Обновление профиля клиента", description = "Обновляет данные в БД по клиенту")
    public ResponseEntity<ProfileApiResponse> updateProfile(@PathVariable Long id,
                                                            @RequestBody ProfileDto profileDto) {
        try {
            ProfileDto updatedProfile = profileService.updateProfile(id, profileDto);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(ProfileApiResponse.success(200, "Данные о пользователе обновлены", updatedProfile));
        } catch (EntityNotFoundException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ProfileApiResponse.error(400, e.getMessage() + ", " + "Данные о пользователе не обновлены"));
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Удаление профиля клиента", description = "Удалить профиль из БД по полученному id")
    public ResponseEntity<ProfileApiResponse> deleteProfile(@PathVariable Long id) {
        try {
            profileService.deleteProfile(id);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(ProfileApiResponse.success(200, "Профиль удален", null));
        } catch (EntityNotFoundException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ProfileApiResponse.error(400, "Профиль не удален" + ", " + e.getMessage()));
        }
    }
}
