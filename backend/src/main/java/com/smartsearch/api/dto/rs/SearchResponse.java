package com.smartsearch.api.dto.rs;

import com.smartsearch.enums.CatalogType;
import java.util.List;
public record SearchResponse(
        String query,
        CatalogType type,
        List<SearchResult> items,
        int page,
        int size,
        boolean hasNext
) {}