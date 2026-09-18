package com.catalog.toplist.mapper;

import com.catalog.toplist.dto.TopCityDto;
import com.catalog.toplist.entity.TopCityEntity;
import org.springframework.stereotype.Component;

@Component
public class TopCityMapper {

    public TopCityDto toTopCityDto(TopCityEntity topCityEntity) {
        return new TopCityDto(
                topCityEntity.getCity().getName(),
                topCityEntity.getBackgroundColor()
        );
    }
}