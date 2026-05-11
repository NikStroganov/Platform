"use client";

import { useEffect } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

import { api } from "@/lib/api/client";
import { clearAuthTokens } from "@/features/auth/lib/token-storage";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    void api.testRest().catch((error) => {
      console.error("testRest request failed", error);
    });
  }, []);

  const handleLogout = () => {
    clearAuthTokens();
    router.replace("/auth");
  };

  return (
    <main>
      <div className="mt-10 flex-1 w-full h-full flex flex-col items-center justify-center gap-10">
        <Button color="primary" onClick={handleLogout}>
          Log Out
        </Button>
        <img src="https://i.pinimg.com/originals/72/6c/2c/726c2c72e357a749d833beb929dfdb18.webp?nii=t" className="w-80 h-80 object-cover object-center rounded-2xl" />
      </div>
    </main>
  );
}
