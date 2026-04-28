"use client";

import { SessionProvider } from "next-auth/react";
import { AuthModalProvider } from "@/lib/authModalContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthModalProvider>{children}</AuthModalProvider>
    </SessionProvider>
  );
}
