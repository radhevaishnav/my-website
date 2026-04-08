import { useState, FormEvent } from "react";
import { Search, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface URLInputProps {
  onFetch: (url: string) => void;
  isLoading: boolean;
}

export default function URLInput({ onFetch, isLoading }: URLInputProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onFetch(url.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl px-4">
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
        </div>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste video or audio link here..."
          className="w-full pl-12 pr-16 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 placeholder:text-gray-400"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className={cn(
            "absolute right-2 top-2 bottom-2 px-4 rounded-xl font-semibold transition-all flex items-center justify-center",
            isLoading || !url.trim()
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
          )}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <ArrowRight className="w-5 h-5" />
          )}
        </button>
      </div>
      <p className="mt-2 text-center text-xs text-gray-400">
        Supports YouTube, Instagram, Facebook, and Threads links.
      </p>
    </form>
  );
}
