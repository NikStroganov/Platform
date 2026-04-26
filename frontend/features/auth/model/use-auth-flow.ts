"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  isUserExists,
  loginUser,
  refreshSession,
  registerUser,
  sendOtp,
  setNewPassword,
  validateOtp,
} from "@/features/auth/api/auth-client";
import type { FieldErrors } from "@/features/auth/api/auth-types";
import { toAuthApiError } from "@/features/auth/lib/auth-errors";
import { clearAuthTokens, setAuthTokens } from "@/features/auth/lib/token-storage";

type AuthView =
  | "email"
  | "login"
  | "registerOtp"
  | "registerPassword"
  | "resetOtp"
  | "resetPassword";

type SubmitState = {
  isSubmitting: boolean;
  errorMessage: string | null;
  fieldErrors: FieldErrors;
  errorStatusCode?: number | null;
};

const PASSWORD_PATTERN = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

function initialState(): SubmitState {
  return {
    isSubmitting: false,
    errorMessage: null,
    fieldErrors: {},
    errorStatusCode: null,
  };
}

export function useAuthFlow() {
  const router = useRouter();
  const [view, setView] = useState<AuthView>("email");
  const [email, setEmail] = useState("");
  const [verificationToken, setVerificationToken] = useState<string | null>(null);
  const [state, setState] = useState<SubmitState>(initialState);

  const changeEmail = useCallback(() => {
    setView("email");
    setEmail("");
    setVerificationToken(null);
    setState(initialState());
  }, []);

  const handleSuccessAuth = useCallback(
    (accessToken: string, refreshToken: string) => {
      setAuthTokens({ accessToken, refreshToken });
      router.replace("/");
    },
    [router],
  );

  const submitEmail = useCallback(async (rawEmail: string) => {
    const normalizedEmail = rawEmail.trim();
    setState({ isSubmitting: true, errorMessage: null, fieldErrors: {} });

    try {
      const exists = await isUserExists(normalizedEmail);
      setEmail(normalizedEmail);

      if (exists) {
        setView("login");
        setState(initialState());
        return;
      }

      await sendOtp(normalizedEmail, "REGISTER");
      setView("registerOtp");
      setState(initialState());
    } catch (error) {
      const authError = toAuthApiError(error);
      setState({
        isSubmitting: false,
        errorMessage: authError.message,
        fieldErrors: authError.fieldErrors,
      });
    }
  }, []);

  const login = useCallback(
    async (password: string) => {
      setState({ isSubmitting: true, errorMessage: null, fieldErrors: {} });
      try {
        const tokens = await loginUser({ email, password });
        handleSuccessAuth(tokens.accessToken, tokens.refreshToken);
      } catch (error) {
        const authError = toAuthApiError(error);
        setState({
          isSubmitting: false,
          errorMessage: authError.message,
          fieldErrors: authError.fieldErrors,
        });
      }
    },
    [email, handleSuccessAuth],
  );

  const verifyRegisterOtp = useCallback(
    async (otp: string) => {
      setState({ isSubmitting: true, errorMessage: null, fieldErrors: {} });
      try {
        const token = await validateOtp({ email, otp: otp.trim() });
        setVerificationToken(token);
        setView("registerPassword");
        setState(initialState());
      } catch (error) {
        const authError = toAuthApiError(error);
        setState({
          isSubmitting: false,
          errorMessage: authError.message,
          fieldErrors: authError.fieldErrors,
          errorStatusCode: authError.statusCode,
        });
      }
    },
    [email],
  );

  const completeRegister = useCallback(
    async (password: string) => {
      if (!verificationToken) {
        setState({
          isSubmitting: false,
          errorMessage: "Сначала подтвердите OTP код.",
          fieldErrors: {},
        });
        return;
      }

      if (!PASSWORD_PATTERN.test(password)) {
        setState({
          isSubmitting: false,
          errorMessage: "Пароль должен быть не короче 6 символов, с 1 заглавной буквой и 1 цифрой.",
          fieldErrors: {},
        });
        return;
      }

      setState({ isSubmitting: true, errorMessage: null, fieldErrors: {} });
      try {
        const tokens = await registerUser({
          email,
          password,
          verificationToken,
        });
        handleSuccessAuth(tokens.accessToken, tokens.refreshToken);
      } catch (error) {
        const authError = toAuthApiError(error);
        setState({
          isSubmitting: false,
          errorMessage: authError.message,
          fieldErrors: authError.fieldErrors,
        });
      }
    },
    [email, handleSuccessAuth, verificationToken],
  );

  const resendRegisterOtp = useCallback(async () => {
    setState({ isSubmitting: true, errorMessage: null, fieldErrors: {} });
    try {
      await sendOtp(email, "REGISTER");
      setState(initialState());
    } catch (error) {
      const authError = toAuthApiError(error);
      setState({
        isSubmitting: false,
        errorMessage: authError.message,
        fieldErrors: authError.fieldErrors,
      });
    }
  }, [email]);

  const startReset = useCallback(async () => {
    setState({ isSubmitting: true, errorMessage: null, fieldErrors: {} });
    try {
      await sendOtp(email, "RESET_PASSWORD");
      setView("resetOtp");
      setVerificationToken(null);
      setState(initialState());
    } catch (error) {
      const authError = toAuthApiError(error);
      setState({
        isSubmitting: false,
        errorMessage: authError.message,
        fieldErrors: authError.fieldErrors,
      });
    }
  }, [email]);

  const verifyResetOtp = useCallback(
    async (otp: string) => {
      setState({ isSubmitting: true, errorMessage: null, fieldErrors: {} });
      try {
        const token = await validateOtp({ email, otp: otp.trim() });
        setVerificationToken(token);
        setView("resetPassword");
        setState(initialState());
      } catch (error) {
        const authError = toAuthApiError(error);
        setState({
          isSubmitting: false,
          errorMessage: authError.message,
          fieldErrors: authError.fieldErrors,
          errorStatusCode: authError.statusCode,
        });
      }
    },
    [email],
  );

  const completeReset = useCallback(
    async (password: string) => {
      if (!verificationToken) {
        setState({
          isSubmitting: false,
          errorMessage: "Сначала подтвердите OTP код.",
          fieldErrors: {},
        });
        return;
      }

      if (!PASSWORD_PATTERN.test(password)) {
        setState({
          isSubmitting: false,
          errorMessage: "Пароль должен быть не короче 6 символов, с 1 заглавной буквой и 1 цифрой.",
          fieldErrors: {},
        });
        return;
      }

      setState({ isSubmitting: true, errorMessage: null, fieldErrors: {} });
      try {
        const tokens = await setNewPassword({
          email,
          password,
          verificationToken,
        });
        handleSuccessAuth(tokens.accessToken, tokens.refreshToken);
      } catch (error) {
        const authError = toAuthApiError(error);
        setState({
          isSubmitting: false,
          errorMessage: authError.message,
          fieldErrors: authError.fieldErrors,
        });
      }
    },
    [email, handleSuccessAuth, verificationToken],
  );

  const resendResetOtp = useCallback(async () => {
    setState({ isSubmitting: true, errorMessage: null, fieldErrors: {} });
    try {
      await sendOtp(email, "RESET_PASSWORD");
      setState(initialState());
    } catch (error) {
      const authError = toAuthApiError(error);
      setState({
        isSubmitting: false,
        errorMessage: authError.message,
        fieldErrors: authError.fieldErrors,
      });
    }
  }, [email]);

  const logout = useCallback(() => {
    clearAuthTokens();
    router.replace("/auth");
  }, [router]);

  const refreshByToken = useCallback(async (refreshToken: string) => {
    const tokens = await refreshSession({ refreshToken });
    setAuthTokens(tokens);
    return tokens;
  }, []);

  return useMemo(
    () => ({
      view,
      email,
      state,
      actions: {
        submitEmail,
        login,
        verifyRegisterOtp,
        completeRegister,
        resendRegisterOtp,
        startReset,
        verifyResetOtp,
        completeReset,
        resendResetOtp,
        changeEmail,
        refreshByToken,
        logout,
      },
    }),
    [
      changeEmail,
      completeRegister,
      completeReset,
      email,
      login,
      logout,
      refreshByToken,
      resendRegisterOtp,
      resendResetOtp,
      startReset,
      state,
      submitEmail,
      verifyRegisterOtp,
      verifyResetOtp,
      view,
    ],
  );
}

