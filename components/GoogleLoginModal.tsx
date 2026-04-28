import React, { useState } from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import { X } from "lucide-react";
import { signIn } from "next-auth/react";

const GoogleLoginModal = ({
  isOpen = false,
  onClose,
}: {
  isOpen?: boolean;
  onClose: () => void;
}) => {
  // If the modal isn't set to open, don't render anything
  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/5 bg-opacity-50 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-8 relative animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Close modal"
        >
          <X />
        </button>

        {/* Modal Content */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Login to continue
          </h2>
          <p className="text-gray-500 mb-8 text-sm">
            Please sign in to continue.
          </p>

          <GoogleLoginButton onClick={handleGoogleClick} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default GoogleLoginModal;
