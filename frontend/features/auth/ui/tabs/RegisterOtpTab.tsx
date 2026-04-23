"use client";

import { AuthContainer } from "@/app/auth/_components/AuthContainer";
import { AppButton } from "@/components/ui/app-button";
import { OtpInput } from "@/components/ui/otp-input";

import { FlowError } from "./FlowError";

type RegisterOtpTabProps = {
  email: string;
  otp: string;
  otpError?: string;
  errorMessage: string | null;
  isSubmitting: boolean;
  registerOtpResendSeconds: number;
  onOtpChange: (value: string) => void;
  onResendOtp: () => void;
  onBack: () => void;
};

export function RegisterOtpTab({
  email,
  otp,
  otpError,
  errorMessage,
  isSubmitting,
  registerOtpResendSeconds,
  onOtpChange,
  onResendOtp,
  onBack,
}: RegisterOtpTabProps) {
  return (
    <AuthContainer showBackButton onBack={onBack} backButtonDisabled={isSubmitting}>
      <section className="w-full max-w-[420px]">
        <h1 className="text-center text-2xl font-semibold mb-2">Введите код</h1>
        <p className="text-center text-sm mb-6">Отправили его на {email}</p>
        <form className="flex flex-col gap-4 items-center">
          <OtpInput
            value={otp}
            onChange={onOtpChange}
            error={Boolean(otpError)}
            autoFocus
            aria-label="OTP code for registration"
          />
          {otpError ? <p className="text-sm text-red-600">{otpError}</p> : null}
          <FlowError message={errorMessage} />
          <AppButton
            type="button"
            variant="text"
            onClick={onResendOtp}
            disabled={isSubmitting || registerOtpResendSeconds > 0}
          >
            {registerOtpResendSeconds > 0
              ? `Отправить код через ${registerOtpResendSeconds}сек`
              : "Отправить код еще раз"}
          </AppButton>
          <a href="tel:+79046318442" className="text-sm text-[#1677ff]">
            Связь с поддержкой
          </a>
        </form>
      </section>
    </AuthContainer>
  );
}
