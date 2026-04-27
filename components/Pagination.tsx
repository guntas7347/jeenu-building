"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const [jumpInputValue, setJumpInputValue] = useState("");

  // Do not render anything if there is only 1 page or no pages
  if (totalPages <= 1) return null;

  // Generate the sliding window of page numbers
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }
    return pages;
  };

  const handleJump = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const page = parseInt(jumpInputValue, 10);
      if (!isNaN(page) && page >= 1 && page <= totalPages) {
        onPageChange(page);
        setJumpInputValue(""); // Clear input after successful jump
      }
    }
  };

  return (
    <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-2">
      {/* Standard Pagination Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:border-blue-600 hover:text-blue-600 transition-colors disabled:opacity-50 disabled:pointer-events-none"
        >
          <ChevronLeft size={20} />
        </button>

        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-slate-400">
                ...
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <button
              key={`page-${page}`}
              onClick={() => onPageChange(page as number)}
              className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-colors ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20"
                  : "border border-slate-200 text-slate-600 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:border-blue-600 hover:text-blue-600 transition-colors disabled:opacity-50 disabled:pointer-events-none"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Jump to Page Input */}
      <div className="flex items-center gap-2 sm:ml-4 sm:border-l border-slate-200 sm:pl-4">
        <span className="text-sm font-medium text-slate-500">Go to:</span>
        <input
          type="number"
          min={1}
          max={totalPages}
          value={jumpInputValue}
          onChange={(e) => setJumpInputValue(e.target.value)}
          onKeyDown={handleJump}
          placeholder="#"
          className="w-14 h-10 px-2 text-center text-sm font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all placeholder:text-slate-300 placeholder:font-normal"
        />
      </div>
    </div>
  );
}
