import type { AuthTokens } from "@/features/auth/api/auth-types";
import {
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  setAuthTokens,
} from "@/features/auth/lib/token-storage";

export { getAccessToken, getRefreshToken, removeAccessToken, clearAuthTokens, setAuthTokens };

export function saveAuthTokens(tokens: AuthTokens): void {
  setAuthTokens(tokens);
}

export function isAuthenticated(): boolean {
  return Boolean(getAccessToken());
}
