export type FieldErrors = Record<string, string>;

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthMode = "login" | "register" | "reset";

