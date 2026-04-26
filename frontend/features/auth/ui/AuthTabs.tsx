"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";

import { useAuthFlow } from "@/features/auth/model/use-auth-flow";

import { EmailTab } from "./tabs/EmailTab";
import { LoginTab } from "./tabs/LoginTab";
import { RegisterOtpTab } from "./tabs/RegisterOtpTab";
import { RegisterPasswordTab } from "./tabs/RegisterPasswordTab";
import { ResetOtpTab } from "./tabs/ResetOtpTab";

export function AuthTabs() {
  const { view, email, state, actions } = useAuthFlow();
  const [emailInput, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [otp, setOtp] = useState("");
  const [registerOtpResendSeconds, setRegisterOtpResendSeconds] = useState(30);
  const autoSubmittedOtpRef = useRef<string | null>(null);

  const passwordMismatch =
    password && confirmPassword && password !== confirmPassword;
  const showPasswordMismatch =
    confirmPasswordTouched && Boolean(passwordMismatch);
  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const isRegisterPasswordValid = hasMinLength && hasUppercase && hasDigit;
  const isOtpComplete = otp.length === 6;

  useEffect(() => {
    if (view !== "registerOtp" && view !== "resetOtp") {
      autoSubmittedOtpRef.current = null;
      return;
    }

    if (!isOtpComplete || state.isSubmitting) {
      if (!isOtpComplete) {
        autoSubmittedOtpRef.current = null;
      }
      return;
    }

    const submitKey = `${view}:${otp}`;
    if (autoSubmittedOtpRef.current === submitKey) {
      return;
    }

    autoSubmittedOtpRef.current = submitKey;
    if (view === "registerOtp") {
      void actions.verifyRegisterOtp(otp);
      return;
    }

    void actions.verifyResetOtp(otp);
  }, [actions, isOtpComplete, otp, state.isSubmitting, view]);

  useEffect(() => {
    if (view !== "resetOtp" || state.isSubmitting) {
      return;
    }

    const statusCode = state.errorStatusCode ?? null;
    if (!statusCode || statusCode < 400 || statusCode >= 500 || !otp) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setOtp("");
    }, 0);
    autoSubmittedOtpRef.current = null;
    return () => window.clearTimeout(timeoutId);
  }, [otp, state.errorStatusCode, state.isSubmitting, view]);

  useEffect(() => {
    if (view !== "registerOtp") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setRegisterOtpResendSeconds(30);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [view]);

  useEffect(() => {
    if (view !== "registerOtp" || registerOtpResendSeconds <= 0) {
      return;
    }

    const timerId = window.setInterval(() => {
      setRegisterOtpResendSeconds((seconds) => {
        if (seconds <= 1) {
          window.clearInterval(timerId);
          return 0;
        }

        return seconds - 1;
      });
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [registerOtpResendSeconds, view]);

  async function submitEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await actions.submitEmail(emailInput);
  }

  async function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await actions.login(password);
  }

  async function submitRegisterPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setConfirmPasswordTouched(true);

    if (passwordMismatch || !isRegisterPasswordValid) {
      return;
    }

    await actions.completeRegister(password);
  }

  async function submitResetOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await actions.verifyResetOtp(otp);
  }

  async function submitResetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setConfirmPasswordTouched(true);

    if (passwordMismatch || !isRegisterPasswordValid) {
      return;
    }

    await actions.completeReset(password);
  }

  async function resendRegisterOtp() {
    await actions.resendRegisterOtp();
    setOtp("");
    autoSubmittedOtpRef.current = null;
    setRegisterOtpResendSeconds(30);
  }

  async function resendResetOtp() {
    await actions.resendResetOtp();
    setOtp("");
    autoSubmittedOtpRef.current = null;
  }

  if (view === "email") {
    return (
      <EmailTab
        emailInput={emailInput}
        emailError={state.fieldErrors.email}
        errorMessage={state.errorMessage}
        isSubmitting={state.isSubmitting}
        onEmailInputChange={setEmailInput}
        onSubmit={submitEmail}
      />
    );
  }

  if (view === "login") {
    return (
      <LoginTab
        password={password}
        passwordError={state.fieldErrors.password}
        errorMessage={state.errorMessage}
        isSubmitting={state.isSubmitting}
        onPasswordChange={setPassword}
        onSubmit={submitLogin}
        onForgotPassword={() => void actions.startReset()}
        onBack={actions.changeEmail}
      />
    );
  }

  if (view === "registerOtp") {
    return (
      <RegisterOtpTab
        email={email}
        otp={otp}
        otpError={state.fieldErrors.otp}
        errorMessage={state.errorMessage}
        isSubmitting={state.isSubmitting}
        registerOtpResendSeconds={registerOtpResendSeconds}
        onOtpChange={setOtp}
        onResendOtp={() => void resendRegisterOtp()}
        onBack={actions.changeEmail}
      />
    );
  }

  if (view === "registerPassword") {
    return (
      <RegisterPasswordTab
        title="Придумайте пароль"
        description="Чтобы зарегистрироваться"
        buttonText="Продолжить"
        buttonBusyText="Создаем аккаунт..."
        password={password}
        confirmPassword={confirmPassword}
        passwordError={state.fieldErrors.password}
        showPasswordMismatch={showPasswordMismatch}
        hasMinLength={hasMinLength}
        hasUppercase={hasUppercase}
        hasDigit={hasDigit}
        errorMessage={state.errorMessage}
        isSubmitting={state.isSubmitting}
        canSubmit={
          !state.isSubmitting &&
          !showPasswordMismatch &&
          isRegisterPasswordValid &&
          Boolean(confirmPassword)
        }
        onPasswordChange={setPassword}
        onConfirmPasswordChange={setConfirmPassword}
        onConfirmPasswordBlur={() => setConfirmPasswordTouched(true)}
        onSubmit={submitRegisterPassword}
        onBack={actions.changeEmail}
      />
    );
  }

  if (view === "resetOtp") {
    return (
      <ResetOtpTab
        email={email}
        otp={otp}
        otpError={state.fieldErrors.otp}
        errorMessage={state.errorMessage}
        isSubmitting={state.isSubmitting}
        onOtpChange={setOtp}
        onResendOtp={() => void resendResetOtp()}
        onSubmit={submitResetOtp}
        onBack={actions.changeEmail}
      />
    );
  }

  return (
    <RegisterPasswordTab
      title="Придумайте новый пароль"
      buttonText="Продолжить"
      buttonBusyText="Подождите..."
      password={password}
      confirmPassword={confirmPassword}
      passwordError={state.fieldErrors.password}
      showPasswordMismatch={showPasswordMismatch}
      hasMinLength={hasMinLength}
      hasUppercase={hasUppercase}
      hasDigit={hasDigit}
      errorMessage={state.errorMessage}
      isSubmitting={state.isSubmitting}
      canSubmit={
        !state.isSubmitting &&
        !showPasswordMismatch &&
        isRegisterPasswordValid &&
        Boolean(confirmPassword)
      }
      onPasswordChange={setPassword}
      onConfirmPasswordChange={setConfirmPassword}
      onConfirmPasswordBlur={() => setConfirmPasswordTouched(true)}
      onSubmit={submitResetPassword}
      onBack={actions.changeEmail}
    />
  );
}
