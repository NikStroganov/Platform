package com.profile.entity;

import com.catalog.entity.SkillEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(
        name = "profile_skills",
        schema = "public",
        uniqueConstraints = @UniqueConstraint(
                name = "profile_skills_pair_unique",
                columnNames = {"profile_id", "skill_id"}
        )
)
@Getter
@Setter
@NoArgsConstructor
public class ProfileSkillEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, updatable = false)
    private UUID id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "profile_id",
            referencedColumnName = "user_id",
            nullable = false
    )
    private ProfileEntity profile;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "skill_id", nullable = false)
    private SkillEntity skill;
}