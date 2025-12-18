import express from "express";

import dotenv from "dotenv/config";
// لتحميل متغيرات البيئة (Environment Variables) من ملف .env تلقائياً عند تشغيل التطبيق

import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import path from "path";
import fs from "fs";
import keepAliveJob from "./lib/keepAliveJob.js";

import { connectDB } from "./lib/db.js";



const app = express();

const __dirname = path.resolve();
const PORT = process.env.PORT || 3587;

const parseAllowedOrigins = (value) =>
  String(value || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const allowedOrigins = parseAllowedOrigins(process.env.CORS_ORIGIN);

app.use(
  cors({
    origin: (origin, callback) => {
      // Requests like curl/server-to-server often have no Origin header.
      if (!origin) return callback(null, true);

      // In production when the frontend is served by this same service, CORS isn't
      // typically needed. Allowing same-origin requests works without extra config.
      if (process.env.NODE_ENV === "production" && allowedOrigins.length === 0) {
        return callback(null, true);
      }

      // When deploying frontend separately, set CORS_ORIGIN as a comma-separated list.
      if (allowedOrigins.includes(origin)) return callback(null, true);

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true, // allow the frontend to access cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cookieParser()); // Add this line to parse cookies to access cookies in req.cookies
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    ok: true,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Alias endpoint used by the keep-alive cron job
app.get("/api/status", (req, res) => {
  res.status(200).json({ ok: true });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

if (process.env.NODE_ENV === "production") {
  const distDir = path.join(__dirname, "../frontend/dist");
  const indexHtml = path.join(distDir, "index.html");

  // If frontend is deployed separately (Render Static Site), the dist folder won't exist
  // in this backend service. Only enable static serving when the build output is present.
  if (fs.existsSync(indexHtml)) {
    app.use(express.static(distDir));
    app.get("*", (req, res) => {
      res.sendFile(indexHtml);
    });
  }
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);

  // Send a GET request every 14 minutes to avoid Render idling.
  // Enable by setting API_URL (example: https://your-service.onrender.com)
  keepAliveJob.start();
});
