package com.profile.mapping;

import com.profile.dto.ProfileDto;
import org.springframework.stereotype.Component;
import com.profile.entity.ProfileEntity;

@Component
public class ProfileMapper {
    //TODO использовать MapStruct

    public ProfileEntity toEntity(ProfileDto dto) {
        return null;
    }

    public ProfileDto toDto(ProfileEntity profileEntity) {
        return null;
    }
}