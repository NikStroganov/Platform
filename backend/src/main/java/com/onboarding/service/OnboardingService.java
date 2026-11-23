package com.onboarding.service;

import com.auth.user.entity.UserEntity;
import com.auth.user.repo.UserRepo;
import com.catalog.entity.*;
import com.onboarding.dto.NicknameAvailabilityDto;
import com.onboarding.dto.OnboardingStatusResponse;
import com.onboarding.dto.OnboardingDto;
import com.profile.dao.ProfileRepo;
import com.profile.dao.ProfileSkillRepo;
import com.profile.entity.ProfileEntity;
import com.profile.entity.ProfileSkillEntity;
import com.smartsearch.repo.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OnboardingService {

    private final UserRepo userRepo;
    private final CompaniesRepo companiesRepo;
    private final CountriesRepo countriesRepo;
    private final ProfessionsRepo professionsRepo;
    private final CitiesRepo citiesRepo;
    private final ProfileRepo profileRepo;
    private final ProfileSkillRepo profileSkillRepo;
    private final SkillsRepo skillsRepo;
    private final com.catalog.config.SkillProperties skillProperties;

    @Transactional
    public void saveOnboardingData(String email, OnboardingDto onboardingDto) {

        UserEntity user = userRepo.findByEmail(email)
                .orElseThrow(() ->
                        new EntityNotFoundException("User not found"));

        if (profileRepo.existsByNicknameIgnoreCase(onboardingDto.nickname())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Nickname already exists"
            );
        }

        CompanyEntity companyEntity = companiesRepo.findById(onboardingDto.companyId())
                .orElseThrow(() ->
                        new EntityNotFoundException("Company not found"));

        CountryEntity countryEntity = countriesRepo.findById(onboardingDto.countryId())
                .orElseThrow(() ->
                        new EntityNotFoundException("Country not found"));

        ProfessionEntity professionEntity = professionsRepo.findById(onboardingDto.professionId())
                .orElseThrow(() ->
                        new EntityNotFoundException("Profession not found"));

        CityEntity cityEntity = null;

        if(onboardingDto.cityId() != null) {
            cityEntity = citiesRepo.findById(onboardingDto.cityId())
                    .orElseThrow(() ->
                            new EntityNotFoundException("City not found"));
        }

        if(cityEntity != null && !cityEntity.getCountry().getId().equals(countryEntity.getId())) {
            throw new IllegalArgumentException(
                    "City does not belong selected country"
            );
        }

        List<SkillEntity> skills = validateAndLoadSkills(onboardingDto.skillIds());

        ProfileEntity profile = new ProfileEntity();

        profile.setUser(user);
        profile.setNickname(onboardingDto.nickname().trim());
        profile.setCompany(companyEntity);
        profile.setCountry(countryEntity);
        profile.setCity(cityEntity);
        profile.setProfession(professionEntity);

        profile.setWorkFormat(onboardingDto.workFormat());
        profile.setSeniorityLevel(onboardingDto.seniorityLevel());
        profile.setCompanyGrade(onboardingDto.companyGrade());
        profile.setWorkExperienceYears(onboardingDto.workExperienceYears());
        profile.setSalary(onboardingDto.salary());
        profile.setBonus(onboardingDto.bonus());
        profile.setCurrency(onboardingDto.currency());

        ProfileEntity savedProfile = profileRepo.saveAndFlush(profile);
        saveProfileSkills(savedProfile, skills);

        savedProfile.setOnboardingCompleted(true);
    }

    public NicknameAvailabilityDto checkNicknameAvailability(String nickname) {

        String normalizedNickname = nickname.trim();
        boolean exists = profileRepo.existsByNicknameIgnoreCase(normalizedNickname);

        return new NicknameAvailabilityDto(
                normalizedNickname,
                !exists
        );
    }

    public OnboardingStatusResponse getOnboardingStatus(String email) {

        UserEntity user = userRepo.findByEmail(email)
                .orElseThrow(() ->
                        new EntityNotFoundException("User not found"));

        boolean completed = profileRepo.findById(user.getId())
                .map(ProfileEntity::isOnboardingCompleted)
                .orElse(false);

        return new OnboardingStatusResponse(completed);
    }

    private List<SkillEntity> validateAndLoadSkills(Set<UUID> skillIds) {

        if (skillIds == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Skills are required"
            );
        }

        if (skillIds.size() > skillProperties.maxSelected()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Maximum " + skillProperties.maxSelected() + " skills allowed"
            );
        }

        List<SkillEntity> skills = skillsRepo.findAllById(skillIds);

        if (skills.size() != skillIds.size()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "One or more skills not found"
            );
        }
        return skills;
    }

    private void saveProfileSkills(ProfileEntity profile, List<SkillEntity> skills) {

        List<ProfileSkillEntity> profileSkills = skills.stream()
                .map(skill -> {
                    ProfileSkillEntity profileSkill = new ProfileSkillEntity();

                    profileSkill.setProfile(profile);
                    profileSkill.setSkill(skill);

                    return profileSkill;
                })
                .toList();

        profileSkillRepo.saveAll(profileSkills);
    }
}