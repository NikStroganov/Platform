package com.catalog.toplist.service;

import com.catalog.toplist.dto.TopCityDto;
import com.catalog.toplist.mapper.TopCityMapper;
import com.catalog.toplist.repo.TopCitiesRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TopCityService {

    private final TopCitiesRepo topCitiesRepo;
    private final TopCityMapper topCityMapper;

    public List<TopCityDto> getTopCities() {
        return topCitiesRepo.findAllByOrderByPositionAsc()
                .stream()
                .map(topCityMapper::toTopCityDto)
                .toList();
    }
}