package com.catalog.options.service;

import com.catalog.options.dto.CatalogOptionDto;
import com.catalog.options.enums.SeniorityLevel;
import com.catalog.options.enums.WorkFormat;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class CatalogOptionsService {
    public List<CatalogOptionDto> getSeniorityLevels() {
        return Arrays.stream(SeniorityLevel.values())
                .map(level -> new CatalogOptionDto(
                        level.name(),
                        level.getLabel()
                ))
                .toList();
    }

    public List<CatalogOptionDto> getWorkFormats() {
        return Arrays.stream(WorkFormat.values())
                .map(level -> new CatalogOptionDto(
                        level.name(),
                        level.getLabel()
                ))
                .toList();
    }
}