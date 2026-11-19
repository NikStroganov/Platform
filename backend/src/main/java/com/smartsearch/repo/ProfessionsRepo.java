package com.smartsearch.repo;

import com.catalog.entity.CompanyEntity;
import com.catalog.entity.ProfessionEntity;
import com.smartsearch.repo.projection.SearchMatchProjection;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface ProfessionsRepo extends JpaRepository<ProfessionEntity, UUID> {

    @Query(
            value = SearchQueries.PROFESSIONS,
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