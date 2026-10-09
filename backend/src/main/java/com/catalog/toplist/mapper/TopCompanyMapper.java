package com.catalog.toplist.mapper;

import com.catalog.toplist.dto.TopCompanyDto;
import com.catalog.toplist.entity.TopCompanyEntity;
import org.springframework.stereotype.Component;

@Component
public class TopCompanyMapper {

    public TopCompanyDto toTopCompanyDto(TopCompanyEntity entity, String logoUrl) {
        return new TopCompanyDto(
                entity.getCompany().getId(),
                entity.getCompany().getName(),
                logoUrl,
                entity.getBackgroundColor()
        );
    }
}