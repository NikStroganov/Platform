"use client";

import { useAuthFlow } from "@/features/auth/model/use-auth-flow";

import { EmailTab } from "./tabs/EmailTab";
import { LoginTab } from "./tabs/LoginTab";
import { OtpTab } from "./tabs/OtpTab";
import { RegisterPasswordTab } from "./tabs/RegisterPasswordTab";

export function AuthTabs() {
  const { view, email, state, actions } = useAuthFlow();

  if (view === "email") {
    return (
      <EmailTab
        emailError={state.fieldErrors.email}
        errorMessage={state.errorMessage}
        isSubmitting={state.isSubmitting}
        onSubmit={actions.submitEmail}
      />
    );
  }

  if (view === "login") {
    return (
      <LoginTab
        passwordError={state.fieldErrors.password}
        errorMessage={state.errorMessage}
        isSubmitting={state.isSubmitting}
        onSubmit={actions.login}
        onForgotPassword={() => void actions.startReset()}
        onBack={actions.changeEmail}
      />
    );
  }

  if (view === "registerOtp") {
    return (
      <OtpTab
        title="Введите код"
        description={`Отправили его на ${email}`}
        otpError={state.fieldErrors.otp}
        errorMessage={state.errorMessage}
        errorStatusCode={state.errorStatusCode}
        isSubmitting={state.isSubmitting}
        onSubmitOtp={actions.verifyRegisterOtp}
        onResendOtp={actions.resendRegisterOtp}
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
        passwordError={state.fieldErrors.password}
        errorMessage={state.errorMessage}
        isSubmitting={state.isSubmitting}
        onSubmit={actions.completeRegister}
        onBack={actions.changeEmail}
      />
    );
  }

  if (view === "resetOtp") {
    return (
      <OtpTab
        title="Забыли пароль?"
        description={`Введите код из письма. Отправили его на ${email}`}
        otpError={state.fieldErrors.otp}
        errorMessage={state.errorMessage}
        errorStatusCode={state.errorStatusCode}
        isSubmitting={state.isSubmitting}
        onSubmitOtp={actions.verifyResetOtp}
        onResendOtp={actions.resendResetOtp}
        onBack={actions.changeEmail}
      />
    );
  }

  return (
    <RegisterPasswordTab
      title="Придумайте новый пароль"
      buttonText="Продолжить"
      buttonBusyText="Подождите..."
      passwordError={state.fieldErrors.password}
      errorMessage={state.errorMessage}
      isSubmitting={state.isSubmitting}
      onSubmit={actions.completeReset}
      onBack={actions.changeEmail}
    />
  );
}
