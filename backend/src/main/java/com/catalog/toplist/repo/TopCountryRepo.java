package com.catalog.toplist.repo;

import com.catalog.toplist.entity.TopCountryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TopCountryRepo extends JpaRepository<TopCountryEntity, UUID> {
    List<TopCountryEntity> findAllByOrderByPositionAsc();
}