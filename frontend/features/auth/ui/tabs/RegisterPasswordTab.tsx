"use client";

import { type FormEvent } from "react";

import { AuthContainer } from "@/app/auth/_components/AuthContainer";
import { Icon } from "@/components/shared/icon";
import CircleCheckIcon from "@/components/shared/icon/icons/circle-check.svg";
import CircleCrossIcon from "@/components/shared/icon/icons/circle-cross.svg";
import { AppButton } from "@/components/ui/app-button";
import { AppTextField } from "@/components/ui/app-text-field";

import { FlowError } from "./FlowError";

type RegisterPasswordTabProps = {
  password: string;
  confirmPassword: string;
  passwordError?: string;
  showPasswordMismatch: boolean;
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasDigit: boolean;
  errorMessage: string | null;
  isSubmitting: boolean;
  canSubmit: boolean;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onConfirmPasswordBlur: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>;
  onBack: () => void;
};

export function RegisterPasswordTab({
  password,
  confirmPassword,
  passwordError,
  showPasswordMismatch,
  hasMinLength,
  hasUppercase,
  hasDigit,
  errorMessage,
  isSubmitting,
  canSubmit,
  onPasswordChange,
  onConfirmPasswordChange,
  onConfirmPasswordBlur,
  onSubmit,
  onBack,
}: RegisterPasswordTabProps) {
  return (
    <AuthContainer showBackButton onBack={onBack} backButtonDisabled={isSubmitting}>
      <section className="w-full max-w-[420px]">
        <h1 className="text-center text-2xl font-semibold mb-2">Придумайте пароль</h1>
        <p className="text-center text-sm text-gray-600 mb-6">Чтобы зарегистрироваться</p>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <AppTextField
            type="password"
            label="Пароль"
            value={password}
            onChange={(event) => onPasswordChange(event.target.value)}
            error={Boolean(passwordError)}
            helperText={passwordError}
            autoComplete="new-password"
            required
          />
          <AppTextField
            type="password"
            label="Повторите пароль"
            value={confirmPassword}
            onChange={(event) => onConfirmPasswordChange(event.target.value)}
            onBlur={onConfirmPasswordBlur}
            error={showPasswordMismatch}
            helperText={showPasswordMismatch ? "Пароли не совпадают." : ""}
            autoComplete="new-password"
            required
          />
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Icon component={hasMinLength ? CircleCheckIcon : CircleCrossIcon} />
              <p className={hasMinLength ? "text-[#52C41A]" : "text-[#c4c2be]"}>6 символов</p>
            </div>
            <div className="flex items-center gap-2">
              <Icon component={hasUppercase ? CircleCheckIcon : CircleCrossIcon} />
              <p className={hasUppercase ? "text-[#52C41A]" : "text-[#c4c2be]"}>
                Одна заглавная буква
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Icon component={hasDigit ? CircleCheckIcon : CircleCrossIcon} />
              <p className={hasDigit ? "text-[#52C41A]" : "text-[#c4c2be]"}>Одна цифра</p>
            </div>
          </div>
          <FlowError message={errorMessage} />
          <AppButton type="submit" fullWidth disabled={!canSubmit}>
            {isSubmitting ? "Создаем аккаунт..." : "Зарегистрироваться"}
          </AppButton>
        </form>
      </section>
    </AuthContainer>
  );
}
