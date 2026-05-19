import { Check, Copy, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const ImagePreviewAdmin = ({
  url,
  onDelete,
}: {
  url: string;
  onDelete: () => void;
}) => {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy URL", error);
    }
  };

  useEffect(() => {
    if (!copied) return;

    const timeout = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <div className="relative group rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
      <div className="aspect-video relative">
        <img src={url} alt="Gallery" className="w-full h-full object-cover" />

        <button
          type="button"
          onClick={onDelete}
          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="p-2 bg-white border-t border-slate-100 flex items-center gap-2">
        <p className="text-[10px] text-slate-500 font-mono truncate flex-1">
          {url}
        </p>

        <button
          type="button"
          onClick={onCopy}
          className="shrink-0 p-1.5 rounded-md hover:bg-slate-100 transition-all"
        >
          {copied ? (
            <Check size={14} className="text-green-600" />
          ) : (
            <Copy size={14} className="text-slate-500" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ImagePreviewAdmin;
