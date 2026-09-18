package com.smartsearch.repo;

import com.catalog.entity.CompanyEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface CompaniesRepo extends JpaRepository<CompanyEntity, UUID> {

    Slice<CompanyEntity> findByNameContainingIgnoreCase(
            String name,
            Pageable pageable
    );
}