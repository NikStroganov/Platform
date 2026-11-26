package com.catalog.toplist.mapper;

import com.catalog.toplist.dto.TopCountryDto;
import com.catalog.toplist.entity.TopCountryEntity;
import org.springframework.stereotype.Component;

@Component
public class TopCountryMapper {

    public TopCountryDto toTopCountryDto(TopCountryEntity entity) {
        return new TopCountryDto(
                entity.getCountry().getId(),
                entity.getCountry().getName(),
                entity.getBackgroundColor()
        );
    }
}