package com.catalog.toplist.entity;

import com.catalog.entity.CityEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
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

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "city_id")
    private CityEntity city;

    @NotNull
    @Min(1)
    @Column(nullable = false, unique = true)
    private Integer position;

    @Pattern(regexp = "^#[0-9a-fA-F]{6}$")
    @Column(name = "background_color", nullable = false, length = 7)
    private String backgroundColor;
}