"use client";

import { type FormEvent } from "react";

import { AuthContainer } from "@/app/auth/_components/AuthContainer";
import { AppButton } from "@/components/ui/app-button";
import { AppTextField } from "@/components/ui/app-text-field";

import { FlowError } from "./FlowError";

type ResetPasswordTabProps = {
  email: string;
  password: string;
  confirmPassword: string;
  passwordError?: string;
  passwordMismatch: boolean;
  errorMessage: string | null;
  isSubmitting: boolean;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>;
  onBack: () => void;
};

export function ResetPasswordTab({
  email,
  password,
  confirmPassword,
  passwordError,
  passwordMismatch,
  errorMessage,
  isSubmitting,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  onBack,
}: ResetPasswordTabProps) {
  return (
    <AuthContainer showBackButton onBack={onBack} backButtonDisabled={isSubmitting}>
      <section className="w-full max-w-[420px]">
        <h1 className="text-center text-2xl font-semibold mb-2">Новый пароль</h1>
        <p className="text-center text-sm text-gray-600 mb-6">{email}</p>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <AppTextField
            type="password"
            label="Новый пароль"
            value={password}
            onChange={(event) => onPasswordChange(event.target.value)}
            error={Boolean(passwordError) || Boolean(passwordMismatch)}
            helperText={
              passwordError ||
              (passwordMismatch ? "Пароли не совпадают." : "Мин. 6 символов, 1 заглавная буква и 1 цифра")
            }
            autoComplete="new-password"
            required
          />
          <AppTextField
            type="password"
            label="Повторите пароль"
            value={confirmPassword}
            onChange={(event) => onConfirmPasswordChange(event.target.value)}
            error={Boolean(passwordMismatch)}
            helperText={passwordMismatch ? "Пароли не совпадают." : ""}
            autoComplete="new-password"
            required
          />
          <FlowError message={errorMessage} />
          <AppButton type="submit" fullWidth disabled={isSubmitting || Boolean(passwordMismatch)}>
            {isSubmitting ? "Сохраняем..." : "Сохранить новый пароль"}
          </AppButton>
        </form>
      </section>
    </AuthContainer>
  );
}
