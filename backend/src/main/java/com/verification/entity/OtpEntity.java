package com.verification.entity;

import com.utils.enums.VerificationPurpose;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "otp_codes")
public class OtpEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String code;
    private Instant createdAt;
    private Instant expiredAt;

    @Column(nullable = false)
    private boolean otpUsed;

    @Column(nullable = false)
    private boolean tokenVerified;

    @Enumerated(EnumType.STRING)
    private VerificationPurpose purpose;

    @Column(unique = true)
    private UUID verificationToken;
}