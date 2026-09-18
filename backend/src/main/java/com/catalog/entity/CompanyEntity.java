package com.catalog.entity;

import lombok.*;
import jakarta.persistence.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "companies")
public class CompanyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private Integer sortOrder;

    @Column(nullable = false)
    private String area;

    private Instant createdAt;
    private Instant updatedAt;
}