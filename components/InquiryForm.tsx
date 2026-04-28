"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useAuthModal } from "@/lib/authModalContext";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Loader2,
  Send,
} from "lucide-react";
import { createQuery } from "@/lib/actions/queries";

interface InquiryFormProps {
  propertyId: string;
  propertyTitle: string;
}

export default function InquiryForm({
  propertyId,
  propertyTitle,
}: InquiryFormProps) {
  const { data: session } = useSession();
  const { openLoginModal } = useAuthModal();

  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleToggleExpand = () => {
    // Require login before allowing them to see the form
    if (!session) {
      openLoginModal();
      return;
    }

    // If logged in, just toggle the form visibility
    setIsExpanded((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      phone: (formData.get("phone") as string) || "",
      message: formData.get("message") as string,
      listingId: propertyId,
    };

    try {
      await createQuery(data);
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      alert("Failed to submit inquiry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Primary Toggle Button */}
      <button
        onClick={handleToggleExpand}
        className={`w-full py-4 font-bold rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2 ${
          isExpanded
            ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
            : "bg-slate-900 text-white hover:bg-slate-800"
        }`}
      >
        Enquire Now
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {/* Expandable Form Area */}
      {isExpanded && (
        <div className="mt-4 animate-in slide-in-from-top-2 fade-in duration-300">
          {success ? (
            <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={24} />
              </div>
              <h4 className="text-lg font-bold text-emerald-800 mb-1">
                Inquiry Received
              </h4>
              <p className="text-sm text-emerald-600/80 mb-6">
                Our concierge will contact you within 24 hours.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="px-6 py-2.5 bg-white border border-emerald-200 text-emerald-700 text-sm font-bold rounded-xl hover:bg-emerald-50 transition-colors"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form
              className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-5"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  Full Name
                </label>
                <input
                  name="name"
                  defaultValue={session?.user?.name || ""}
                  disabled
                  className="w-full cursor-not-allowed bg-slate-100 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-slate-900 font-medium text-sm"
                  placeholder="e.g. Alexander Dupont"
                  type="text"
                  required
                />
              </div>

              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                Email
              </label>
              <input
                name="email"
                defaultValue={session?.user?.email || ""}
                disabled
                className="w-full cursor-not-allowed bg-slate-100 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-slate-900 font-medium text-sm"
                placeholder="alex@domain.com"
                type="email"
                required
              />
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  Phone
                </label>
                <input
                  name="phone"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-slate-900 font-medium text-sm"
                  placeholder="+1 555 0192"
                  type="tel"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-slate-900 font-medium text-sm resize-none"
                  placeholder={`I am interested in a private tour of ${propertyTitle}...`}
                  rows={4}
                />
              </div>

              <button
                disabled={loading}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
                type="submit"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <Send size={18} />
                )}
                {loading ? "Submitting..." : "Send Request"}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
