package com.catalog.toplist.entity;

import com.catalog.entity.ProfessionEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "top_professions")
public class TopProfessionEntity {

    @Id
    @Column(name = "profession_id")
    private UUID professionId;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "profession_id")
    private ProfessionEntity profession;

    @NotNull
    @Min(1)
    @Column(nullable = false, unique = true)
    private Integer position;

    @Pattern(regexp = "^#[0-9a-fA-F]{6}$")
    @Column(nullable = false, length = 7)
    private String backgroundColor;
}