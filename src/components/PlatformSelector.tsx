import { Youtube, Instagram, Facebook, MessageSquare } from "lucide-react";
import { cn } from "@/src/lib/utils";

const platforms = [
  { name: "YouTube", icon: Youtube, color: "text-red-600", bg: "bg-red-50" },
  { name: "Instagram", icon: Instagram, color: "text-pink-600", bg: "bg-pink-50" },
  { name: "Facebook", icon: Facebook, color: "text-blue-600", bg: "bg-blue-50" },
  { name: "Threads", icon: MessageSquare, color: "text-black", bg: "bg-gray-100" },
];

export default function PlatformSelector() {
  return (
    <div className="flex flex-wrap justify-center gap-3 py-4">
      {platforms.map((p) => (
        <div
          key={p.name}
          className={cn(
            "flex items-center space-x-2 px-4 py-2 rounded-xl border border-transparent transition-all hover:border-gray-200 cursor-default",
            p.bg
          )}
        >
          <p.icon className={cn("w-5 h-5", p.color)} />
          <span className="text-sm font-semibold text-gray-700">{p.name}</span>
        </div>
      ))}
    </div>
  );
}
