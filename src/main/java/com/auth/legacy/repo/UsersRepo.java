package com.auth.legacy.repo;

import com.auth.legacy.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersRepo extends JpaRepository<User, Long> {
    Optional<User> findByUsername (String username);
    boolean existsByUsername (String username);
}
