import type { ApiError } from "@/lib/api/gen/data-contracts";
import type { FieldErrors } from "@/features/auth/api/auth-types";

export class AuthApiError extends Error {
  fieldErrors: FieldErrors;

  constructor(message: string, fieldErrors: FieldErrors = {}) {
    super(message);
    this.name = "AuthApiError";
    this.fieldErrors = fieldErrors;
  }
}

export function buildFieldErrors(errors?: ApiError[]): FieldErrors {
  if (!errors || errors.length === 0) {
    return {};
  }

  return errors.reduce<FieldErrors>((acc, item) => {
    const field = item.field?.trim();
    const error = item.error?.trim();
    if (!field || !error) {
      return acc;
    }

    acc[field] = error;
    return acc;
  }, {});
}

export function toAuthApiError(error: unknown): AuthApiError {
  if (error instanceof AuthApiError) {
    return error;
  }

  if (error instanceof Error && error.message) {
    return new AuthApiError(error.message);
  }

  return new AuthApiError("Не удалось выполнить запрос. Попробуйте позже.");
}

