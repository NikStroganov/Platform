package com.smartsearch.api.dto.rs;

import java.util.UUID;
import com.smartsearch.enums.CatalogType;

public record SearchResult(
        UUID id,
        CatalogType type,
        String name
) {}