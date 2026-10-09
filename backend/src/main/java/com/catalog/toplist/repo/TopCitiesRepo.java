package com.catalog.toplist.repo;

import com.catalog.toplist.entity.TopCityEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TopCitiesRepo extends JpaRepository<TopCityEntity, UUID> {
    List<TopCityEntity> findAllByOrderByPositionAsc();
}