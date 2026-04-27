"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  X,
  MessageSquare,
  Loader2,
  Reply,
  CheckCircle2,
} from "lucide-react";
// Assumes you have these exported from your actions file
import { getQueries, markQueryReplied } from "@/lib/actions/queries";

// Define the type based on your Prisma Schema relations
type ExtendedQuery = {
  id: string;
  message: string;
  createdAt: Date;
  user: {
    name: string | null;
    email: string;
    phone: string | null;
  };
  listing: {
    title: string;
  };
};

export default function QueriesPage() {
  const [queries, setQueries] = useState<ExtendedQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuery, setSelectedQuery] = useState<ExtendedQuery | null>(
    null,
  );
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const data = await getQueries();
      setQueries(data || []);
    } catch (error) {
      console.error("Failed to fetch queries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    if (!sending) setSelectedQuery(null);
  };

  const handleSendReply = async () => {
    if (!selectedQuery) return;
    setSending(true);
    try {
      // Execute server action to mark as replied or send email
      await markQueryReplied(selectedQuery.id);

      // Optimistically remove it from the list (or update its status)
      setQueries((prev) => prev.filter((q) => q.id !== selectedQuery.id));

      alert(
        `Reply sent to ${selectedQuery.user.name || selectedQuery.user.email}`,
      );
      handleCloseModal();
    } catch (err) {
      console.error(err);
      alert("Error sending reply");
    } finally {
      setSending(false);
    }
  };

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-6 py-8 relative pb-20">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Client Inquiries
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          Manage, review, and respond to property requests.
        </p>
      </header>

      {/* Queries Table Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px] flex flex-col">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-3 min-h-[400px]">
            <Loader2 className="animate-spin text-blue-600" size={40} />
            <p className="font-medium text-sm">Loading inquiries...</p>
          </div>
        ) : queries.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-4 min-h-[400px] p-8 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
              <CheckCircle2 size={32} />
            </div>
            <div>
              <p className="text-lg font-bold text-slate-900 mb-1">
                Inbox Zero
              </p>
              <p className="text-sm font-medium">
                You have replied to all pending client inquiries.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 rounded-tl-3xl">
                    Client Details
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Property
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Message Snippet
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right rounded-tr-3xl">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {queries.map((query) => (
                  <tr
                    key={query.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">
                        {query.user.name || "Unknown User"}
                      </div>
                      <div className="flex flex-col gap-1 mt-1 text-xs font-medium text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Mail size={12} className="text-blue-600" />{" "}
                          {query.user.email}
                        </span>
                        {query.user.phone && (
                          <span className="flex items-center gap-1.5">
                            <Phone size={12} className="text-blue-600" />{" "}
                            {query.user.phone}
                          </span>
                        )}
                        <span className="text-slate-400 mt-0.5">
                          {formatDate(query.createdAt)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 truncate max-w-[200px]">
                        {query.listing.title}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-600 truncate max-w-[250px] italic">
                        "{query.message}"
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedQuery(query)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm text-sm font-bold opacity-0 group-hover:opacity-100 focus:opacity-100"
                      >
                        <Reply size={16} /> View & Reply
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reply Modal */}
      {selectedQuery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={handleCloseModal}
          />

          <div className="relative w-full max-w-2xl bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-6 border-b border-slate-100 pb-6">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  Respond to {selectedQuery.user.name || "Client"}
                </h3>
                <p className="text-sm font-medium text-slate-500 mt-1">
                  Regarding:{" "}
                  <span className="text-slate-900 font-bold">
                    {selectedQuery.listing.title}
                  </span>
                </p>
              </div>
              <button
                disabled={sending}
                onClick={handleCloseModal}
                className="p-2 bg-slate-50 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors text-slate-400 disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* Original Message */}
            <div className="mb-6 bg-slate-50 p-5 rounded-2xl border border-slate-100 relative">
              <div className="absolute top-4 right-4 text-slate-300">
                <MessageSquare size={24} />
              </div>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">
                Original Message
              </p>
              <p className="text-sm text-slate-700 leading-relaxed italic">
                "{selectedQuery.message}"
              </p>
            </div>

            {/* Reply Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-slate-900 font-medium"
                  defaultValue={`Re: Inquiry about ${selectedQuery.listing.title}`}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                  Your Message
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-slate-900 min-h-[160px] leading-relaxed"
                  placeholder="Type your response here..."
                  defaultValue={`Dear ${selectedQuery.user.name || "Client"},\n\nThank you for reaching out regarding ${selectedQuery.listing.title}...`}
                />
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 mt-2">
                <button
                  disabled={sending}
                  onClick={handleCloseModal}
                  className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  disabled={sending}
                  onClick={handleSendReply}
                  className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
                >
                  {sending ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Mail size={18} />
                  )}
                  {sending ? "Sending..." : "Send Reply"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
