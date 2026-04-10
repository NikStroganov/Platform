"use client";

import { FormEvent, useState } from "react";

import { AppButton } from "@/components/ui/app-button";
import { AppTextField } from "@/components/ui/app-text-field";
import type { FieldErrors } from "@/features/auth/api/auth-types";

type LoginFormProps = {
  isSubmitting: boolean;
  errorMessage: string | null;
  fieldErrors: FieldErrors;
  onSubmit: (data: { email: string; password: string }) => Promise<void>;
};

export function LoginForm({ isSubmitting, errorMessage, fieldErrors, onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit({ email, password });
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <AppTextField
        type="email"
        label="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={Boolean(fieldErrors.email)}
        helperText={fieldErrors.email}
        autoComplete="email"
        required
      />
      <AppTextField
        type="password"
        label="Пароль"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        error={Boolean(fieldErrors.password)}
        helperText={fieldErrors.password}
        autoComplete="current-password"
        required
      />
      {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}
      <AppButton type="submit" fullWidth loading={isSubmitting}>
        Войти
      </AppButton>
    </form>
  );
}

