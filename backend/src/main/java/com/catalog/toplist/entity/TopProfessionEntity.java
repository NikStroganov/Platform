package com.catalog.toplist.entity;

import com.catalog.entity.ProfessionEntity;
import jakarta.persistence.*;
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

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "profession_id")
    private ProfessionEntity profession;

    @Column(nullable = false, unique = true)
    private Integer position;

    @Column(nullable = false, length = 7)
    private String backgroundColor;
}