"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";

export type PricingItem = {
  id?: string; // Make optional for older database entries that don't have it
  label: string;
  value: string;
};

interface PricingBreakdownEditorProps {
  initialData: PricingItem[];
  onChange: (data: PricingItem[]) => void;
}

export default function PricingBreakdownEditor({
  initialData,
  onChange,
}: PricingBreakdownEditorProps) {
  const [items, setItems] = useState<PricingItem[]>([]);

  useEffect(() => {
    if (initialData && Array.isArray(initialData)) {
      // Generate an ID only if it doesn't already exist from the database
      const formatted = initialData.map((item) => ({
        ...item,
        id: item.id || crypto.randomUUID(),
      }));
      setItems(formatted);
    }
  }, [initialData]);

  const handleUpdate = (
    index: number,
    field: "label" | "value",
    val: string,
  ) => {
    const newItems = [...items];
    newItems[index][field] = val;

    setItems(newItems);
    // FIX: Pass the whole array back (INCLUDING the id) so the parent state
    // doesn't lose the keys, which prevents the re-render focus loss.
    onChange(newItems);
  };

  const handleAdd = () => {
    const newItems = [
      ...items,
      { id: crypto.randomUUID(), label: "", value: "" },
    ];
    setItems(newItems);
    onChange(newItems);
  };

  const handleRemove = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    onChange(newItems);
  };

  return (
    <div className="space-y-4">
      {items.length > 0 && (
        <div className="space-y-3">
          <div className="flex gap-4 px-2">
            <div className="w-8"></div>
            <div className="flex-1 text-xs font-bold text-slate-500 uppercase tracking-widest">
              Pricing Label
            </div>
            <div className="flex-1 text-xs font-bold text-slate-500 uppercase tracking-widest">
              Value / Amount
            </div>
            <div className="w-10"></div>
          </div>

          {items.map((item, index) => (
            <div key={item.id} className="flex items-center gap-4 group">
              <div className="text-slate-300 cursor-grab active:cursor-grabbing hover:text-slate-500 transition-colors">
                <GripVertical size={20} />
              </div>

              <input
                type="text"
                placeholder="e.g. HOA Fees"
                value={item.label}
                onChange={(e) => handleUpdate(index, "label", e.target.value)}
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-slate-900 text-sm font-medium"
              />

              <input
                type="text"
                placeholder="e.g. $450 / month"
                value={item.value}
                onChange={(e) => handleUpdate(index, "value", e.target.value)}
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-slate-900 text-sm font-medium"
              />

              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="p-2.5 bg-white border border-slate-200 text-slate-400 hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-xl transition-all shadow-sm opacity-0 group-hover:opacity-100 focus:opacity-100"
                title="Remove Item"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={handleAdd}
        className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
      >
        <Plus size={16} />
        Add Pricing Row
      </button>
    </div>
  );
}
