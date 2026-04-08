import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/fetch-metadata", (req, res) => {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    // Mock metadata fetching logic
    // In a real app, you'd use libraries like yt-dlp or official APIs
    // We simulate a delay and return mock data
    setTimeout(() => {
      let platform = "unknown";
      if (url.includes("youtube.com") || url.includes("youtu.be")) platform = "YouTube";
      else if (url.includes("instagram.com")) platform = "Instagram";
      else if (url.includes("facebook.com")) platform = "Facebook";
      else if (url.includes("threads.net")) platform = "Threads";

      if (platform === "unknown") {
        return res.status(400).json({ error: "Unsupported platform or invalid URL" });
      }

      res.json({
        title: `Sample ${platform} Media Content`,
        thumbnail: `https://picsum.photos/seed/${platform}/800/450`,
        duration: "03:45",
        platform,
        formats: [
          { quality: "1080p", type: "video", size: "45 MB", id: "v1080" },
          { quality: "720p", type: "video", size: "22 MB", id: "v720" },
          { quality: "480p", type: "video", size: "12 MB", id: "v480" },
          { quality: "320kbps", type: "audio", size: "8 MB", id: "a320" },
          { quality: "128kbps", type: "audio", size: "3 MB", id: "a128" },
        ],
      });
    }, 1500);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
