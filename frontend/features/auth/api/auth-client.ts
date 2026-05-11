import type {
  ApiError,
  ApiResponseAuthResponseDto,
  ApiResponseUserExistResponse,
  ApiResponseVerificationToken,
  RefreshTokenDto,
  UserDto,
  UserRegisterDto,
  ValidateOtpDto,
} from "@/lib/api/gen/data-contracts";
import { api } from "@/lib/api/client";
import { AuthApiError, buildFieldErrors } from "@/features/auth/lib/auth-errors";
import type { AuthTokens } from "@/features/auth/api/auth-types";

type ApiEnvelope<TData> = {
  success?: boolean;
  message?: string;
  data?: TData;
  errors?: ApiError[];
};

function getMessage(payload: ApiEnvelope<unknown> | undefined, fallback: string): string {
  if (!payload) {
    return fallback;
  }

  return payload.message?.trim() || fallback;
}

function ensureSuccess(payload: ApiEnvelope<unknown> | undefined, fallback: string): void {
  if (!payload) {
    throw new AuthApiError(fallback);
  }

  if (payload.success === false) {
    throw new AuthApiError(getMessage(payload, fallback), buildFieldErrors(payload.errors));
  }
}

function extractData<TData>(payload: ApiEnvelope<TData> | undefined, fallback: string): TData {
  ensureSuccess(payload, fallback);

  if (!payload || payload.data === undefined || payload.data === null) {
    throw new AuthApiError(getMessage(payload, fallback), buildFieldErrors(payload?.errors));
  }

  return payload.data;
}

function extractTokens(payload: ApiResponseAuthResponseDto | undefined, fallback: string): AuthTokens {
  const data = extractData(payload, fallback);
  const accessToken = data.accessToken?.trim();
  const refreshToken = data.refreshToken?.trim();

  if (!accessToken || !refreshToken) {
    throw new AuthApiError("Сервер вернул некорректные токены авторизации.");
  }

  return { accessToken, refreshToken };
}

export async function loginUser(payload: UserDto): Promise<AuthTokens> {
  const response = await api.login(payload);
  return extractTokens(response.data, "Не удалось выполнить вход.");
}

export async function registerUser(payload: UserRegisterDto): Promise<AuthTokens> {
  const response = await api.register(payload);
  return extractTokens(response.data, "Не удалось зарегистрировать пользователя.");
}

export async function refreshSession(payload: RefreshTokenDto): Promise<AuthTokens> {
  const response = await api.refresh(payload);
  return extractTokens(response.data, "Не удалось обновить сессию.");
}

export async function setNewPassword(payload: UserRegisterDto): Promise<AuthTokens> {
  const response = await api.setNewPassword(payload);
  return extractTokens(response.data, "Не удалось обновить пароль.");
}

export async function isUserExists(email: string): Promise<boolean> {
  const response = await api.isUser({ email });
  const data = extractData<ApiResponseUserExistResponse["data"]>(
    response.data,
    "Не удалось проверить пользователя.",
  );

  return Boolean(data?.exists);
}

export async function sendOtp(email: string, purpose: "REGISTER" | "RESET_PASSWORD"): Promise<void> {
  const response = await api.resetPassword({ email, purpose });
  ensureSuccess(response.data, "Не удалось отправить OTP.");
}

export async function validateOtp(payload: ValidateOtpDto): Promise<string> {
  const response = await api.sendConfirmCode(payload);
  const data = extractData<ApiResponseVerificationToken["data"]>(
    response.data,
    "Не удалось подтвердить OTP.",
  );
  const verificationToken = data?.verificationToken?.trim();

  if (!verificationToken) {
    throw new AuthApiError("Сервер не вернул verification token.");
  }

  return verificationToken;
}
