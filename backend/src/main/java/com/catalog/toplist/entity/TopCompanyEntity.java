package com.catalog.toplist.entity;

import com.catalog.entity.CompanyEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import java.util.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "top_companies")
public class TopCompanyEntity {

    @Id
    @Column(name = "company_id")
    private UUID companyId;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "company_id")
    private CompanyEntity company;

    @NotNull
    @Min(1)
    @Column(nullable = false, unique = true)
    private Integer position;

    @Column(name = "logo_key")
    private String logoKey;

    @Pattern(regexp = "^#[0-9a-fA-F]{6}$")
    @Column(nullable = false, length = 7)
    private String backgroundColor;
}