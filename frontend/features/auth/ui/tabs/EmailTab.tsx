"use client";

import { type FormEvent } from "react";

import { AuthContainer } from "@/app/auth/_components/AuthContainer";
import { AppButton } from "@/components/ui/app-button";
import { AppTextField } from "@/components/ui/app-text-field";

import { FlowError } from "./FlowError";

type EmailTabProps = {
  emailInput: string;
  emailError?: string;
  errorMessage: string | null;
  isSubmitting: boolean;
  onEmailInputChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>;
};

export function EmailTab({
  emailInput,
  emailError,
  errorMessage,
  isSubmitting,
  onEmailInputChange,
  onSubmit,
}: EmailTabProps) {
  return (
    <AuthContainer>
      <section className="w-full max-w-[420px] flex flex-col">
        <h1 className="text-center text-2xl font-semibold mb-2">Введите почту</h1>
        <span className="text-center text-base font-medium text-black/50 mb-5">
          Чтобы войти или зарегистрироваться
        </span>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <AppTextField
            type="email"
            label="Email"
            value={emailInput}
            onChange={(event) => onEmailInputChange(event.target.value)}
            error={Boolean(emailError)}
            helperText={emailError}
            autoComplete="email"
            required
          />
          <FlowError message={errorMessage} />
          <AppButton type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? "Проверяем..." : "Продолжить"}
          </AppButton>
        </form>
        <p className="text-xs text-[#808080] font-medium mt-1.5">
          Нажимая кнопку «Войти», вы даете свое согласие на обработку
          персональных данных согласно
          <a href="http://example.com/terms" className="text-[#1677ff]">
            оферте
          </a>
        </p>
      </section>
    </AuthContainer>
  );
}
