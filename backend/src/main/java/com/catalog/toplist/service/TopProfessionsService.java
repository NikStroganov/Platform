package com.catalog.toplist.service;

import com.catalog.toplist.dto.TopProfessionDto;
import com.catalog.toplist.mapper.TopProfessionMapper;
import com.catalog.toplist.repo.TopProfessionsRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TopProfessionsService {
    private final TopProfessionsRepo topProfessionsRepo;
    private final TopProfessionMapper topProfessionsMapper;

    public List<TopProfessionDto> getTopProfessions() {
        return topProfessionsRepo.findAllByOrderByPositionAsc()
                .stream()
                .map(topProfessionsMapper::toTopProfessionDto)
                .toList();
    }
}