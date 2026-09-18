package com.smartsearch.repo;

import com.catalog.entity.CityEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CitiesRepo extends JpaRepository<CityEntity, UUID> {

    Slice<CityEntity> findByNameContainingIgnoreCase(
            String name,
            Pageable pageable
    );
}