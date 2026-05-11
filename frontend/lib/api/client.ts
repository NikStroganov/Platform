import type { AxiosError, AxiosRequestConfig } from "axios";

import { Api } from "@/lib/api/gen/Api";
import { getAccessToken, getRefreshToken, clearAuthTokens, setAuthTokens } from "@/lib/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://backend.careit.tech";
const REFRESH_PATH = "/api/v1/auth/refresh";

type RetryableRequestConfig = AxiosRequestConfig & {
  _retry?: boolean;
};

export const api = new Api({ baseURL: API_BASE_URL });

let interceptorsInitialized = false;
let refreshPromise: Promise<string | null> | null = null;

function setAuthorizationHeader(config: AxiosRequestConfig, accessToken: string): void {
  const currentHeaders = config.headers;

  if (currentHeaders && typeof (currentHeaders as { set?: unknown }).set === "function") {
    (currentHeaders as { set: (name: string, value: string) => void }).set(
      "Authorization",
      `Bearer ${accessToken}`,
    );
    return;
  }

  config.headers = {
    ...(currentHeaders ?? {}),
    Authorization: `Bearer ${accessToken}`,
  };
}

function redirectToAuth(): void {
  if (typeof window === "undefined") {
    return;
  }

  if (window.location.pathname !== "/auth") {
    window.location.replace("/auth");
  }
}

function clearSessionAndRedirect(): void {
  clearAuthTokens();
  redirectToAuth();
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return null;
  }

  try {
    const response = await api.refresh({ refreshToken });
    const data = response.data?.data;
    const accessToken = data?.accessToken?.trim();
    const nextRefreshToken = data?.refreshToken?.trim();

    if (!accessToken || !nextRefreshToken) {
      return null;
    }

    setAuthTokens({ accessToken, refreshToken: nextRefreshToken });
    return accessToken;
  } catch {
    return null;
  }
}

export function initializeApiInterceptors(): void {
  if (interceptorsInitialized) {
    return;
  }

  interceptorsInitialized = true;

  api.instance.interceptors.request.use((config) => {
    const requestUrl = config.url ?? "";
    if (requestUrl.includes(REFRESH_PATH)) {
      return config;
    }

    const accessToken = getAccessToken();
    if (!accessToken) {
      return config;
    }

    const headers = config.headers ?? {};
    const hasAuthorization =
      typeof (headers as Record<string, unknown>).Authorization === "string" ||
      typeof (headers as Record<string, unknown>).authorization === "string";

    if (!hasAuthorization) {
      setAuthorizationHeader(config, accessToken);
    }

    return config;
  });

  api.instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const status = error.response?.status;
      const originalRequest = error.config as RetryableRequestConfig | undefined;

      if (status !== 401 || !originalRequest) {
        return Promise.reject(error);
      }

      const requestUrl = originalRequest.url ?? "";
      const isRefreshRequest = requestUrl.includes(REFRESH_PATH);

      if (originalRequest._retry || isRefreshRequest) {
        clearSessionAndRedirect();
        return Promise.reject(error);
      }

      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        clearSessionAndRedirect();
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }

      const nextAccessToken = await refreshPromise;
      if (!nextAccessToken) {
        clearSessionAndRedirect();
        return Promise.reject(error);
      }

      setAuthorizationHeader(originalRequest, nextAccessToken);

      return api.instance.request(originalRequest);
    },
  );
}
