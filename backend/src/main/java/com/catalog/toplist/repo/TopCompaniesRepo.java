package com.catalog.toplist.repo;

import com.catalog.toplist.entity.TopCompanyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface TopCompaniesRepo extends JpaRepository<TopCompanyEntity, UUID> {
    List<TopCompanyEntity> findAllByOrderByPositionAsc();
}