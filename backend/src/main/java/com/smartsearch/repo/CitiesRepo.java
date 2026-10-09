package com.smartsearch.repo;

import com.catalog.entity.CityEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CitiesRepo extends JpaRepository<CityEntity, UUID> {

    Slice<CityEntity> findByNameContainingIgnoreCase(
            String name,
            Pageable pageable
    );
}