"use client";

import GoogleLoginButton from "@/components/GoogleLoginButton";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      await signIn("google", {
        callbackUrl: "/profile",
      });
    } catch (error) {
      // notify.error("Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary dark:bg-gray-900">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-center text-primary dark:text-white mb-6">
          Login
        </h1>

        <GoogleLoginButton onClick={handleGoogleLogin} />

        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-6">
          Secure authentication powered by Google
        </p>
      </div>
    </div>
  );
}
