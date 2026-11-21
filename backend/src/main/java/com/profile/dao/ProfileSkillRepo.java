package com.profile.dao;

import com.profile.entity.ProfileSkillEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface ProfileSkillRepo extends JpaRepository<ProfileSkillEntity, UUID> {}