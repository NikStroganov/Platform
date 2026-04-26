"use client";

import { type FormEvent, useState } from "react";

import { AuthContainer } from "@/app/auth/_components/AuthContainer";
import { AppButton } from "@/components/ui/app-button";
import { AppTextField } from "@/components/ui/app-text-field";

import { FlowError } from "./FlowError";

type EmailTabProps = {
  emailError?: string;
  errorMessage: string | null;
  isSubmitting: boolean;
  onSubmit: (email: string) => Promise<void>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EmailTab({
  emailError,
  errorMessage,
  isSubmitting,
  onSubmit,
}: EmailTabProps) {
  const [emailInput, setEmailInput] = useState("");
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
  const normalizedEmail = emailInput.trim();
  const isInvalidEmail =
    Boolean(normalizedEmail.length) && !EMAIL_PATTERN.test(normalizedEmail);
  const showClientEmailError = hasTriedSubmit && isInvalidEmail;
  const canSubmit =
    !isSubmitting && Boolean(normalizedEmail.length) && !isInvalidEmail;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHasTriedSubmit(true);
    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      return;
    }
    await onSubmit(emailInput);
  }

  return (
    <AuthContainer>
      <section className="w-full max-w-[420px] flex flex-col">
        <h1 className="text-center text-2xl font-semibold mb-2">Введите почту</h1>
        <span className="text-center text-base font-medium text-black/50 mb-5">
          Чтобы войти или зарегистрироваться
        </span>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <AppTextField
            type="email"
            label="Email"
            value={emailInput}
            onChange={(event) => setEmailInput(event.target.value)}
            error={Boolean(emailError) || showClientEmailError}
            helperText={showClientEmailError ? "Некорректный email" : emailError}
            autoComplete="email"
            required
          />
          <FlowError message={errorMessage} />
          <AppButton
            type="submit"
            fullWidth
            disabled={!hasTriedSubmit ? isSubmitting : !canSubmit}
          >
            {isSubmitting ? "Проверяем..." : "Войти"}
          </AppButton>
        </form>
        <p className="text-xs text-[#808080] font-medium mt-1.5">
          Нажимая кнопку «Войти», вы даете свое согласие на обработку
          персональных данных согласно&nbsp;
          <a href="http://example.com/terms" className="text-[#1677ff]">
            оферте
          </a>
        </p>
      </section>
    </AuthContainer>
  );
}
