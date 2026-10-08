package com.onboarding.service;

import com.auth.user.entity.UserEntity;
import com.auth.user.repo.UserRepo;
import com.catalog.entity.CityEntity;
import com.catalog.entity.CompanyEntity;
import com.catalog.entity.CountryEntity;
import com.catalog.entity.ProfessionEntity;
import com.onboarding.dto.NicknameAvailabilityDto;
import com.onboarding.dto.OnboardingDto;
import com.profile.dao.ProfileRepo;
import com.profile.entity.ProfileEntity;
import com.smartsearch.repo.CitiesRepo;
import com.smartsearch.repo.CompaniesRepo;
import com.smartsearch.repo.CountriesRepo;
import com.smartsearch.repo.ProfessionsRepo;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class OnboardingService {

    private final UserRepo userRepo;
    private final CompaniesRepo companiesRepo;
    private final CountriesRepo countriesRepo;
    private final ProfessionsRepo professionsRepo;
    private final CitiesRepo citiesRepo;
    private final ProfileRepo profileRepo;

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

        if(!cityEntity.getCountry().equals(countryEntity.getId())) {
            throw new IllegalArgumentException(
                    "City does not belong selected country"
            );
        }

        ProfileEntity profile = profileRepo
                .findById(user.getId())
                .orElseGet(ProfileEntity::new);

        profile.setUser(user);
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

        profileRepo.save(profile);
    }

    public NicknameAvailabilityDto checkNicknameAvailability(String nickname) {

        String normalizedNickname = nickname.trim();
        boolean exists = profileRepo.existsByNicknameIgnoreCase(normalizedNickname);

        return new NicknameAvailabilityDto(
                normalizedNickname,
                !exists
        );
    }
}