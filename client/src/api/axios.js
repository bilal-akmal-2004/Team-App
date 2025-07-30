// api/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`, // or your backend URL
  withCredentials: true, // IMPORTANT for session cookies! dd
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
