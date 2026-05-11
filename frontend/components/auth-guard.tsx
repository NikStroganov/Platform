"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { refreshSession } from "@/features/auth/api/auth-client";
import { getAccessToken, getRefreshToken } from "@/lib/auth";
import { clearAuthTokens, setAuthTokens } from "@/features/auth/lib/token-storage";
import { initializeApiInterceptors } from "@/lib/api/client";

type AuthGuardProps = {
  children: ReactNode;
};

const PUBLIC_PATHS = new Set(["/auth"]);
type GuardState = "checking" | "authed" | "guest";

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [guardState, setGuardState] = useState<GuardState>("checking");
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

  return <>{children}</>;
}
