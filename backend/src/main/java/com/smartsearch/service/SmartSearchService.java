package com.smartsearch.service;

import com.smartsearch.api.dto.rs.SearchResponse;
import com.smartsearch.api.dto.rs.SearchResult;
import com.smartsearch.config.SmartSearchProperties;
import com.smartsearch.enums.CatalogType;
import com.smartsearch.exception.InvalidSearchRequestException;
import com.smartsearch.mapper.SearchResultMapper;
import com.smartsearch.repo.*;
import com.smartsearch.repo.projection.SearchMatchProjection;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SmartSearchService {

    private final CompaniesRepo companiesRepo;
    private final ProfessionsRepo professionsRepo;
    private final CountriesRepo countriesRepo;
    private final CitiesRepo citiesRepo;
    private final SkillsRepo skillsRepo;
    private final SearchResultMapper mapper;
    private final SearchNormalizer searchNormalizer;
    private final SmartSearchProperties properties;

    @Transactional(readOnly = true)
    public SearchResponse smartSearch(
            CatalogType type,
            String rawQuery,
            int page,
            int size
    ) {
        validateRequest(type, rawQuery, page, size);
        String query = searchNormalizer.normalize(rawQuery);

        if (query.isEmpty()) {
            throw new InvalidSearchRequestException("query", "Поисковый запрос не должен быть пустым");
        }
        if (query.length() > 100) {
            throw new InvalidSearchRequestException("query", "Нормализованный запрос должен содержать не более 100 символов");
        }

        Pageable pageable = PageRequest.of(page, size);
        double similarity = properties.minimumSimilarity();
        int partialLength = properties.minimumPartialQueryLength();
        int fuzzyLength = properties.minimumFuzzyQueryLength();

        Slice<SearchMatchProjection> matches = switch (type) {
            case COMPANY -> companiesRepo.search(query, similarity, partialLength, fuzzyLength, pageable);
            case PROFESSION -> professionsRepo.search(query, similarity, partialLength, fuzzyLength, pageable);
            case COUNTRY -> countriesRepo.search(query, similarity, partialLength, fuzzyLength, pageable);
            case CITY -> citiesRepo.search(query, similarity, partialLength, fuzzyLength, pageable);
            case SKILL -> skillsRepo.search(query, similarity, partialLength, fuzzyLength, pageable);
        };

        Slice<SearchResult> results = matches.map(match -> mapper.fromMatch(match, type));

        return new SearchResponse(query, type, results.getContent(), results.getNumber(),
                results.getSize(), results.hasNext());
    }

    private void validateRequest(CatalogType type, String rawQuery, int page, int size) {
        if (type == null) {
            throw new InvalidSearchRequestException("type", "Укажите тип каталога");
        }
        if (rawQuery == null || rawQuery.length() > 100) {
            throw new InvalidSearchRequestException("query", "Укажите поисковый запрос длиной не более 100 символов");
        }
        if (page < 0) {
            throw new InvalidSearchRequestException("page", "Номер страницы не может быть отрицательным");
        }
        if (size < 1 || size > 50) {
            throw new InvalidSearchRequestException("size", "Размер страницы должен быть от 1 до 50");
        }
        // JPA setFirstResult accepts int, while Pageable.getOffset returns long.
        if ((long) page * size > Integer.MAX_VALUE) {
            throw new InvalidSearchRequestException("page", "Слишком большое смещение страницы");
        }
    }
}