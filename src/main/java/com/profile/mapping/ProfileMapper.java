package com.profile.mapping;

import com.profile.dto.ProfileDto;
import org.springframework.stereotype.Component;
import com.profile.Profile;

@Component
public class ProfileMapper {
    //TODO использовать MapStruct

    public Profile toEntity(ProfileDto dto) {
        return Profile.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail())
                .position(dto.getPosition())
                .country(dto.getCountry())
                .currentJob(dto.getCurrentJob())
                .education(dto.getEducation())
                .generalInfo(dto.getGeneralInfo())
                .build();
    }

    public ProfileDto toDto(Profile profile) {
        return ProfileDto.builder()
                .firstName(profile.getFirstName())
                .lastName(profile.getLastName())
                .email(profile.getEmail())
                .position(profile.getPosition())
                .country(profile.getCountry())
                .currentJob(profile.getCurrentJob())
                .education(profile.getEducation())
                .generalInfo(profile.getGeneralInfo())
                .build();
    }
}
