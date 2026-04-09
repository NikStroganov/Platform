import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import { AuthGuard } from "@/components/auth-guard";
import { AppProviders } from "@/components/app-providers";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Platform",
  description: "Platform frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AppProviders>
          <AuthGuard>{children}</AuthGuard>
        </AppProviders>
      </body>
    </html>
  );
}
