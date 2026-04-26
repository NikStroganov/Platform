"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { refreshSession } from "@/features/auth/api/auth-client";
import { clearAuthTokens, getAccessToken, getRefreshToken, setAuthTokens } from "@/lib/auth";

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
    let isCancelled = false;

    async function verifySession() {
      const accessToken = getAccessToken();
      if (accessToken) {
        if (!isCancelled) {
          setGuardState("authed");
        }

        return;
      }

      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        if (!isCancelled) {
          setGuardState("guest");
        }

        return;
      }

      try {
        const tokens = await refreshSession({ refreshToken });
        setAuthTokens(tokens);
        if (!isCancelled) {
          setGuardState("authed");
        }
      } catch {
        clearAuthTokens();
        if (!isCancelled) {
          setGuardState("guest");
        }
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
