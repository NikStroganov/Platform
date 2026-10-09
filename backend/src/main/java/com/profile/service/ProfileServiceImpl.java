package com.profile.service;

import com.profile.entity.ProfileEntity;
import com.profile.dao.ProfileRepo;
import com.profile.dto.ProfileDto;
import com.profile.mapping.ProfileMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
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
        return null;
    }

    @Override
    public ProfileDto findProfileById(Long id) {
        return null;
    }

    //DONE брать айдишник из запроса PL
    //TODO переделать присваивание всех полей, когда реализую через MapStruct
    @Override
    public ProfileDto updateProfile(Long id, ProfileDto profileDto) {
        return null;
    }

    @Override
    public void deleteProfile(Long id) {
    }
}