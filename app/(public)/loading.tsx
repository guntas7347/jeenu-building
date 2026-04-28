import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] pt-20">
      <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
      {/* Changed the text to be generic since it applies to all pages now */}
      <p className="text-slate-500 font-medium text-lg">Loading...</p>
    </div>
  );
}
