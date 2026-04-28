"use client";

import {
  X,
  MessageSquare,
  Phone,
  Mail,
  ExternalLink,
  Calendar,
  CheckCircle2,
  Loader2,
  User,
} from "lucide-react";
import Link from "next/link";

interface InquiryData {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyTitle: string;
  listingId: string; // Or slug, depending on your routing
  createdAt: string | Date;
}

interface ViewInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiry: InquiryData | null;
  onMarkAsRead: () => void;
  isMarkingRead?: boolean;
}

export default function ViewInquiryModal({
  isOpen,
  onClose,
  inquiry,
  onMarkAsRead,
  isMarkingRead = false,
}: ViewInquiryModalProps) {
  if (!isOpen || !inquiry) return null;

  // Format the date nicely
  const formattedDate = new Date(inquiry.createdAt).toLocaleDateString(
    "en-US",
    {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex justify-between items-start mb-6 border-b border-slate-100 pb-6">
          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Inquiry Details
            </h3>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mt-1">
              <Calendar size={14} />
              {formattedDate}
            </div>
          </div>
          <button
            disabled={isMarkingRead}
            onClick={onClose}
            className="p-2 bg-slate-50 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors text-slate-400 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Client & Property Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Client Info Card */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                <User size={14} /> Client Details
              </div>
              <p className="font-bold text-slate-900 text-lg mb-1">
                {inquiry.name || "Unknown Client"}
              </p>
              <div className="space-y-1 mt-3">
                <a
                  href={`mailto:${inquiry.email}`}
                  className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                >
                  <Mail size={16} className="text-slate-400" />
                  {inquiry.email}
                </a>
                {inquiry.phone ? (
                  <a
                    href={`tel:${inquiry.phone}`}
                    className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    <Phone size={16} className="text-slate-400" />
                    {inquiry.phone}
                  </a>
                ) : (
                  <span className="flex items-center gap-2 text-sm font-medium text-slate-400">
                    <Phone size={16} className="text-slate-300" />
                    No phone provided
                  </span>
                )}
              </div>
            </div>

            {/* Property Info Card */}
            <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-widest text-blue-400">
                Property Interest
              </div>
              <p className="font-bold text-blue-900 text-lg leading-tight mb-4">
                {inquiry.propertyTitle}
              </p>
              <Link
                href={`/listings/${inquiry.listingId}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors bg-white px-3 py-1.5 rounded-lg shadow-sm border border-blue-100"
              >
                View Listing <ExternalLink size={14} />
              </Link>
            </div>
          </div>

          {/* Message Area */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 relative">
            <div className="absolute top-4 right-4 text-slate-300">
              <MessageSquare size={24} />
            </div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-3">
              Message Attached
            </p>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
              {inquiry.message || (
                <span className="italic text-slate-400">
                  No message provided by the client.
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-3 pt-8 mt-2">
          {/* Communication Actions */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={`mailto:${inquiry.email}?subject=Regarding your inquiry about ${inquiry.propertyTitle}`}
              className="flex-1 sm:flex-none px-5 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Mail size={18} />
              Email
            </a>
            {inquiry.phone && (
              <a
                href={`tel:${inquiry.phone}`}
                className="flex-1 sm:flex-none px-5 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Phone size={18} />
                Call
              </a>
            )}
          </div>

          {/* Mark as Read Action */}
          <button
            disabled={isMarkingRead}
            onClick={onMarkAsRead}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
          >
            {isMarkingRead ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <CheckCircle2 size={18} />
            )}
            {isMarkingRead ? "Marking..." : "Mark As Read"}
          </button>
        </div>
      </div>
    </div>
  );
}
