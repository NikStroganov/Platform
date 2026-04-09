"use client";

import { ReactNode, useEffect, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";

import { isAuthenticated } from "@/lib/auth";

type AuthGuardProps = {
  children: ReactNode;
};

const PUBLIC_PATHS = new Set(["/auth"]);
const emptySubscribe = () => () => undefined;

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const authed = isClient ? isAuthenticated() : false;
  const isPublicPath = PUBLIC_PATHS.has(pathname);
  const shouldRedirectToAuth = isClient && !authed && !isPublicPath;
  const shouldRedirectToHome = isClient && authed && pathname === "/auth";

  useEffect(() => {
    if (shouldRedirectToAuth) {
      router.replace("/auth");
      return;
    }

    if (shouldRedirectToHome) {
      router.replace("/");
    }
  }, [router, shouldRedirectToAuth, shouldRedirectToHome]);

  if (!isClient || shouldRedirectToAuth || shouldRedirectToHome) {
    return null;
  }

  return <>{children}</>;
}
