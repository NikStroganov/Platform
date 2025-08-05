package profile;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepo extends JpaRepository<Profile, Long> {
    //TODO пока базовый CRUD, добавить кастомные запросы
}
