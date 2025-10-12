package com.auth.model;

import jakarta.persistence.*;


@Entity
@Table(name = "Roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "RoleName", unique = false, length = 20)
    private String name;

}
