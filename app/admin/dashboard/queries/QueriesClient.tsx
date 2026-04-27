"use client";

import { useState } from "react";
import { Mail, Phone, CornerUpLeft, X } from "lucide-react";
import { Query } from "@/types";

export default function QueriesClient({
  initialQueries,
}: {
  initialQueries: Query[];
}) {
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);
  const [sending, setSending] = useState(false);

  const handleCloseModal = () => setSelectedQuery(null);

  const handleSendReply = async () => {
    if (!selectedQuery) return;
    setSending(true);
    try {
      // await markQueryReplied(selectedQuery.id);
      alert(`Reply marked as sent to ${selectedQuery.name}`);
      handleCloseModal();
    } catch (err) {
      console.error(err);
      alert("Error sending reply");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-8 relative pb-20">
      <header>
        <h1 className="text-3xl font-bold text-on-surface tracking-tight">
          Inquiries
        </h1>
        <p className="text-on-surface-variant mt-1">
          Manage and respond to client requests.
        </p>
      </header>

      {/* Queries Table */}
      <div className="bg-surface-container rounded-xl border border-outline-variant/10 overflow-hidden min-h-[400px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-high border-b border-outline-variant/10">
              <th className="px-6 py-4 text-xs uppercase tracking-widest text-outline-variant font-bold">
                Client / Date
              </th>
              <th className="px-6 py-4 text-xs uppercase tracking-widest text-outline-variant font-bold">
                Contact Info
              </th>
              <th className="px-6 py-4 text-xs uppercase tracking-widest text-outline-variant font-bold">
                Property
              </th>
              <th className="px-6 py-4 text-xs uppercase tracking-widest text-outline-variant font-bold text-center">
                Status
              </th>
              <th className="px-6 py-4 text-xs uppercase tracking-widest text-outline-variant font-bold text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {initialQueries.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-on-surface-variant"
                >
                  No inquiries received yet.
                </td>
              </tr>
            ) : (
              initialQueries.map((query) => (
                <tr
                  key={query.id}
                  className="border-b border-outline-variant/5 hover:bg-surface-container-low transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-bold text-on-surface">
                      {query.name}
                    </div>
                    <div className="text-xs text-on-surface-variant">
                      {new Date(query.date).toLocaleDateString()}{" "}
                      {new Date(query.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 space-y-1">
                    <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                      <Mail className="w-3 h-3 text-primary" /> {query.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                      <Phone className="w-3 h-3 text-primary" /> {query.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-on-surface font-medium text-sm">
                    {query.propertyString}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                        query.status === "New"
                          ? "bg-primary/20 text-primary"
                          : "bg-outline-variant/20 text-on-surface-variant"
                      }`}
                    >
                      {query.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedQuery(query)}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-surface-container-high border border-outline-variant/10 rounded text-on-surface hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer"
                    >
                      <CornerUpLeft className="w-4 h-4" /> View / Reply
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Reply Modal */}
      {selectedQuery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={handleCloseModal}
          />

          <div className="relative w-full max-w-2xl bg-surface-container p-8 rounded-2xl shadow-2xl border border-outline-variant/20 z-10">
            <div className="flex justify-between items-start mb-6 border-b border-outline-variant/10 pb-4">
              <div>
                <h3 className="text-xl font-bold text-on-surface">
                  Respond to {selectedQuery.name}
                </h3>
                <p className="text-sm text-on-surface-variant">
                  Regarding: {selectedQuery.propertyString}
                </p>
              </div>
              <button
                disabled={sending}
                onClick={handleCloseModal}
                className="p-2 bg-surface-container-high rounded hover:text-error transition-colors text-on-surface cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6 bg-surface-container-low p-4 rounded-lg border border-outline-variant/5">
              <p className="text-xs uppercase tracking-widest text-primary font-bold mb-2">
                Original Message
              </p>
              <p className="text-sm text-on-surface-variant italic">
                "{selectedQuery.message}"
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  className="form-input"
                  defaultValue={`Re: Inquiry about ${selectedQuery.propertyString}`}
                />
              </div>
              <div>
                <label className="form-label">Your Message</label>
                <textarea
                  className="form-textarea"
                  placeholder="Type your response here..."
                  defaultValue={`Dear ${selectedQuery.name},\n\nThank you for reaching out regarding ${selectedQuery.propertyString}...`}
                />
              </div>
              <div className="flex justify-end gap-4 pt-4 border-t border-outline-variant/10">
                <button
                  disabled={sending}
                  onClick={handleCloseModal}
                  className="btn-admin-secondary"
                >
                  Cancel
                </button>
                <button
                  disabled={sending}
                  onClick={handleSendReply}
                  className="btn-admin flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />{" "}
                  {sending ? "Sending..." : "Mark as Replied & Send"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
