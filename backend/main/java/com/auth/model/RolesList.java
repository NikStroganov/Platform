package com.auth.model;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum RolesList {
    //todo Опеределить список ролей в зависимости от подписочной системы

    BASE_USER_ROLE,
    FIRST_LEVEL_SUB_USER_ROLE,
    ADMIN_ROLE;

}
