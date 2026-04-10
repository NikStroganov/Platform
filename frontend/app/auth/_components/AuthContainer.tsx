import Logo from "@/public/logo.png";
import Image from "next/image";

export function AuthContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-95 bg-white rounded-4xl p-8 relative">
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
