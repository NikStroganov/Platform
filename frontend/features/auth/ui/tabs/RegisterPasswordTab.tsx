"use client";

import { type SyntheticEvent, useMemo, useState } from "react";

import { AuthContainer } from "@/app/auth/_components/AuthContainer";
import { Icon } from "@/components/shared/icon";
import CircleCheckIcon from "@/components/shared/icon/icons/circle-check.svg";
import CircleCrossIcon from "@/components/shared/icon/icons/circle-cross.svg";
import { AppButton } from "@/components/ui/app-button";
import { AppTextField } from "@/components/ui/app-text-field";

import { FlowError } from "./FlowError";

const CYRILLIC_PATTERN = /[А-Яа-яЁё]/g;
const HAS_UPPERCASE_PATTERN = /[A-Z]/;
const HAS_DIGIT_PATTERN = /\d/;

type RegisterPasswordTabProps = {
  title: string;
  description?: string;
  buttonText: string;
  buttonBusyText: string;
  passwordError?: string;
  errorMessage: string | null;
  isSubmitting: boolean;
  onSubmit: (password: string) => Promise<void>;
  onBack: () => void;
};

function stripCyrillic(value: string): string {
  return value.replace(CYRILLIC_PATTERN, "");
}

function getRequirementTextClass(isValid: boolean): string | undefined {
  return isValid ? "text-success" : undefined;
}

export function RegisterPasswordTab({
  title,
  description,
  buttonText,
  buttonBusyText,
  passwordError,
  errorMessage,
  isSubmitting,
  onSubmit,
  onBack,
}: RegisterPasswordTabProps) {
  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const hasMinLength = password.length >= 6;
  const hasUppercase = HAS_UPPERCASE_PATTERN.test(password);
  const hasDigit = HAS_DIGIT_PATTERN.test(password);
  const isPasswordValid = hasMinLength && hasUppercase && hasDigit;

  const showPasswordMismatch = useMemo(() => {
    if (!confirmPasswordTouched) {
      return false;
    }

    return Boolean(password && confirmPassword && password !== confirmPassword);
  }, [confirmPassword, confirmPasswordTouched, password]);

  const canSubmit =
    !isSubmitting &&
    !showPasswordMismatch &&
    isPasswordValid &&
    Boolean(confirmPassword);
  const showWeakPasswordError = passwordTouched && !isPasswordValid;

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    event.preventDefault();
    setPasswordTouched(true);
    setConfirmPasswordTouched(true);

    if (!canSubmit) {
      return;
    }

    await onSubmit(password);
  }

  return (
    <AuthContainer
      showBackButton
      onBack={onBack}
      backButtonDisabled={isSubmitting}
    >
      <section className="w-full max-w-[420px]">
        <h1
          className={`text-center text-2xl font-semibold ${description ? "mb-2" : "mb-5"}`}
        >
          {title}
        </h1>
        {description ? (
          <p className="text-center text-sm text-gray-600 mb-6">
            {description}
          </p>
        ) : null}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <AppTextField
            type="password"
            label="Пароль"
            value={password}
            onChange={(event) => setPassword(stripCyrillic(event.target.value))}
            onBlur={() => setPasswordTouched(true)}
            error={Boolean(passwordError) || showWeakPasswordError}
            helperText={
              passwordError ??
              (showWeakPasswordError
                ? "Придумайте более сложный пароль"
                : undefined)
            }
            autoComplete="new-password"
            required
          />
          <AppTextField
            type="password"
            label="Повторите пароль"
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(stripCyrillic(event.target.value))
            }
            onBlur={() => setConfirmPasswordTouched(true)}
            error={showPasswordMismatch}
            helperText={showPasswordMismatch ? "Пароли не совпадают." : ""}
            autoComplete="new-password"
            required
          />
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Icon
                component={hasMinLength ? CircleCheckIcon : CircleCrossIcon}
              />
              <p className={getRequirementTextClass(hasMinLength)}>
                6 символов
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Icon
                component={hasUppercase ? CircleCheckIcon : CircleCrossIcon}
              />
              <p className={getRequirementTextClass(hasUppercase)}>
                Одна заглавная буква
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Icon component={hasDigit ? CircleCheckIcon : CircleCrossIcon} />
              <p className={getRequirementTextClass(hasDigit)}>Одна цифра</p>
            </div>
          </div>
          <FlowError message={errorMessage} />
          <AppButton type="submit" fullWidth disabled={!canSubmit}>
            {isSubmitting ? buttonBusyText : buttonText}
          </AppButton>
        </form>
      </section>
    </AuthContainer>
  );
}
