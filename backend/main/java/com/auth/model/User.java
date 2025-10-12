package com.auth.model;


import jakarta.persistence.*;
import java.util.Set;


@Entity
@Table(name = "Users")

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "usernames", unique = true, length = 50)
    private String username;

    @Column(name = "passwords", unique = true, length = 30)
    private String password;

    private Set<Role> roleSet;

}
