package com.verification.repo;

import com.verification.entity.OtpEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface OtpRepo extends JpaRepository<OtpEntity, UUID> {
    Optional<OtpEntity> findTopByEmailAndUsedFalseOrderByCreatedAtDesc(String email);
}
