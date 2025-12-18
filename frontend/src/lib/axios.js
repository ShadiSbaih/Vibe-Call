import axios from "axios";

const envBaseUrl = import.meta.env.VITE_API_URL;

// If deploying frontend separately (Render Static Site), set VITE_API_URL to your backend API base,
// e.g. https://vibe-callvi.onrender.com/api
const BASE_URL =
    envBaseUrl ||
    (import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api");

export const axiosInstance = axios.create({
    baseURL: BASE_URL, // Base URL for the API
    withCredentials: true, // Include credentials (cookies) in requests
})