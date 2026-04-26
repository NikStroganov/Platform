"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

import { clearAuthTokens } from "@/features/auth/lib/token-storage";

export default function Home() {
  const router = useRouter();

  const handleLogout = () => {
    clearAuthTokens();
    router.replace("/auth");
  };

  return (
    <main>
      <div className="mt-10 flex-1 w-full h-full flex items-center justify-center">
        <Button color="primary" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </main>
  );
}
