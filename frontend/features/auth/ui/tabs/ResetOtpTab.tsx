"use client";

import { type FormEvent } from "react";

import { AuthContainer } from "@/app/auth/_components/AuthContainer";
import { AppButton } from "@/components/ui/app-button";
import { OtpInput } from "@/components/ui/otp-input";

import { FlowError } from "./FlowError";

type ResetOtpTabProps = {
  email: string;
  otp: string;
  otpError?: string;
  errorMessage: string | null;
  isSubmitting: boolean;
  onOtpChange: (value: string) => void;
  onResendOtp: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>;
  onBack: () => void;
};

export function ResetOtpTab({
  email,
  otp,
  otpError,
  errorMessage,
  isSubmitting,
  onOtpChange,
  onResendOtp,
  onSubmit,
  onBack,
}: ResetOtpTabProps) {
  return (
    <AuthContainer showBackButton onBack={onBack} backButtonDisabled={isSubmitting}>
      <section className="w-full max-w-[420px]">
        <h1 className="text-center text-2xl font-semibold mb-2">Забыли пароль?</h1>
        <p className="text-center text-sm mb-6">Введите код из письма. Отправили его на&nbsp;{email}</p>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <OtpInput
            value={otp}
            onChange={onOtpChange}
            error={Boolean(otpError)}
            autoFocus
            aria-label="OTP code for password reset"
          />
          <FlowError message={errorMessage} />
          <AppButton type="button" variant="text" onClick={onResendOtp} disabled={isSubmitting}>
            Отправить код еще раз
          </AppButton>
        </form>
      </section>
    </AuthContainer>
  );
}
