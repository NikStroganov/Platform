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

import {
  ApiResponseAuthResponseDto,
  ApiResponseProfileDto,
  ApiResponseUserExistResponse,
  ApiResponseVerificationToken,
  ApiResponseVoid,
  ProfileDto,
  RefreshTokenDto,
  SendOtpDto,
  UserDto,
  UserEmailDto,
  UserRegisterDto,
  ValidateOtpDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Возврашает профиль конкретного клиента по уникальному id
   *
   * @tags profile-controller
   * @name GetProfile
   * @summary Получить профиль клиента
   * @request GET:/api/v1/userProfile/{id}
   */
  getProfile = (id: number, params: RequestParams = {}) =>
    this.request<ApiResponseProfileDto, any>({
      path: `/api/v1/userProfile/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * @description Обновляет данные в БД по клиенту
   *
   * @tags profile-controller
   * @name UpdateProfile
   * @summary Обновление профиля клиента
   * @request PUT:/api/v1/userProfile/{id}
   */
  updateProfile = (id: number, data: ProfileDto, params: RequestParams = {}) =>
    this.request<ApiResponseProfileDto, any>({
      path: `/api/v1/userProfile/${id}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Удалить профиль из БД по полученному id
   *
   * @tags profile-controller
   * @name DeleteProfile
   * @summary Удаление профиля клиента
   * @request DELETE:/api/v1/userProfile/{id}
   */
  deleteProfile = (id: number, params: RequestParams = {}) =>
    this.request<ApiResponseVoid, any>({
      path: `/api/v1/userProfile/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags otp-controller
   * @name SendConfirmCode
   * @request POST:/api/v1/verify/validateOtp
   */
  sendConfirmCode = (data: ValidateOtpDto, params: RequestParams = {}) =>
    this.request<ApiResponseVerificationToken, any>({
      path: `/api/v1/verify/validateOtp`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags otp-controller
   * @name ResetPassword
   * @request POST:/api/v1/verify/sendOtp
   */
  resetPassword = (data: SendOtpDto, params: RequestParams = {}) =>
    this.request<ApiResponseVoid, any>({
      path: `/api/v1/verify/sendOtp`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags otp-controller
   * @name IsUser
   * @request POST:/api/v1/verify/isUser
   */
  isUser = (data: UserEmailDto, params: RequestParams = {}) =>
    this.request<ApiResponseUserExistResponse, any>({
      path: `/api/v1/verify/isUser`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Возврашает список существующих профилей из БД
   *
   * @tags profile-controller
   * @name GetProfilesList
   * @summary Получить список профилей
   * @request GET:/api/v1/userProfile
   */
  getProfilesList = (params: RequestParams = {}) =>
    this.request<ProfileDto[], any>({
      path: `/api/v1/userProfile`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags profile-controller
   * @name CreateProfile
   * @summary Создать нового пользователя
   * @request POST:/api/v1/userProfile
   */
  createProfile = (data: ProfileDto, params: RequestParams = {}) =>
    this.request<ApiResponseProfileDto, any>({
      path: `/api/v1/userProfile`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags user-controller
   * @name SetNewPassword
   * @request POST:/api/v1/auth/set-new-password
   */
  setNewPassword = (data: UserRegisterDto, params: RequestParams = {}) =>
    this.request<ApiResponseAuthResponseDto, any>({
      path: `/api/v1/auth/set-new-password`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags user-controller
   * @name Register
   * @request POST:/api/v1/auth/register
   */
  register = (data: UserRegisterDto, params: RequestParams = {}) =>
    this.request<ApiResponseAuthResponseDto, any>({
      path: `/api/v1/auth/register`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags user-controller
   * @name Refresh
   * @request POST:/api/v1/auth/refresh
   */
  refresh = (data: RefreshTokenDto, params: RequestParams = {}) =>
    this.request<ApiResponseAuthResponseDto, any>({
      path: `/api/v1/auth/refresh`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags user-controller
   * @name Login
   * @request POST:/api/v1/auth/login
   */
  login = (data: UserDto, params: RequestParams = {}) =>
    this.request<ApiResponseAuthResponseDto, any>({
      path: `/api/v1/auth/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags profile-controller
   * @name TestRest
   * @summary Тестовый рест в зоне логина
   * @request GET:/api/v1/userProfile/loginZoneRest
   */
  testRest = (params: RequestParams = {}) =>
    this.request<ApiResponseProfileDto, any>({
      path: `/api/v1/userProfile/loginZoneRest`,
      method: "GET",
      ...params,
    });
}
