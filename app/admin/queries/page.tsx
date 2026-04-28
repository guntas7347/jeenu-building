"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MessageSquare,
  Loader2,
  Reply,
  CheckCircle2,
} from "lucide-react";
import { getQueries, markQueryReplied } from "@/lib/actions/queries";
import ViewInquiryModal from "@/components/ViewInquiryModal";
import Pagination from "@/components/Pagination"; // 1. Import your Pagination component
import { Toggle } from "@/components/Toggle";

type ExtendedQuery = {
  id: string;
  userId: string;
  listingId: string;
  message: string;
  phone: string;
  markAsRead: boolean;
  createdAt: string | Date;
  user: {
    name: string | null;
    email: string;
  };
  listing: {
    title: string;
    slug: string;
  };
};

export default function QueriesPage() {
  const [queries, setQueries] = useState<ExtendedQuery[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Add Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showRead, setShowRead] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState<ExtendedQuery | null>(
    null,
  );
  const [isMarking, setIsMarking] = useState(false);

  // 3. Trigger fetch whenever currentPage changes
  useEffect(() => {
    fetchQueries(currentPage);
  }, [currentPage, showRead]);

  const fetchQueries = async (page: number) => {
    setLoading(true); // Show loading spinner while changing pages
    try {
      // Fetching all queries (undefined) for page X, 25 items per page
      const response: any = await getQueries(showRead, page, 25);

      setQueries(response.data || []);
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch queries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Optional: Scroll up when page changes
  };

  const handleMarkAsRead = async () => {
    if (!selectedQuery) return;

    setIsMarking(true);
    try {
      await markQueryReplied(selectedQuery.id);

      setQueries((prev) =>
        prev.map((q) =>
          q.id === selectedQuery.id ? { ...q, markAsRead: true } : q,
        ),
      );

      setSelectedQuery(null);
    } catch (err) {
      console.error(err);
      alert("Error updating inquiry.");
    } finally {
      setIsMarking(false);
    }
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  const modalInquiryData = selectedQuery
    ? {
        name: selectedQuery.user.name || "Unknown Client",
        email: selectedQuery.user.email,
        phone: selectedQuery.phone,
        message: selectedQuery.message,
        propertyTitle: selectedQuery.listing.title,
        listingId: selectedQuery.listing.slug,
        createdAt: selectedQuery.createdAt,
      }
    : null;

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-6 py-8 relative pb-20 pt-32">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Client Inquiries
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Manage, review, and respond to property requests.
          </p>
        </div>

        <div>
          <Toggle
            label="Show Read"
            checked={showRead}
            onChange={(e) => setShowRead(e.target.checked)}
          />
        </div>
      </header>

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
                You have no pending client inquiries.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Client Details
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Property
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Message Snippet
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {queries.map((query) => (
                    <tr
                      key={query.id}
                      className={`transition-colors group ${
                        query.markAsRead
                          ? "hover:bg-slate-50/50"
                          : "bg-blue-50/30 hover:bg-blue-50/60"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-bold ${query.markAsRead ? "text-slate-900" : "text-blue-900"}`}
                          >
                            {query.user.name || "Unknown User"}
                          </span>
                          {!query.markAsRead && (
                            <span className="px-2 py-0.5 bg-blue-600 text-white text-[9px] font-bold uppercase tracking-widest rounded-md">
                              New
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col gap-1 mt-1 text-xs font-medium text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <Mail size={12} className="text-blue-600" />{" "}
                            {query.user.email}
                          </span>
                          {query.phone && (
                            <span className="flex items-center gap-1.5">
                              <Phone size={12} className="text-blue-600" />{" "}
                              {query.phone}
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
                          "{query.message || "No message attached"}"
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedQuery(query)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm text-sm font-bold opacity-90 group-hover:opacity-100 focus:opacity-100"
                        >
                          <Reply size={16} /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      {totalPages > 1 && (
        <div className="p-6 border-t border-slate-200 bg-slate-50 rounded-b-3xl">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
      <ViewInquiryModal
        isOpen={!!selectedQuery}
        onClose={() => setSelectedQuery(null)}
        inquiry={modalInquiryData}
        onMarkAsRead={handleMarkAsRead}
        isMarkingRead={isMarking}
      />
    </div>
  );
}
