package com.catalog.toplist.service;

import com.catalog.toplist.dto.TopCountryDto;
import com.catalog.toplist.mapper.TopCountryMapper;
import com.catalog.toplist.repo.TopCountryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TopCountryService {

    private final TopCountryRepo topCountryRepo;
    private final TopCountryMapper topCountryMapper;

    public List<TopCountryDto> getTopCountries() {
        return topCountryRepo.findAllByOrderByPositionAsc()
                .stream()
                .map(topCountryMapper::toTopCountryDto)
                .toList();
    }
}