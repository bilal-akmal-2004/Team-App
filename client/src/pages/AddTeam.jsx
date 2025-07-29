import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddTeam() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      toast.error("Please enter both team name and your email.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/teams/create", {
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
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add a New Team</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Team Name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="bg-green-600 text-white py-2 rounded">
          Add Team
        </button>
      </form>
    </div>
  );
}
