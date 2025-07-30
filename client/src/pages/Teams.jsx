import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useTheme } from "../context/ThemeContext";

export default function Teams() {
  const { darkMode } = useTheme();
  const [teams, setTeams] = useState([]);
  const [newMembers, setNewMembers] = useState({});
  const [newTasks, setNewTasks] = useState({});

  // Fetch all teams
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/teams`)
      .then((res) => setTeams(res.data))
      .catch((err) => {
        toast.error("Failed to fetch teams.");
        console.error(err);
      });
  }, []);

  // Update member input
  const handleMemberChange = (teamId, value) => {
    setNewMembers((prev) => ({
      ...prev,
      [teamId]: value,
    }));
  };

  // Add member to team
  const handleAddMember = async (teamId) => {
    const userName = newMembers[teamId];
    if (!userName) return toast.warn("Please enter a member name.");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/teams/add-member`,
        {
          teamId,
          userName,
        }
      );
      toast.success(`Added ${userName} to team`);
      setNewMembers((prev) => ({ ...prev, [teamId]: "" }));
    } catch (err) {
      toast.error("Failed to add member");
      console.error(err);
    }
  };

  // Handle task input change per field
  const handleTaskInput = (teamId, field, value) => {
    setNewTasks((prev) => ({
      ...prev,
      [teamId]: {
        ...prev[teamId],
        [field]: value,
      },
    }));
  };

  // Submit new task
  const handleAddTask = async (teamId) => {
    const task = newTasks[teamId];
    if (!task?.title || !task?.description) {
      return toast.warn("Task title and description are required.");
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/teams/task`, {
        title: task.title,
        description: task.description,
        teamId,
        assignedTo: task.assignedTo || null,
        dueDate: task.dueDate || null,
      });
      toast.success("Task created");
      setNewTasks((prev) => ({ ...prev, [teamId]: {} }));
    } catch (err) {
      toast.error("Failed to create task");
      console.error(err);
    }
  };

  return (
    <div
      className={`min-h-screen p-4 transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } flex flex-col items-center`}
    >
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 text-center">Teams</h2>

      <div className="w-full max-w-2xl space-y-6">
        {teams.map((team) => (
          <div
            key={team.id}
            className={`rounded-lg p-6 shadow-md transition-colors duration-300 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3 className="text-xl font-semibold mb-1">{team.name}</h3>
            <p
              className={`text-sm mb-4 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Created By: {team.created_by}
            </p>

            {/* Add Member */}
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                placeholder="Member Name"
                className={`p-2 rounded w-full border outline-none ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-black border-gray-300"
                }`}
                value={newMembers[team.id] || ""}
                onChange={(e) => handleMemberChange(team.id, e.target.value)}
              />
              <button
                onClick={() => handleAddMember(team.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
              >
                Add
              </button>
            </div>

            {/* Add Task Form */}
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Task Title"
                className={`p-2 rounded w-full border outline-none ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-black border-gray-300"
                }`}
                value={newTasks[team.id]?.title || ""}
                onChange={(e) =>
                  handleTaskInput(team.id, "title", e.target.value)
                }
              />
              <textarea
                placeholder="Task Description"
                className={`p-2 rounded w-full border outline-none ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-black border-gray-300"
                }`}
                value={newTasks[team.id]?.description || ""}
                onChange={(e) =>
                  handleTaskInput(team.id, "description", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Assign To (username)"
                className={`p-2 rounded w-full border outline-none ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-black border-gray-300"
                }`}
                value={newTasks[team.id]?.assignedTo || ""}
                onChange={(e) =>
                  handleTaskInput(team.id, "assignedTo", e.target.value)
                }
              />
              <input
                type="date"
                className={`p-2 rounded w-full border outline-none ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-black border-gray-300"
                }`}
                value={newTasks[team.id]?.dueDate || ""}
                onChange={(e) =>
                  handleTaskInput(team.id, "dueDate", e.target.value)
                }
              />
              <button
                onClick={() => handleAddTask(team.id)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full transition"
              >
                Add Task
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
