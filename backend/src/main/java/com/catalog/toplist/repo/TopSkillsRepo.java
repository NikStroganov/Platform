package com.catalog.toplist.repo;

import com.catalog.toplist.entity.topskill.TopSkillEntity;
import com.catalog.toplist.entity.topskill.TopSkillId;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TopSkillsRepo extends JpaRepository<TopSkillEntity, TopSkillId> {

    @Query("""
            SELECT ts
            FROM TopSkillEntity ts
            JOIN FETCH ts.skill
            WHERE ts.profession.id = :professionId
            ORDER BY ts.sortOrder ASC,
                     ts.skill.name ASC,
                     ts.skill.id ASC
            """)
    List<TopSkillEntity> findRecommendedByProfessionId(
            @Param("professionId") UUID professionId,
            Pageable pageable
    );

}
