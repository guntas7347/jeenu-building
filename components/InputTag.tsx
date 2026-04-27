"use client";

import { Plus, X } from "lucide-react";
import { useState } from "react";

const TagInput = ({
  label,
  tags,
  setTags,
  placeholder,
}: {
  label: string;
  tags: string[];
  setTags: (tags: string[]) => void;
  placeholder?: string;
}) => {
  const [input, setInput] = useState("");

  const addTag = () => {
    if (input.trim() && !tags.includes(input.trim())) {
      setTags([...tags, input.trim()]);
      setInput("");
    }
  };

  return (
    <div>
      <label className="block text-sm font-bold text-slate-700 mb-1.5">
        {label}
      </label>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 outline-none"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
        />
        <button
          type="button"
          onClick={addTag}
          className="px-4 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100"
          >
            {tag}
            <button
              type="button"
              onClick={() => setTags(tags.filter((_, i) => i !== idx))}
              className="hover:text-blue-900"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
