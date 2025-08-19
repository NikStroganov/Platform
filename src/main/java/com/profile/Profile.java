package com.profile;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

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
@Table(name = "Profiles")
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "FirstName", length = 100)
    private String firstName;

    @Column(name = "LastName", length = 100)
    private String lastName;

    @Column(name = "Email", length = 200)
    private String email;

    @Column(name = "Position", length = 100)
    private String position;

    @Column(name = "Country", length = 50)
    private String country;

    @Column(name = "CurrentJob", length = 150)
    private String currentJob;

    @Lob
    @Column(name = "Education", columnDefinition = "TEXT")
    private String education;

    @Lob
    @Column(name = "GeneralInfo", columnDefinition = "TEXT")
    private String generalInfo;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

}
