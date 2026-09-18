package com.catalog.toplist.service;

import com.catalog.toplist.dto.TopCompanyDto;
import com.catalog.toplist.mapper.TopCompanyMapper;
import com.catalog.toplist.utils.LogoBuilder;
import com.catalog.toplist.repo.TopCompaniesRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TopCompanyService {
    private final TopCompaniesRepo topCompaniesRepo;
    private final TopCompanyMapper topCompanyMapper;
    private final LogoBuilder builder;

    public List<TopCompanyDto> getTopCompanies() {
        return topCompaniesRepo.findAllByOrderByPositionAsc()
                .stream()
                .map(entity -> topCompanyMapper.toTopCompanyDto(
                        entity,
                        builder.build(entity.getLogoKey())
                ))
                .toList();
    }
}