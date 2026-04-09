package com.verification.repo;

import com.utils.enums.VerificationPurpose;
import com.verification.entity.OtpEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface OtpRepo extends JpaRepository<OtpEntity, Long> {
    Optional<OtpEntity> findByEmail(String email);
    Optional<OtpEntity> findTopByEmailAndOtpUsedFalseOrderByCreatedAtDesc(String email);
    Optional<OtpEntity> findByEmailAndVerificationTokenAndPurposeAndTokenVerifiedTrue(String email, UUID token, VerificationPurpose purpose);
}