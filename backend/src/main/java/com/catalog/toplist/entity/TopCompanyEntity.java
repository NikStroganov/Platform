package com.catalog.toplist.entity;

import com.catalog.entity.CompanyEntity;
import jakarta.persistence.*;
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

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "company_id")
    private CompanyEntity company;

    @Column(nullable = false, unique = true)
    private Integer position;

    @Column(name = "logo_key")
    private String logoKey;

    @Column(nullable = false, length = 7)
    private String backgroundColor;
}