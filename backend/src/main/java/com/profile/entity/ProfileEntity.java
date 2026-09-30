package com.profile.entity;

import com.auth.user.entity.UserEntity;
import com.catalog.entity.CityEntity;
import com.catalog.entity.CompanyEntity;
import com.catalog.entity.CountryEntity;
import com.catalog.entity.ProfessionEntity;
import com.catalog.options.enums.CurrencyCode;
import com.catalog.options.enums.SeniorityLevel;
import com.catalog.options.enums.WorkFormat;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

/*
    @Builder - автоматическая генерация паттерна builder для создания объекта через него
    @Id + @GeneratedValue - автоинкрементируемый ID
    strategy = GenerationType.IDENTITY - стратегия генерации ID (тут - БД сама создает ID через AUTO_INCREMENT)
    @Column - ограничивает длину строк
    @Lob - поле должно храниться как большой объект (не через ограничение VARCHAR(n))
    @CreationTimestamp - автоматическое заполнение даты создания сущности
    @UpdateTimestamp - автоматически обновляется, когда сущность обновляется и сохраняется в БД
 */


@Entity
@Table(name = "user_profiles")
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfileEntity {

    @Id
    @Column(name = "user_id")
    private UUID userId;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private CompanyEntity company;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id")
    private CountryEntity country;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "city_id")
    private CityEntity city;

    @Enumerated(EnumType.STRING)
    @Column(name = "work_format")
    private WorkFormat workFormat;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profession_id")
    private ProfessionEntity profession;

    @Enumerated(EnumType.STRING)
    @Column(name = "seniority_level")
    private SeniorityLevel seniorityLevel;

    @Column(name = "company_grade")
    private Integer companyGrade;

//TODO Продумать диапазоны и обработчики

    @Column(
            name = "work_experience_years",
            precision = 3,
            scale = 1
    )
    private BigDecimal workExperienceYears;

    @Column(
            name = "salary",
            precision = 7,
            scale = 0
    )
    private BigDecimal salary;

    @Column(
            name = "bonus",
            precision = 7,
            scale = 0
    )
    private BigDecimal bonus;

    @Enumerated(EnumType.STRING)
    @Column(name = "currency", length = 3)
    private CurrencyCode currency;
}