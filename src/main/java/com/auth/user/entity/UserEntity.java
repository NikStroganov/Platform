package com.auth.user.entity;

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

    private String resetToken; //одноразовый токен для сброса пароля
    private Instant resetTokenExpiration;

    public UserEntity(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
