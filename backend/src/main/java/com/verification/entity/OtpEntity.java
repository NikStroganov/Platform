package com.verification.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "otp_codes")
public class OtpEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;


    private String email;
    private String code;
    private Instant createdAt;
    private Instant expiredAt;
    private boolean used;

    public OtpEntity(String email, String code, Instant createdAt, Instant expiredAt, boolean used) {
        this.email = email;
        this.code = code;
        this.createdAt = createdAt;
        this.expiredAt = expiredAt;
        this.used = used;
    }
}
