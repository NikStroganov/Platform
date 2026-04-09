package com.utils.enums;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum Errors {

    //Business
    EMAIL_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, "Почта уже зарегистрирована"),
    INVALID_EMAIL(HttpStatus.BAD_REQUEST, "Неверный email"),
    INVALID_PASSWORD(HttpStatus.BAD_REQUEST, "Неверный пароль"),
    SAMENESS_PASSWORD(HttpStatus.BAD_REQUEST, "Новый пароль аналогичен старому"),
    OTP_CODE_IS_EXPIRED(HttpStatus.BAD_REQUEST, "Срок жизни кода истек"),
    INVALID_OTP(HttpStatus.BAD_REQUEST, "Неверный код"),
    OTP_CODE_NOT_FOUND(HttpStatus.BAD_REQUEST, "Код не найден"),
    INTERNAL_SYSTEM_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Сервис временно недоступен. Попробуйте через 5 минут или позже"),


    //Technical
    VALIDATION_ERROR(HttpStatus.BAD_REQUEST, "Ошибка валидации входных данных в URL/query-параметрах"),
    USER_NOT_FOUND(HttpStatus.UNAUTHORIZED, "Пользователь не найден"),
    REFRESH_TOKEN_MISMATCH(HttpStatus.UNAUTHORIZED, "Несоответствие рефреш токена"),
    UNVERIFIED_BY_OTP_USER(HttpStatus.BAD_REQUEST, "Пользователь не верифицирован"),
    REFRESH_TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "Рефреш токен истек"),
    INVALID_TOKEN_TYPE(HttpStatus.BAD_REQUEST, "Неверный тип токена");

    private final HttpStatus status;
    private final String message;
    Errors(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }
}