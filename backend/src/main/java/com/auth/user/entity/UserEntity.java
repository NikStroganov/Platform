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
    @Column(nullable = false, unique = true, length = 320)
    private String email;

    private Instant createdAt;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(columnDefinition = "TEXT")
    private String refreshToken;
    private Instant refreshTokenExpiration;

    public UserEntity(String email, Role role, String password) {
        this.email = email;
        this.role = role;
        this.password = password;
    }
}
