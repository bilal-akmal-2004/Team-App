// api/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // or your backend URL
  withCredentials: true, // IMPORTANT for session cookies!
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
