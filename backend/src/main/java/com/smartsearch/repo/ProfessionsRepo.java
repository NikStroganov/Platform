package com.smartsearch.repo;

import com.catalog.entity.ProfessionEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface ProfessionsRepo extends JpaRepository<ProfessionEntity, UUID> {

    Slice<ProfessionEntity> findByNameContainingIgnoreCase(
            String name,
            Pageable pageable
    );
}