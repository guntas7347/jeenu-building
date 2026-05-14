"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type OptionObject = { label: string; value: string | number };
type Option = OptionObject | string;

interface SelectProps {
  options: Option[];
  value?: string | number;
  onChange: (value: any) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export const Select = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  className = "",
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize options
  const normalizedOptions: OptionObject[] = options.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt,
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  return (
    <div
      className={`relative w-full min-w-[200px] ${className}`}
      ref={containerRef}
    >
      {label && (
        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">
          {label}
        </label>
      )}

      {/* Main Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between px-4 py-3 rounded-xl text-left 
          bg-white border border-slate-200 transition-all duration-200
          hover:border-slate-300 active:bg-slate-50
          ${isOpen ? "ring-2 ring-slate-900/5 border-slate-400" : "shadow-sm"}
        `}
      >
        <span
          className={`
          block truncate text-sm font-medium
          ${!selectedOption ? "text-slate-400" : "text-slate-900"}
        `}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 8 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-[100] w-full bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 mt-1 origin-top"
          >
            <div className="max-h-60 overflow-y-auto overflow-x-hidden">
              {normalizedOptions.length > 0 ? (
                normalizedOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`
                      w-full flex items-center justify-between px-4 py-2 text-sm transition-colors
                      ${
                        value === option.value
                          ? "bg-slate-50 text-secondary font-semibold"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }
                    `}
                  >
                    <span className="truncate">{option.label}</span>
                    {value === option.value && (
                      <Check size={14} strokeWidth={3} />
                    )}
                  </button>
                ))
              ) : (
                <div className="px-4 py-2 text-xs text-slate-400 italic">
                  No options
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
