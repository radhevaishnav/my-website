import { Download, ShieldCheck, Info } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full py-6 px-4 flex flex-col items-center text-center space-y-2">
      <div className="flex items-center space-x-2 text-blue-600">
        <Download className="w-8 h-8" />
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">MediaFlow</h1>
      </div>
      <p className="text-gray-500 max-w-md text-sm sm:text-base">
        Fast, simple, and mobile-friendly media downloader for your favorite platforms.
      </p>
      
      <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1.5 rounded-full text-blue-700 text-xs font-medium">
        <ShieldCheck className="w-4 h-4" />
        <span>Secure & Private Extraction</span>
      </div>

      <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-lg max-w-lg text-left">
        <div className="flex items-start space-x-2">
          <Info className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-[11px] text-amber-800 leading-relaxed">
            <span className="font-bold">Disclaimer:</span> This tool is for educational purposes. Please ensure you have the legal right to download the content. Respect copyright and platform Terms of Service.
          </p>
        </div>
      </div>
    </header>
  );
}
