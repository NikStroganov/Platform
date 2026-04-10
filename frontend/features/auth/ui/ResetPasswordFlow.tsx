"use client";

import { FormEvent, useEffect, useState } from "react";

import { AppButton } from "@/components/ui/app-button";
import { AppTextField } from "@/components/ui/app-text-field";
import type { FieldErrors } from "@/features/auth/api/auth-types";

type ResetPasswordFlowProps = {
  step: "email" | "otp" | "password";
  email: string;
  isSubmitting: boolean;
  errorMessage: string | null;
  fieldErrors: FieldErrors;
  onStart: (email: string) => Promise<void>;
  onVerifyOtp: (otp: string) => Promise<void>;
  onComplete: (password: string) => Promise<void>;
  onResendOtp: () => Promise<void>;
  onBackToEmail: () => void;
};

export function ResetPasswordFlow({
  step,
  email,
  isSubmitting,
  errorMessage,
  fieldErrors,
  onStart,
  onVerifyOtp,
  onComplete,
  onResendOtp,
  onBackToEmail,
}: ResetPasswordFlowProps) {
  const [emailInput, setEmailInput] = useState(email);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    setEmailInput(email);
  }, [email]);

  async function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onStart(emailInput);
  }

  async function handleOtpSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onVerifyOtp(otp);
  }

  async function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Пароли не совпадают.");
      return;
    }

    setPasswordError(null);
    await onComplete(password);
  }

  if (step === "email") {
    return (
      <form className="flex flex-col gap-4" onSubmit={handleEmailSubmit}>
        <AppTextField
          type="email"
          label="Email"
          value={emailInput}
          onChange={(event) => setEmailInput(event.target.value)}
          error={Boolean(fieldErrors.email)}
          helperText={fieldErrors.email}
          autoComplete="email"
          required
        />
        {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}
        <AppButton type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? "Отправляем код..." : "Получить OTP код"}
        </AppButton>
      </form>
    );
  }

  if (step === "otp") {
    return (
      <form className="flex flex-col gap-4" onSubmit={handleOtpSubmit}>
        <p className="text-sm text-gray-600">Мы отправили код на {email}.</p>
        <AppTextField
          label="OTP код"
          value={otp}
          onChange={(event) => setOtp(event.target.value)}
          slotProps={{ htmlInput: { maxLength: 6 } }}
          error={Boolean(fieldErrors.otp)}
          helperText={fieldErrors.otp}
          required
        />
        {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}
        <AppButton type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? "Проверяем..." : "Подтвердить OTP"}
        </AppButton>
        <AppButton type="button" variant="text" onClick={() => void onResendOtp()} disabled={isSubmitting}>
          Отправить код еще раз
        </AppButton>
        <AppButton type="button" variant="text" onClick={onBackToEmail} disabled={isSubmitting}>
          Изменить email
        </AppButton>
      </form>
    );
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handlePasswordSubmit}>
      <p className="text-sm text-gray-600">Задайте новый пароль для {email}.</p>
      <AppTextField
        type="password"
        label="Новый пароль"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        error={Boolean(fieldErrors.password) || Boolean(passwordError)}
        helperText={fieldErrors.password || passwordError || "Мин. 6 символов, 1 заглавная буква и 1 цифра"}
        autoComplete="new-password"
        required
      />
      <AppTextField
        type="password"
        label="Повторите пароль"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        error={Boolean(passwordError)}
        helperText={passwordError}
        autoComplete="new-password"
        required
      />
      {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}
      <AppButton type="submit" fullWidth disabled={isSubmitting}>
        {isSubmitting ? "Обновляем..." : "Сохранить новый пароль"}
      </AppButton>
    </form>
  );
}
