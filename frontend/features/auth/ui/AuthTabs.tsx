"use client";

import { FormEvent, useState } from "react";

import { AppButton } from "@/components/ui/app-button";
import { AppTextField } from "@/components/ui/app-text-field";
import { useAuthFlow } from "@/features/auth/model/use-auth-flow";

function FlowError({ message }: { message: string | null }) {
  if (!message) {
    return null;
  }

  return <p className="text-sm text-red-600">{message}</p>;
}

export function AuthTabs() {
  const { view, email, state, actions } = useAuthFlow();
  const [emailInput, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");

  const passwordMismatch = password && confirmPassword && password !== confirmPassword;

  async function submitEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await actions.submitEmail(emailInput);
  }

  async function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await actions.login(password);
  }

  async function submitRegisterOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await actions.verifyRegisterOtp(otp);
  }

  async function submitRegisterPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (passwordMismatch) {
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
    if (passwordMismatch) {
      return;
    }

    await actions.completeReset(password);
  }

  if (view === "email") {
    return (
      <section className="w-full max-w-[420px]">
        <h1 className="text-center text-2xl font-semibold mb-6">Вход в сервис</h1>
        <form className="flex flex-col gap-4" onSubmit={submitEmail}>
          <AppTextField
            type="email"
            label="Email"
            value={emailInput}
            onChange={(event) => setEmailInput(event.target.value)}
            error={Boolean(state.fieldErrors.email)}
            helperText={state.fieldErrors.email}
            autoComplete="email"
            required
          />
          <FlowError message={state.errorMessage} />
          <AppButton type="submit" fullWidth disabled={state.isSubmitting}>
            {state.isSubmitting ? "Проверяем..." : "Продолжить"}
          </AppButton>
        </form>
      </section>
    );
  }

  if (view === "login") {
    return (
      <section className="w-full max-w-[420px]">
        <h1 className="text-center text-2xl font-semibold mb-2">Введите пароль</h1>
        <p className="text-center text-sm text-gray-600 mb-6">{email}</p>
        <form className="flex flex-col gap-4" onSubmit={submitLogin}>
          <AppTextField
            type="password"
            label="Пароль"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={Boolean(state.fieldErrors.password)}
            helperText={state.fieldErrors.password}
            autoComplete="current-password"
            required
          />
          <FlowError message={state.errorMessage} />
          <AppButton type="submit" fullWidth disabled={state.isSubmitting}>
            {state.isSubmitting ? "Входим..." : "Войти"}
          </AppButton>
          <AppButton type="button" variant="text" onClick={() => void actions.startReset()} disabled={state.isSubmitting}>
            Забыли пароль?
          </AppButton>
          <AppButton type="button" variant="text" onClick={actions.changeEmail} disabled={state.isSubmitting}>
            Ввести другой email
          </AppButton>
        </form>
      </section>
    );
  }

  if (view === "registerOtp") {
    return (
      <section className="w-full max-w-[420px]">
        <h1 className="text-center text-2xl font-semibold mb-2">Подтвердите email</h1>
        <p className="text-center text-sm text-gray-600 mb-6">Код отправлен на {email}</p>
        <form className="flex flex-col gap-4" onSubmit={submitRegisterOtp}>
          <AppTextField
            label="OTP код"
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
            slotProps={{ htmlInput: { maxLength: 6 } }}
            error={Boolean(state.fieldErrors.otp)}
            helperText={state.fieldErrors.otp}
            required
          />
          <FlowError message={state.errorMessage} />
          <AppButton type="submit" fullWidth disabled={state.isSubmitting}>
            {state.isSubmitting ? "Проверяем..." : "Подтвердить OTP"}
          </AppButton>
          <AppButton type="button" variant="text" onClick={() => void actions.resendRegisterOtp()} disabled={state.isSubmitting}>
            Отправить код еще раз
          </AppButton>
          <AppButton type="button" variant="text" onClick={actions.changeEmail} disabled={state.isSubmitting}>
            Ввести другой email
          </AppButton>
        </form>
      </section>
    );
  }

  if (view === "registerPassword") {
    return (
      <section className="w-full max-w-[420px]">
        <h1 className="text-center text-2xl font-semibold mb-2">Создайте пароль</h1>
        <p className="text-center text-sm text-gray-600 mb-6">{email}</p>
        <form className="flex flex-col gap-4" onSubmit={submitRegisterPassword}>
          <AppTextField
            type="password"
            label="Пароль"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={Boolean(state.fieldErrors.password) || Boolean(passwordMismatch)}
            helperText={
              state.fieldErrors.password ||
              (passwordMismatch ? "Пароли не совпадают." : "Мин. 6 символов, 1 заглавная буква и 1 цифра")
            }
            autoComplete="new-password"
            required
          />
          <AppTextField
            type="password"
            label="Повторите пароль"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            error={Boolean(passwordMismatch)}
            helperText={passwordMismatch ? "Пароли не совпадают." : ""}
            autoComplete="new-password"
            required
          />
          <FlowError message={state.errorMessage} />
          <AppButton type="submit" fullWidth disabled={state.isSubmitting || Boolean(passwordMismatch)}>
            {state.isSubmitting ? "Создаем аккаунт..." : "Зарегистрироваться"}
          </AppButton>
          <AppButton type="button" variant="text" onClick={actions.changeEmail} disabled={state.isSubmitting}>
            Ввести другой email
          </AppButton>
        </form>
      </section>
    );
  }

  if (view === "resetOtp") {
    return (
      <section className="w-full max-w-[420px]">
        <h1 className="text-center text-2xl font-semibold mb-2">Восстановление пароля</h1>
        <p className="text-center text-sm text-gray-600 mb-6">Код отправлен на {email}</p>
        <form className="flex flex-col gap-4" onSubmit={submitResetOtp}>
          <AppTextField
            label="OTP код"
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
            slotProps={{ htmlInput: { maxLength: 6 } }}
            error={Boolean(state.fieldErrors.otp)}
            helperText={state.fieldErrors.otp}
            required
          />
          <FlowError message={state.errorMessage} />
          <AppButton type="submit" fullWidth disabled={state.isSubmitting}>
            {state.isSubmitting ? "Проверяем..." : "Подтвердить OTP"}
          </AppButton>
          <AppButton type="button" variant="text" onClick={() => void actions.resendResetOtp()} disabled={state.isSubmitting}>
            Отправить код еще раз
          </AppButton>
          <AppButton type="button" variant="text" onClick={actions.changeEmail} disabled={state.isSubmitting}>
            Ввести другой email
          </AppButton>
        </form>
      </section>
    );
  }

  return (
    <section className="w-full max-w-[420px]">
      <h1 className="text-center text-2xl font-semibold mb-2">Новый пароль</h1>
      <p className="text-center text-sm text-gray-600 mb-6">{email}</p>
      <form className="flex flex-col gap-4" onSubmit={submitResetPassword}>
        <AppTextField
          type="password"
          label="Новый пароль"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={Boolean(state.fieldErrors.password) || Boolean(passwordMismatch)}
          helperText={
            state.fieldErrors.password ||
            (passwordMismatch ? "Пароли не совпадают." : "Мин. 6 символов, 1 заглавная буква и 1 цифра")
          }
          autoComplete="new-password"
          required
        />
        <AppTextField
          type="password"
          label="Повторите пароль"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          error={Boolean(passwordMismatch)}
          helperText={passwordMismatch ? "Пароли не совпадают." : ""}
          autoComplete="new-password"
          required
        />
        <FlowError message={state.errorMessage} />
        <AppButton type="submit" fullWidth disabled={state.isSubmitting || Boolean(passwordMismatch)}>
          {state.isSubmitting ? "Сохраняем..." : "Сохранить новый пароль"}
        </AppButton>
        <AppButton type="button" variant="text" onClick={actions.changeEmail} disabled={state.isSubmitting}>
          Ввести другой email
        </AppButton>
      </form>
    </section>
  );
}

