import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddTeam() {
  const { darkMode } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      toast.error("Please enter both team name and your email.");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/teams/create`, {
        name,
        created_by: email,
      });

      toast.success("Team created successfully!");
      setName("");
      setEmail("");
    } catch (err) {
      toast.error("Failed to create team.");
      console.error(err);
    }
  };

  return (
    <div
      className={`h-[93vh] w-full flex items-center justify-center transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="w-full max-w-md p-4">
        <h2 className="text-xl font-bold mb-4 text-center">Add a New Team</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Team Name"
            className={`border p-2 rounded transition-colors duration-500 ${
              darkMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-white text-black border-gray-300"
            }`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            className={`border p-2 rounded transition-colors duration-500 ${
              darkMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-white text-black border-gray-300"
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 transition-colors duration-300 text-white py-2 rounded"
          >
            Add Team
          </button>
        </form>
      </div>
    </div>
  );
}
