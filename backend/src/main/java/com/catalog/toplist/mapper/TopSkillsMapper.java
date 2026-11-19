package com.catalog.toplist.mapper;

import com.catalog.toplist.dto.TopSkillDto;
import com.catalog.toplist.entity.topskill.TopSkillEntity;
import org.springframework.stereotype.Component;

@Component
public class TopSkillsMapper {

    public TopSkillDto toTopSkillDto(TopSkillEntity entity) {
        return new TopSkillDto(
                entity.getSkill().getId(),
                entity.getSkill().getName()
        );
    }
}