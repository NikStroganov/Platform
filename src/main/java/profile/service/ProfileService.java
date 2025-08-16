package profile.service;

import java.util.List;
import java.util.Optional;

import profile.dto.ProfileDto;

public interface ProfileService {

    List<ProfileDto> getProfile();
    ProfileDto createProfile(ProfileDto profileDto);
    Optional<ProfileDto> findProfileById(Long id);
    ProfileDto updateProfile(Long id, ProfileDto profileDto);
    void deleteProfile(Long id);
}
