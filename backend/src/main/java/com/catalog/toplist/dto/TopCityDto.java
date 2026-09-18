package com.catalog.toplist.dto;

import java.util.UUID;

public record TopCityDto(
        UUID cityId,
        String name,
        String backgroundColor
) {}
