/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import axios from "axios";
import { AlertCircle, CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import PlatformSelector from "./components/PlatformSelector";
import URLInput from "./components/URLInput";
import MediaCard from "./components/MediaCard";
import Footer from "./components/Footer";

interface MediaMetadata {
  title: string;
  thumbnail: string;
  duration: string;
  platform: string;
  formats: {
    quality: string;
    type: "video" | "audio";
    size: string;
    id: string;
  }[];
}

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [metadata, setMetadata] = useState<MediaMetadata | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFetch = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setMetadata(null);

    try {
      const response = await axios.post("/api/fetch-metadata", { url });
      setMetadata(response.data);
      setSuccess("Media found! Select your preferred quality below.");
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(null), 5000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch media. Please check the URL and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col font-sans text-gray-900">
      <main className="flex-grow flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
        <Header />
        
        <div className="w-full max-w-4xl mt-8 space-y-8 flex flex-col items-center">
          <PlatformSelector />
          <URLInput onFetch={handleFetch} isLoading={isLoading} />

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-2xl bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center justify-between text-red-800"
              >
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-sm font-medium">{error}</p>
                </div>
                <button onClick={() => setError(null)} className="p-1 hover:bg-red-100 rounded-lg transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-2xl bg-green-50 border border-green-100 p-4 rounded-2xl flex items-center justify-between text-green-800"
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <p className="text-sm font-medium">{success}</p>
                </div>
                <button onClick={() => setSuccess(null)} className="p-1 hover:bg-green-100 rounded-lg transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {metadata && <MediaCard metadata={metadata} />}
        </div>

        {/* Features Section */}
        <section className="w-full max-w-6xl mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">High Quality</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Extract media in the highest available resolution, up to 4K for video and 320kbps for audio.
            </p>
          </div>
          <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">Fast & Secure</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Our servers handle the heavy lifting, ensuring fast extraction without compromising your privacy.
            </p>
          </div>
          <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
              <X className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">No Ads</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Enjoy a clean, distraction-free experience without annoying popups or intrusive advertisements.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

