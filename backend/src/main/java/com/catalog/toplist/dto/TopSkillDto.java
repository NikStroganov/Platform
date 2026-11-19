package com.catalog.toplist.dto;

import java.util.UUID;

public record TopSkillDto(
        UUID skillId,
        String name
) {}