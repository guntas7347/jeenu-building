"use client";

import { SessionProvider } from "next-auth/react";
import { AuthModalProvider } from "@/lib/authModalContext";
import { ReactLenis } from "lenis/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root>
      <SessionProvider>
        <AuthModalProvider>{children}</AuthModalProvider>
      </SessionProvider>
    </ReactLenis>
  );
}
