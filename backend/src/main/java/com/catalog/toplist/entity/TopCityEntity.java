package com.catalog.toplist.entity;

import com.catalog.entity.CityEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "top_cities")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TopCityEntity {
    @Id
    @Column(name = "city_id")
    private UUID cityId;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "city_id")
    private CityEntity city;

    @Column(nullable = false, unique = true)
    private Integer position;

    @Column(name = "background_color", nullable = false, length = 7)
    private String backgroundColor;
}