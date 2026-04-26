"use client";

import { type FormEvent, useState } from "react";

import { AuthContainer } from "@/app/auth/_components/AuthContainer";
import { AppButton } from "@/components/ui/app-button";
import { AppTextField } from "@/components/ui/app-text-field";

import { FlowError } from "./FlowError";

type LoginTabProps = {
  passwordError?: string;
  errorMessage: string | null;
  isSubmitting: boolean;
  onSubmit: (password: string) => Promise<void>;
  onForgotPassword: () => void;
  onBack: () => void;
};

export function LoginTab({
  passwordError,
  errorMessage,
  isSubmitting,
  onSubmit,
  onForgotPassword,
  onBack,
}: LoginTabProps) {
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit(password);
  }

  return (
    <AuthContainer showBackButton onBack={onBack} backButtonDisabled={isSubmitting}>
      <section className="w-full max-w-[420px] flex flex-col">
        <h1 className="text-center text-2xl font-semibold mb-2">Введите пароль</h1>
        <span className="text-center text-base font-medium text-black/50 mb-5">
          Чтобы войти в аккаунт
        </span>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <AppTextField
            type="password"
            label="Пароль"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={Boolean(passwordError)}
            helperText={passwordError}
            autoComplete="current-password"
          />
          <AppButton
            type="button"
            variant="text"
            onClick={onForgotPassword}
            disabled={isSubmitting}
          >
            Забыли пароль?
          </AppButton>
          <AppButton type="submit" fullWidth disabled={isSubmitting || !password.length}>
            Продолжить
          </AppButton>
        </form>
      </section>
    </AuthContainer>
  );
}
