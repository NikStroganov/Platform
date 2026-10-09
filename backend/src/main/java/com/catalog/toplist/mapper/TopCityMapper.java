package com.catalog.toplist.mapper;

import com.catalog.toplist.dto.TopCityDto;
import com.catalog.toplist.entity.TopCityEntity;
import org.springframework.stereotype.Component;

@Component
public class TopCityMapper {

    public TopCityDto toTopCityDto(TopCityEntity entity) {
        return new TopCityDto(
                entity.getCity().getId(),
                entity.getCity().getName(),
                entity.getBackgroundColor()
        );
    }
}