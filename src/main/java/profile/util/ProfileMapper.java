package profile.util;

import profile.Profile;
import profile.ProfileDTO;

public class ProfileMapper {
    //TODO использовать MapStruct

    public static Profile toEntity(ProfileDTO dto) {
        return Profile.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .position(dto.getPosition())
                .country(dto.getCountry())
                .currentJob(dto.getCurrentJob())
                .education(dto.getEducation())
                .generalInfo(dto.getGeneralInfo())
                .build();
    }

    public static ProfileDTO toDto(Profile profile) {
        return ProfileDTO.builder()
                .firstName(profile.getFirstName())
                .lastName(profile.getLastName())
                .position(profile.getPosition())
                .country(profile.getCountry())
                .currentJob(profile.getCurrentJob())
                .education(profile.getEducation())
                .generalInfo(profile.getGeneralInfo())
                .build();
    }
}
