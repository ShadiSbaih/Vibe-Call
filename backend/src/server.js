import express from "express";

import dotenv from "dotenv/config";
// لتحميل متغيرات البيئة (Environment Variables) من ملف .env تلقائياً عند تشغيل التطبيق

import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import path from "path";

import { connectDB } from "./lib/db.js";



const app = express();

const __dirname = path.resolve();
const PORT = process.env.PORT || 3587;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,// Access-Control-Allow-Credentials: true ,allow the frontend to access the cookies
  methods: ["GET", "POST", "PUT", "DELETE"],
}))
app.use(cookieParser()); // Add this line to parse cookies to access cookies in req.cookies
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
