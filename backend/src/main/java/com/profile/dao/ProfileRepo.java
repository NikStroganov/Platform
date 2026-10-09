package com.profile.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.profile.entity.ProfileEntity;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

//Параметры - сущность, с которой работаем и класс первичного ключа

@Repository
public interface ProfileRepo extends JpaRepository<ProfileEntity, UUID> {

    boolean existsByNicknameIgnoreCase(String nickname);
    //Optional<ProfileEntity> findByEmail(String email);
}