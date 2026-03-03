/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** DTO для профиля пользователя */
export interface ProfileDto {
  /**
   * Имя пользователя
   * @example "Иван"
   */
  firstName: string;
  /**
   * Фамилия пользователя
   * @example "Иванов"
   */
  lastName: string;
  /**
   * Почта пользователя
   * @example "ИванИванов@mail.ru"
   */
  email: string;
  /**
   * Должность пользователя
   * @example "Разработчик"
   */
  position?: string;
  /**
   * Страна пользователя
   * @example "Россия"
   */
  country?: string;
  /**
   * Место работы пользователя
   * @example "ПАО Сбербанк"
   */
  currentJob?: string;
  /**
   * Образование пользователя
   * @example "СПбГЭТУ ЛЭТИ"
   */
  education?: string;
  /**
   * Основная информация о пользователе
   * @example "Привет! Я Иван из России. Люблю писать код"
   */
  generalInfo?: string;
}

/** Статус код ошибки */
export interface ApiError {
  field?: string;
  error?: string;
}

/** Ответы для операций с профилем пользователя */
export interface ApiResponseProfileDto {
  /** Успешность операции */
  success?: boolean;
  /** Сообщение с инофрмацией о результате операции */
  message?: string;
  /** DTO для профиля пользователя */
  data?: ProfileDto;
  /**
   * Время запроса
   * @format date-time
   */
  timestamp?: string;
  /** Статус код ошибки */
  statusError?: ApiError[];
}

/** Dto для проверки существования пользователя */
export interface UserEmailDto {
  /**
   * @minLength 4
   * @maxLength 2147483647
   */
  email: string;
}

/** Ответы для операций с профилем пользователя */
export interface ApiResponseVoid {
  /** Успешность операции */
  success?: boolean;
  /** Сообщение с инофрмацией о результате операции */
  message?: string;
  /** Блок с DTO */
  data?: object;
  /**
   * Время запроса
   * @format date-time
   */
  timestamp?: string;
  /** Статус код ошибки */
  statusError?: ApiError[];
}

/** Dto для проверки существования пользователя */
export interface OtpCodeDto {
  /**
   * @minLength 4
   * @maxLength 2147483647
   */
  email: string;
  otp: string;
}

/** Ответы для операций с профилем пользователя */
export interface ApiResponseUserExistResponse {
  /** Успешность операции */
  success?: boolean;
  /** Сообщение с инофрмацией о результате операции */
  message?: string;
  /** Блок с DTO */
  data?: UserExistResponse;
  /**
   * Время запроса
   * @format date-time
   */
  timestamp?: string;
  /** Статус код ошибки */
  statusError?: ApiError[];
}

/** Блок с DTO */
export interface UserExistResponse {
  exists?: boolean;
}

/** Dto для авторизации */
export interface UserDto {
  /**
   * @minLength 4
   * @maxLength 2147483647
   */
  email: string;
  /**
   * @minLength 5
   * @maxLength 2147483647
   */
  password: string;
}

/** Ответы для операций с профилем пользователя */
export interface ApiResponseAuthResponseDto {
  /** Успешность операции */
  success?: boolean;
  /** Сообщение с инофрмацией о результате операции */
  message?: string;
  /** Ответ при авторизации с access и refresh токенами */
  data?: AuthResponseDto;
  /**
   * Время запроса
   * @format date-time
   */
  timestamp?: string;
  /** Статус код ошибки */
  statusError?: ApiError[];
}

/** Ответ при авторизации с access и refresh токенами */
export interface AuthResponseDto {
  accessToken?: string;
  refreshToken?: string;
}

/** Dto для запроса нового access токена по refresh токену */
export interface RefreshTokenDto {
  refreshToken: string;
}
