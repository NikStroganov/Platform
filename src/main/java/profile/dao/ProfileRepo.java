package profile.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import profile.Profile;

import java.util.Optional;

//Работает только с сущностями, не с Dto
//Параметры - сущность, с которой работаем и класс первичного ключа

public interface ProfileRepo extends JpaRepository<Profile, Long>, ProfileCustomRepo {
    //DONE пока базовый CRUD, добавить кастомные запросы
    Optional<Profile> findByEmail(String email);
}

