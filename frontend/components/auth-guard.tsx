"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { refreshSession } from "@/features/auth/api/auth-client";
import { getAccessToken, getRefreshToken } from "@/lib/auth";
import { clearAuthTokens, setAuthTokens } from "@/features/auth/lib/token-storage";
import { initializeApiInterceptors } from "@/lib/api/client";
import { getOnboardingStatus } from "@/features/profile-completion/api/profile-completion-api";
import { AppButton } from "@/components/ui/app-button";

type AuthGuardProps = {
  children: ReactNode;
};

const PUBLIC_PATHS = new Set(["/auth"]);
type GuardState = "checking" | "authed" | "guest";

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [guardState, setGuardState] = useState<GuardState>("checking");
  const [status, setStatus] = useState<{ pathname: string; completed?: boolean; failed?: boolean }>();
  const [statusAttempt, setStatusAttempt] = useState(0);
  const isPublicPath = PUBLIC_PATHS.has(pathname);
  const shouldRedirectToAuth = guardState === "guest" && !isPublicPath;
  const shouldRedirectToHome = guardState === "authed" && pathname === "/auth";

  useEffect(() => {
    initializeApiInterceptors();
  }, []);

  useEffect(() => {
    let isCancelled = false;

    async function verifySession() {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();

      if (isCancelled) {
        return;
      }

      if (accessToken) {
        setGuardState("authed");
        return;
      }

      if (!refreshToken) {
        setGuardState("guest");
        return;
      }

      try {
        const tokens = await refreshSession({ refreshToken });
        if (isCancelled) {
          return;
        }

        setAuthTokens(tokens);
        setGuardState("authed");
      } catch {
        if (isCancelled) {
          return;
        }

        clearAuthTokens();
        setGuardState("guest");
      }
    }

    void verifySession();

    return () => {
      isCancelled = true;
    };
  }, [pathname]);

  useEffect(() => {
    if (guardState !== "authed" || isPublicPath) return;
    let active = true;
    getOnboardingStatus().then(completed => {
      if (!active) return;
      setStatus({ pathname, completed });
      if (!completed && pathname !== "/onboarding") router.replace("/onboarding");
      if (completed && pathname === "/onboarding") router.replace("/");
    }).catch(() => {
      if (active) setStatus({ pathname, failed: true });
    });
    return () => { active = false; };
  }, [guardState, isPublicPath, pathname, router, statusAttempt]);

  useEffect(() => {
    if (shouldRedirectToAuth) {
      router.replace("/auth");
      return;
    }

    if (shouldRedirectToHome) {
      router.replace("/");
    }
  }, [router, shouldRedirectToAuth, shouldRedirectToHome]);

  if (guardState === "checking" || shouldRedirectToAuth || shouldRedirectToHome) {
    return null;
  }

  if (!isPublicPath && guardState === "authed") {
    if (status?.pathname !== pathname) return null;
    if (status.failed) return <main role="alert" style={{ padding: 24 }}>
      <p>Не удалось проверить статус профиля. Попробуйте ещё раз.</p>
      <AppButton onClick={() => { setStatus(undefined); setStatusAttempt(current => current + 1); }}>Повторить</AppButton>
    </main>;
    if (status.completed !== (pathname !== "/onboarding")) return null;
  }

  return <>{children}</>;
}
