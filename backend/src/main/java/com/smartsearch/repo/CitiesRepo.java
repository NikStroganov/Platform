package com.smartsearch.repo;

import com.catalog.entity.CityEntity;
import com.catalog.entity.CompanyEntity;
import com.smartsearch.repo.projection.SearchMatchProjection;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CitiesRepo extends JpaRepository<CityEntity, UUID> {

    @Query(
            value = SearchQueries.CITIES,
            nativeQuery = true
    )

    Slice<SearchMatchProjection> search(
            @Param("query") String query,
            @Param("minimumSimilarity") double minimumSimilarity,
            @Param("minimumPartialQueryLength") int minimumPartialQueryLength,
            @Param("minimumFuzzyQueryLength") int minimumFuzzyQueryLength,
            Pageable pageable
    );
}