package com.catalog.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "countries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CountryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true, length = 2)
    private String code;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(name = "city_selection_enabled", nullable = false)
    private Boolean citySelectionEnabled;

    @Column(name = "sort_order", nullable =false)
    private Integer sortOrder;
}