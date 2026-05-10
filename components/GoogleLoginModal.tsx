"use client";

import React, { useState } from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import { X } from "lucide-react";
import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

const GoogleLoginModal = ({
  isOpen = false,
  onClose,
}: {
  isOpen?: boolean;
  onClose: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const handleGoogleClick = async () => {
    try {
      setLoading(true);
      await signIn("google");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ y: "100%", opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: "100%", opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-t-[32px] sm:rounded-[32px] shadow-2xl w-full max-w-md p-8 sm:p-10 relative z-10 overflow-hidden border border-slate-100"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all active:scale-90"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Modal Content */}
            <div className="text-center pt-4">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
              </div>

              <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
                Welcome Back
              </h2>
              <p className="text-slate-500 mb-10 text-base font-medium">
                Sign in to save your favorite homes and manage your listings.
              </p>

              <div className="space-y-4">
                <GoogleLoginButton
                  onClick={handleGoogleClick}
                  loading={loading}
                />
              </div>

              <p className="mt-8 text-xs text-slate-400 font-medium px-4">
                By continuing, you agree to our{" "}
                <a href="#" className="text-slate-600 underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-slate-600 underline">
                  Privacy Policy
                </a>
              </p>
            </div>

            {/* Decorative element for mobile bottom sheet */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-slate-100 rounded-full sm:hidden" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GoogleLoginModal;
