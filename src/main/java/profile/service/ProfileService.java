package profile.service;

import java.util.List;
import java.util.Optional;

import profile.dto.ProfileDto;

public interface ProfileService {

    List<ProfileDto> getProfiles();
    ProfileDto createProfile(ProfileDto profileDto);
    ProfileDto findProfileById(Long id);
    ProfileDto updateProfile(Long id, ProfileDto profileDto);
    void deleteProfile(Long id);
}
