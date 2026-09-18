package com.smartsearch.repo;

import com.catalog.entity.CountryEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CountriesRepo extends JpaRepository<CountryEntity, UUID> {

    Slice<CountryEntity> findByNameContainingIgnoreCase(
            String name,
            Pageable pageable
    );
}