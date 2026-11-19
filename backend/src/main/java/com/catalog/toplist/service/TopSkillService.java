package com.catalog.toplist.service;

import com.catalog.toplist.dto.TopSkillDto;
import com.catalog.toplist.mapper.TopSkillsMapper;
import com.catalog.toplist.repo.TopSkillsRepo;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class TopSkillService {

    private final TopSkillsRepo topSkillsRepo;
    private final TopSkillsMapper topSkillMapper;
    private final com.catalog.config.SkillProperties skillProperties;

    public List<TopSkillDto> getTopSkills(UUID professionId) {
        return topSkillsRepo.findRecommendedByProfessionId(
                professionId,
                PageRequest.of(0, skillProperties.recommendationsLimit())
        )
                .stream()
                .map(topSkillMapper::toTopSkillDto)
                .toList();
    }
}