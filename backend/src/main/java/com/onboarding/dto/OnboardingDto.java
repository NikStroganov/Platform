package com.onboarding.dto;

import com.catalog.options.enums.CurrencyCode;
import com.catalog.options.enums.SeniorityLevel;
import com.catalog.options.enums.WorkFormat;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.util.UUID;

public record OnboardingDto(

        @NotBlank
        @Size(min = 2, max = 20)
        String nickname,

        @NotNull
        UUID companyId,

        @NotNull
        UUID countryId,

        UUID cityId,

        @NotNull
        WorkFormat workFormat,

        @NotNull
        UUID professionId,

        @NotNull
        SeniorityLevel seniorityLevel,

        @Min(1)
        @Max(100)
        Integer companyGrade,

        @NotNull
        @DecimalMin(value = "0.0")
        @DecimalMax(value = "50.0")
        @Digits(integer = 2, fraction = 1)
        BigDecimal workExperienceYears,

        //TODO Диапазоны

        @NotNull
        @DecimalMin(value = "0")
        @DecimalMax(value = "2000000")
        @Digits(integer = 7, fraction = 0)
        BigDecimal salary,

        @DecimalMin(value = "0")
        @DecimalMax(value = "2000000")
        @Digits(integer = 7, fraction = 0)
        BigDecimal bonus,

        @NotNull
        CurrencyCode currency
) {}