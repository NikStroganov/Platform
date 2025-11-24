package com.auth.legacy.repo;

import com.auth.legacy.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RolesRepo extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String name);
}
