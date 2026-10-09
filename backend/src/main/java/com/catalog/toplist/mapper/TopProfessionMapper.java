package com.catalog.toplist.mapper;

import com.catalog.toplist.dto.TopProfessionDto;
import com.catalog.toplist.entity.TopProfessionEntity;
import org.springframework.stereotype.Component;

@Component
public class TopProfessionMapper {

    public TopProfessionDto toTopProfessionDto(TopProfessionEntity entity) {
        return new TopProfessionDto(
                entity.getProfession().getId(),
                entity.getProfession().getName(),
                entity.getBackgroundColor()
        );
    }
}