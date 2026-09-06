"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
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

  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
    setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: (formData.get("name") as string) || session?.user?.name || "Guest Inquirer",
      email: (formData.get("email") as string) || session?.user?.email || "",
      phone: (formData.get("phone") as string) || "",
      message: (formData.get("message") as string) || "",
      listingId: propertyId,
    };

    if (!data.email) {
      setErrorMsg("Please provide your email address.");
      setLoading(false);
      return;
    }

    try {
      await createQuery(data);
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to submit inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Primary Toggle Button - Fully Public */}
      <button
        onClick={handleToggleExpand}
        className={`w-full py-4 font-bold rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
          isExpanded
            ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
        }`}
      >
        Enquire Now
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {/* Expandable Form Area */}
      {isExpanded && (
        <div className="mt-4 animate-in slide-in-from-top-2 fade-in duration-300">
          {success ? (
            <div className="p-8 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-100 dark:border-emerald-800 text-center">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={24} />
              </div>
              <h4 className="text-lg font-bold text-emerald-800 dark:text-emerald-300 mb-1">
                Inquiry Received
              </h4>
              <p className="text-sm text-emerald-600/80 dark:text-emerald-400/80 mb-6">
                Our concierge will contact you within 24 hours regarding {propertyTitle}.
              </p>
              <button
                onClick={() => {
                  setSuccess(false);
                  setErrorMsg("");
                }}
                className="px-6 py-2.5 bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-sm font-bold rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form
              className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4"
              onSubmit={handleSubmit}
            >
              {errorMsg && (
                <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-semibold rounded-xl">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">
                  Full Name
                </label>
                <input
                  name="name"
                  defaultValue={session?.user?.name || ""}
                  className="w-full bg-white dark:bg-slate-950 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-900 dark:text-white font-medium text-sm"
                  placeholder="e.g. Alexander Dupont"
                  type="text"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">
                  Email Address
                </label>
                <input
                  name="email"
                  defaultValue={session?.user?.email || ""}
                  className="w-full bg-white dark:bg-slate-950 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-900 dark:text-white font-medium text-sm"
                  placeholder="alex@example.com"
                  type="email"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">
                  Phone Number
                </label>
                <input
                  name="phone"
                  className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-900 dark:text-white font-medium text-sm"
                  placeholder="+61 400 000 000"
                  type="tel"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-900 dark:text-white font-medium text-sm resize-none"
                  placeholder={`I would like more information on ${propertyTitle}...`}
                  rows={3}
                />
              </div>

              <button
                disabled={loading}
                className="w-full py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer text-sm"
                type="submit"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <Send size={18} />
                )}
                {loading ? "Submitting Inquiry..." : "Submit Inquiry"}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
