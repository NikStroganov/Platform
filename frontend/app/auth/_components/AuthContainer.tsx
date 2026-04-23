"use client";

import IconButton from "@mui/material/IconButton";

import { Icon } from "@/components/shared/icon";
import ArrowIcon from "@/components/shared/icon/icons/arrow.svg";
import Logo from "@/public/logo.png";
import Image from "next/image";

type AuthContainerProps = {
  children: React.ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
  backButtonAriaLabel?: string;
  backButtonDisabled?: boolean;
};

export function AuthContainer({
  children,
  showBackButton = false,
  onBack,
  backButtonAriaLabel = "Назад",
  backButtonDisabled = false,
}: AuthContainerProps) {
  return (
    <div className="w-95 bg-white rounded-4xl p-8 relative">
      {showBackButton && onBack ? (
        <IconButton
          aria-label={backButtonAriaLabel}
          onClick={onBack}
          disabled={backButtonDisabled}
          sx={{
            position: "absolute",
            top: 24,
            left: 24,
          }}
        >
          <Icon component={ArrowIcon} sx={{ fontSize: 24 }} />
        </IconButton>
      ) : null}
      <div className="flex flex-col items-center">
        <Image
          src={Logo.src}
          alt="Logo"
          width={113}
          height={54}
          className="w-28.25 h-13.5 -mt-4 mb-13.75"
        />
        {children}
      </div>
    </div>
  );
}
