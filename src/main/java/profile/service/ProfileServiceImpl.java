package profile.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import profile.Profile;
import profile.dto.ProfileDto;
import profile.dao.ProfileRepo;
import profile.util.ProfileMapper;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

/*
    @Service - помечаем класс как сервмнсый компонент, Spring автоматически зарегистрирует его как Bean

    @RequiredArgsConstructor - генерирует конструктор со всеми final полями (или с полями с аннотацией @NonNull)
    Помогает внедрять зависимости через конструктор — лучший способ DI в Spring

    Optional - обертка над объектом. Явно показываем, что результат может отсутствовать, и страхуемся от NPE
 */

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final ProfileRepo profileRepo;
    private final ProfileMapper profileMapper;

    @Override
    public List<ProfileDto> getProfiles() {
        return profileRepo.findAll()
                .stream()
                .map(profileMapper::toDto)
                .collect(Collectors.toList());
    }

    /*
    DONE
     Непроизводительный поиск по всей БД - добавить поиск по email
     Правильнее сделать поиск по email через базу, чтобы проверка выполнялась на уровне SQL, а не на уровне Java
     */

    @Override
    public ProfileDto createProfile(ProfileDto profileDto) {
        if (profileRepo.findByEmail(profileDto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Profile is already exists");
        }
        Profile savedEntity = profileRepo.save(profileMapper.toEntity(profileDto));
        return profileMapper.toDto(savedEntity);
    }

    @Override
    public ProfileDto findProfileById(Long id) {
        return profileRepo.findById(id)
                .map(profileMapper::toDto)
                .orElseThrow(() -> new EntityNotFoundException("Profile with id " + id + " not found"));
    }

    //DONE брать айдишник из запроса PL
    //TODO переделать присваивание всех полей, когда реализую через MapStruct
    @Override
    public ProfileDto updateProfile(Long id, ProfileDto profileDto) {
        Profile existingProfile = profileRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Profile not found"));

        existingProfile.setFirstName(profileDto.getFirstName());
        existingProfile.setLastName(profileDto.getLastName());
        existingProfile.setPosition(profileDto.getPosition());
        existingProfile.setCountry(profileDto.getCountry());
        existingProfile.setCurrentJob(profileDto.getCurrentJob());
        existingProfile.setEducation(profileDto.getEducation());
        existingProfile.setGeneralInfo(profileDto.getGeneralInfo());

        Profile updatedProfile = profileRepo.save(existingProfile);
        return profileMapper.toDto(updatedProfile);
    }

    @Override
    public void deleteProfile(Long id) {
        if(!profileRepo.existsById(id)) {
            throw new EntityNotFoundException("Profile with id " + id + " not found");
        }
        profileRepo.deleteById(id);
    }
}
