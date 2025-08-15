package profile.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import profile.Profile;

import java.util.Optional;

//работает только с сущностями, не с Dto

public interface ProfileRepo extends JpaRepository<Profile, Long>, ProfileCustomRepo {
    //TODO пока базовый CRUD, добавить кастомные запросы
    Optional<Profile> findByEmail(String email);
}

