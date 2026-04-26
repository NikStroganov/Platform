"use client";

import { useEffect, useRef, useState } from "react";

import { AuthContainer } from "@/app/auth/_components/AuthContainer";
import { AppButton } from "@/components/ui/app-button";
import { OtpInput } from "@/components/ui/otp-input";

import { FlowError } from "./FlowError";

const OTP_LENGTH = 6;
const RESEND_DELAY_SECONDS = 30;

type OtpTabProps = {
  title: string;
  description: string;
  otpError?: string;
  errorMessage: string | null;
  errorStatusCode?: number | null;
  isSubmitting: boolean;
  onSubmitOtp: (otp: string) => Promise<void>;
  onResendOtp: () => Promise<void>;
  onBack: () => void;
};

export function OtpTab({
  title,
  description,
  otpError,
  errorMessage,
  errorStatusCode,
  isSubmitting,
  onSubmitOtp,
  onResendOtp,
  onBack,
}: OtpTabProps) {
  const [otp, setOtp] = useState("");
  const [otpInputKey, setOtpInputKey] = useState(0);
  const [hideServerError, setHideServerError] = useState(false);
  const [resendSeconds, setResendSeconds] = useState(RESEND_DELAY_SECONDS);
  const autoSubmittedOtpRef = useRef<string | null>(null);
  const wasSubmittingRef = useRef(false);
  const shownOtpError = hideServerError ? undefined : otpError;
  const shownErrorMessage = hideServerError ? null : errorMessage;

  function resetOtpInput() {
    setOtp("");
    setOtpInputKey((current) => current + 1);
    autoSubmittedOtpRef.current = null;
  }

  function handleOtpChange(nextOtp: string) {
    setOtp(nextOtp);
    if ((otpError || errorMessage) && !hideServerError) {
      setHideServerError(true);
    }
  }

  useEffect(() => {
    if (resendSeconds <= 0) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setResendSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(intervalId);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [resendSeconds]);

  useEffect(() => {
    if (otp.length !== OTP_LENGTH || isSubmitting) {
      if (otp.length !== OTP_LENGTH) {
        autoSubmittedOtpRef.current = null;
      }
      return;
    }

    if (autoSubmittedOtpRef.current === otp) {
      return;
    }

    autoSubmittedOtpRef.current = otp;
    if (hideServerError) {
      window.setTimeout(() => {
        setHideServerError(false);
      }, 0);
    }
    void onSubmitOtp(otp);
  }, [hideServerError, isSubmitting, onSubmitOtp, otp]);

  useEffect(() => {
    const requestFinishedWithError = wasSubmittingRef.current && !isSubmitting;
    wasSubmittingRef.current = isSubmitting;

    if (!requestFinishedWithError || !otp) {
      return;
    }

    if (!errorStatusCode || errorStatusCode < 400 || errorStatusCode >= 500) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      resetOtpInput();
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, [errorStatusCode, isSubmitting, otp]);

  async function handleResend() {
    await onResendOtp();
    resetOtpInput();
    setResendSeconds(RESEND_DELAY_SECONDS);
    setHideServerError(false);
  }

  return (
    <AuthContainer showBackButton onBack={onBack} backButtonDisabled={isSubmitting}>
      <section className="w-full max-w-[420px]">
        <h1 className="text-center text-2xl font-semibold mb-2">{title}</h1>
        <p className="text-center text-sm mb-6">{description}</p>
        <form className="flex flex-col gap-4 items-center">
          <OtpInput
            key={otpInputKey}
            value={otp}
            onChange={handleOtpChange}
            error={Boolean(shownOtpError)}
            autoFocus
            aria-label="OTP code input"
          />
          <FlowError message={shownErrorMessage} />
          <AppButton
            type="button"
            variant="text"
            onClick={() => void handleResend()}
            disabled={isSubmitting || resendSeconds > 0}
          >
            {resendSeconds > 0
              ? `Отправить код через ${resendSeconds}сек`
              : "Отправить код еще раз"}
          </AppButton>
        </form>
      </section>
    </AuthContainer>
  );
}
