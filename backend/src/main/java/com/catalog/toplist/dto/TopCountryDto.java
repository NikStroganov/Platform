package com.catalog.toplist.dto;

import java.util.UUID;

public record TopCountryDto(
        UUID countryId,
        String name,
        String backgroundColor
) {}