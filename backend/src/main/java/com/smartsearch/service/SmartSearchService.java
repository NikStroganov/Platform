package com.smartsearch.service;

import com.smartsearch.api.dto.rs.SearchResponse;
import com.smartsearch.api.dto.rs.SearchResult;
import com.smartsearch.enums.CatalogType;
import com.smartsearch.mapper.SearchResultMapper;
import com.smartsearch.repo.CitiesRepo;
import com.smartsearch.repo.CompaniesRepo;
import com.smartsearch.repo.CountriesRepo;
import com.smartsearch.repo.ProfessionsRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SmartSearchService {

    private final CompaniesRepo companiesRepo;
    private final ProfessionsRepo professionsRepo;
    private final CountriesRepo countriesRepo;
    private final CitiesRepo citiesRepo;

    private final SearchResultMapper searchResultMapper;
    private final SearchNormalizer searchNormalizer;

    public SearchResponse smartSearch(
            CatalogType type,
            String rawQuery,
            int page,
            int size
    ) {
        String query = searchNormalizer.normalize(rawQuery);

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(Sort.Direction.ASC, "name")
        );

        Slice<SearchResult> result = switch (type) {
            case COMPANY -> companiesRepo.findByNameContainingIgnoreCase(query, pageable)
                    .map(searchResultMapper::fromCompany);

            case PROFESSION -> professionsRepo.findByNameContainingIgnoreCase(query, pageable)
                    .map(searchResultMapper::fromProfession);

            case SKILL -> null;

            case COUNTRY -> countriesRepo.findByNameContainingIgnoreCase(query, pageable)
                    .map(searchResultMapper::fromCountries);

            case CITY -> citiesRepo.findByNameContainingIgnoreCase(query, pageable)
                    .map(searchResultMapper::fromCities);
        };

        return new SearchResponse(
                query,
                type,
                result.getContent(),
                result.getNumber(),
                result.getSize(),
                result.hasNext()
        );
    }
}