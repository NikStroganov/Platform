package com.smartsearch.repo;

import com.catalog.entity.CountryEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CountriesRepo extends JpaRepository<CountryEntity, UUID> {

    Slice<CountryEntity> findByNameContainingIgnoreCase(
            String name,
            Pageable pageable
    );
}