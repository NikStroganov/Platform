package com.catalog.toplist.dto;

import java.util.UUID;

public record TopCompanyDto(
        UUID companyId,
        String name,
        String logoKey,
        String backgroundColor
)
{}