package com.catalog.toplist.entity;

import com.catalog.entity.CountryEntity;
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
@Table(name = "top_countries")
public class TopCountryEntity {
    @Id
    @Column(name = "country_id")
    private UUID countryId;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "country_id")
    private CountryEntity country;

    @NotNull
    @Min(1)
    @Column(nullable = false, unique = true)
    private Integer position;

    @Pattern(regexp = "^#[0-9a-fA-F]{6}$")
    @Column(name = "background_color", nullable = false, length = 7)
    private String backgroundColor;
}