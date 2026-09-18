package com.catalog.toplist.dto;

import java.util.UUID;

public record TopProfessionDto(
        UUID professionId,
        String name,
        String backgroundColor
)
{}