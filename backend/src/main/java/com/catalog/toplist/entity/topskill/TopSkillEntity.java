package com.catalog.toplist.entity.topskill;

import com.catalog.entity.ProfessionEntity;
import com.catalog.entity.SkillEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "top_skills", schema = "public")
@Getter
@Setter
@NoArgsConstructor
public class TopSkillEntity {

    @EmbeddedId
    private TopSkillId id;

    @NotNull
    @MapsId("professionId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "profession_id", nullable = false)
    private ProfessionEntity profession;

    @NotNull
    @MapsId("skillId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "skill_id", nullable = false)
    private SkillEntity skill;

    @NotNull
    @Min(0)
    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder;
}