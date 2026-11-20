package com.smartsearch.mapper;

import com.smartsearch.api.dto.rs.SearchResult;
import com.smartsearch.enums.CatalogType;
import com.smartsearch.repo.projection.SearchMatchProjection;
import org.springframework.stereotype.Component;

@Component
public class SearchResultMapper {

    public SearchResult fromMatch(SearchMatchProjection match, CatalogType type) {
        return new SearchResult(
                match.getId(),
                type,
                match.getName()
        );
    }
}