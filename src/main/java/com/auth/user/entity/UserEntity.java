package com.auth.user.entity;

import com.auth.user.roles.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "db_users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String email;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;

    private String resetToken; //одноразовый токен для сброса пароля
    private Instant resetTokenExpiration;

    public UserEntity(String email, Role role, String password) {
        this.email = email;
        this.role = role;
        this.password = password;
    }
}
