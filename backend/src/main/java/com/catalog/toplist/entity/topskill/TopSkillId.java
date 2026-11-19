package com.catalog.toplist.entity.topskill;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.UUID;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class TopSkillId implements Serializable {

    @Column(name = "profession_id", nullable = false)
    private UUID professionId;

    @Column(name = "skill_id", nullable = false)
    private UUID skillId;
}