import { useState } from "react";
import { Download, Play, Music, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";

interface Format {
  quality: string;
  type: "video" | "audio";
  size: string;
  id: string;
}

interface MediaMetadata {
  title: string;
  thumbnail: string;
  duration: string;
  platform: string;
  formats: Format[];
}

interface MediaCardProps {
  metadata: MediaMetadata;
}

export default function MediaCard({ metadata }: MediaCardProps) {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [completedId, setCompletedId] = useState<string | null>(null);

  const handleDownload = (format: Format) => {
    setDownloadingId(format.id);
    setCompletedId(null);

    // Simulate download process
    setTimeout(() => {
      setDownloadingId(null);
      setCompletedId(format.id);
      
      // Reset completed state after 3 seconds
      setTimeout(() => setCompletedId(null), 3000);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden mt-8 mx-4"
    >
      <div className="relative aspect-video bg-gray-900 group">
        <img
          src={metadata.thumbnail}
          alt={metadata.title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform cursor-pointer">
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          </div>
        </div>
        <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-white text-xs font-mono">
          {metadata.duration}
        </div>
        <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600 rounded-full text-white text-[10px] font-bold uppercase tracking-wider">
          {metadata.platform}
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 line-clamp-2 mb-6">
          {metadata.title}
        </h2>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">
            Available Formats
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {metadata.formats.map((format) => (
              <button
                key={format.id}
                onClick={() => handleDownload(format)}
                disabled={downloadingId !== null}
                className={cn(
                  "flex items-center justify-between p-4 rounded-2xl border transition-all group relative overflow-hidden",
                  completedId === format.id
                    ? "bg-green-50 border-green-200 text-green-700"
                    : "bg-gray-50 border-gray-100 hover:border-blue-200 hover:bg-blue-50 text-gray-700"
                )}
              >
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "p-2 rounded-xl",
                    format.type === "video" ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"
                  )}>
                    {format.type === "video" ? <Play className="w-4 h-4" /> : <Music className="w-4 h-4" />}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold">{format.quality}</p>
                    <p className="text-[10px] text-gray-400 font-medium uppercase">{format.type} • {format.size}</p>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {downloadingId === format.id ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                    </motion.div>
                  ) : completedId === format.id ? (
                    <motion.div
                      key="completed"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Download className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {downloadingId === format.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-blue-600"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
