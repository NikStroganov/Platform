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
  errors?: ApiError[];
}

/** Dto для проверки OTP */
export interface ValidateOtpDto {
  email: string;
  /**
   * @minLength 6
   * @maxLength 6
   */
  otp: string;
}

/** Ответы для операций с профилем пользователя */
export interface ApiResponseVerificationToken {
  /** Успешность операции */
  success?: boolean;
  /** Сообщение с инофрмацией о результате операции */
  message?: string;
  /** Блок с DTO */
  data?: VerificationToken;
  /**
   * Время запроса
   * @format date-time
   */
  timestamp?: string;
  /** Статус код ошибки */
  errors?: ApiError[];
}

/** Блок с DTO */
export interface VerificationToken {
  /** @format uuid */
  verificationToken: string;
}

/** Dto для отправки OTP */
export interface SendOtpDto {
  email: string;
  purpose: "REGISTER" | "RESET_PASSWORD";
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
  errors?: ApiError[];
}

/** Dto для проверки существования пользователя */
export interface UserEmailDto {
  email: string;
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
  errors?: ApiError[];
}

/** Блок с DTO */
export interface UserExistResponse {
  exists?: boolean;
}

export interface OnboardingDto {
  /**
   * @minLength 2
   * @maxLength 20
   */
  nickname: string;
  /** @format uuid */
  companyId: string;
  /** @format uuid */
  countryId: string;
  /** @format uuid */
  cityId?: string;
  workFormat: "OFFICE" | "HYBRID" | "REMOTE";
  /** @format uuid */
  professionId: string;
  seniorityLevel:
    | "INTERN"
    | "JUNIOR"
    | "JUNIOR_PLUS"
    | "MIDDLE"
    | "MIDDLE_PLUS"
    | "SENIOR"
    | "EXPERT"
    | "LEAD"
    | "DIRECTOR";
  /**
   * @format int32
   * @min 1
   * @max 100
   */
  companyGrade?: number;
  /**
   * @min 0
   * @exclusiveMin false
   * @max 50
   * @exclusiveMax false
   */
  workExperienceYears: number;
  /**
   * @min 0
   * @exclusiveMin false
   * @max 2000000
   * @exclusiveMax false
   */
  salary: number;
  /**
   * @min 0
   * @exclusiveMin false
   * @max 2000000
   * @exclusiveMax false
   */
  bonus?: number;
  currency: "RUB" | "USD";
}

export interface UserRegisterDto {
  email: string;
  /** @pattern ^(?=.*[A-Z])(?=.*\d).{6,}$ */
  password: string;
  /** @format uuid */
  verificationToken: string;
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
  errors?: ApiError[];
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

/** Dto для авторизации */
export interface UserDto {
  email: string;
  password: string;
}

export interface SearchRequest {
  /** Тип поиска */
  type: "COMPANY" | "SKILL" | "PROFESSION" | "COUNTRY" | "CITY";
  /**
   * Запрос пользователя в поиске
   * @minLength 0
   * @maxLength 100
   */
  query: string;
  /**
   * Номер страницы из общего списка
   * @format int32
   * @min 0
   */
  page?: number;
  /**
   * Количество выводимых элементов
   * @format int32
   * @min 0
   * @max 50
   */
  size?: number;
}

/** Ответы для операций с профилем пользователя */
export interface ApiResponseSearchResponse {
  /** Успешность операции */
  success?: boolean;
  /** Сообщение с инофрмацией о результате операции */
  message?: string;
  /** Блок с DTO */
  data?: SearchResponse;
  /**
   * Время запроса
   * @format date-time
   */
  timestamp?: string;
  /** Статус код ошибки */
  errors?: ApiError[];
}

/** Блок с DTO */
export interface SearchResponse {
  query?: string;
  type?: "COMPANY" | "SKILL" | "PROFESSION" | "COUNTRY" | "CITY";
  items?: SearchResult[];
  /** @format int32 */
  page?: number;
  /** @format int32 */
  size?: number;
  hasNext?: boolean;
}

export interface SearchResult {
  /** @format uuid */
  id?: string;
  type?: "COMPANY" | "SKILL" | "PROFESSION" | "COUNTRY" | "CITY";
  name?: string;
}

/** Ответы для операций с профилем пользователя */
export interface ApiResponseListTopProfessionDto {
  /** Успешность операции */
  success?: boolean;
  /** Сообщение с инофрмацией о результате операции */
  message?: string;
  /** Блок с DTO */
  data?: TopProfessionDto[];
  /**
   * Время запроса
   * @format date-time
   */
  timestamp?: string;
  /** Статус код ошибки */
  errors?: ApiError[];
}

/** Блок с DTO */
export interface TopProfessionDto {
  /** @format uuid */
  professionId?: string;
  name?: string;
  backgroundColor?: string;
}

/** Ответы для операций с профилем пользователя */
export interface ApiResponseListCatalogOptionDto {
  /** Успешность операции */
  success?: boolean;
  /** Сообщение с инофрмацией о результате операции */
  message?: string;
  /** Блок с DTO */
  data?: CatalogOptionDto[];
  /**
   * Время запроса
   * @format date-time
   */
  timestamp?: string;
  /** Статус код ошибки */
  errors?: ApiError[];
}

/** Блок с DTO */
export interface CatalogOptionDto {
  code?: string;
  label?: string;
}

/** Ответы для операций с профилем пользователя */
export interface ApiResponseListTopCompanyDto {
  /** Успешность операции */
  success?: boolean;
  /** Сообщение с инофрмацией о результате операции */
  message?: string;
  /** Блок с DTO */
  data?: TopCompanyDto[];
  /**
   * Время запроса
   * @format date-time
   */
  timestamp?: string;
  /** Статус код ошибки */
  errors?: ApiError[];
}

/** Блок с DTO */
export interface TopCompanyDto {
  /** @format uuid */
  companyId?: string;
  name?: string;
  logoKey?: string;
  backgroundColor?: string;
}

/** Ответы для операций с профилем пользователя */
export interface ApiResponseListTopCityDto {
  /** Успешность операции */
  success?: boolean;
  /** Сообщение с инофрмацией о результате операции */
  message?: string;
  /** Блок с DTO */
  data?: TopCityDto[];
  /**
   * Время запроса
   * @format date-time
   */
  timestamp?: string;
  /** Статус код ошибки */
  errors?: ApiError[];
}

/** Блок с DTO */
export interface TopCityDto {
  /** @format uuid */
  cityId?: string;
  name?: string;
  backgroundColor?: string;
}
