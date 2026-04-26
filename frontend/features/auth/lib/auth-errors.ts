import type { ApiError } from "@/lib/api/gen/data-contracts";
import type { FieldErrors } from "@/features/auth/api/auth-types";

type ApiEnvelopeLike = {
  message?: unknown;
  errors?: unknown;
};

type ErrorLikeWithResponse = {
  response?: {
    status?: unknown;
    data?: unknown;
  };
  data?: unknown;
};

export class AuthApiError extends Error {
  fieldErrors: FieldErrors;
  statusCode: number | null;

  constructor(
    message: string,
    fieldErrors: FieldErrors = {},
    statusCode: number | null = null,
  ) {
    super(message);
    this.name = "AuthApiError";
    this.fieldErrors = fieldErrors;
    this.statusCode = statusCode;
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

  if (typeof error === "object" && error !== null) {
    const errorObject = error as ErrorLikeWithResponse;
    const responseStatus =
      typeof errorObject.response?.status === "number"
        ? errorObject.response.status
        : null;
    const payloadCandidates: unknown[] = [errorObject.response?.data, errorObject.data];

    for (const candidate of payloadCandidates) {
      if (typeof candidate !== "object" || candidate === null) {
        continue;
      }

      const payload = candidate as ApiEnvelopeLike;
      const payloadMessage =
        typeof payload.message === "string" ? payload.message.trim() : "";
      const payloadErrors = Array.isArray(payload.errors)
        ? buildFieldErrors(payload.errors as ApiError[])
        : {};

      if (payloadMessage) {
        return new AuthApiError(payloadMessage, payloadErrors, responseStatus);
      }

      if (Object.keys(payloadErrors).length > 0) {
        return new AuthApiError("Не удалось выполнить запрос.", payloadErrors, responseStatus);
      }
    }
  }

  if (error instanceof Error && error.message) {
    return new AuthApiError(error.message);
  }

  return new AuthApiError("Не удалось выполнить запрос. Попробуйте позже.");
}
