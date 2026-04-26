"use client";

import { type FormEvent } from "react";

import { AuthContainer } from "@/app/auth/_components/AuthContainer";
import { AppButton } from "@/components/ui/app-button";
import { AppTextField } from "@/components/ui/app-text-field";

import { FlowError } from "./FlowError";

type LoginTabProps = {
  password: string;
  passwordError?: string;
  errorMessage: string | null;
  isSubmitting: boolean;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>;
  onForgotPassword: () => void;
  onBack: () => void;
};

export function LoginTab({
  password,
  passwordError,
  errorMessage,
  isSubmitting,
  onPasswordChange,
  onSubmit,
  onForgotPassword,
  onBack,
}: LoginTabProps) {
  return (
    <AuthContainer showBackButton onBack={onBack} backButtonDisabled={isSubmitting}>
      <section className="w-full max-w-[420px] flex flex-col">
        <h1 className="text-center text-2xl font-semibold mb-2">Введите пароль</h1>
        <span className="text-center text-base font-medium text-black/50 mb-5">
          Чтобы войти в аккаунт
        </span>
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
          <AppTextField
            type="password"
            label="Пароль"
            value={password}
            onChange={(event) => onPasswordChange(event.target.value)}
            error={Boolean(passwordError)}
            helperText={passwordError}
            autoComplete="current-password"
          />
          <FlowError message={errorMessage} />
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
