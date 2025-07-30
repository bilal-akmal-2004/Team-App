import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../context/ThemeContext";

export default function Tasks() {
  const { darkMode } = useTheme();
  const [tasks, setTasks] = useState([]);
  const [teamId, setTeamId] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const params = {};
      if (teamId) params.teamId = teamId;
      if (userName) params.userName = userName;

      const res = await axios.get("http://localhost:5000/teams/tasks", {
        params,
      });
      setTasks(res.data);
    } catch (err) {
      toast.error("Failed to fetch tasks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div
      className={`h-[93vh] w-full px-4 py-8 transition-colors duration-500 flex flex-col items-center justify-start ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <ToastContainer />

      <h2 className="text-2xl font-bold mb-6 text-center">
        📝 Task Management
      </h2>

      {/* Filter Controls */}
      <div className="flex flex-wrap justify-center items-center gap-4 mb-6 w-full max-w-2xl">
        <input
          type="text"
          placeholder="Filter by Team ID"
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto"
        />
        <input
          type="text"
          placeholder="Filter by User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto"
        />
        <button
          onClick={fetchTasks}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Apply Filters
        </button>
      </div>

      {/* Tasks List */}
      <div className="w-full max-w-2xl overflow-y-auto px-2">
        {loading ? (
          <p className="text-center">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-center">No tasks found.</p>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`border p-4 rounded shadow ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-300 text-black"
                }`}
              >
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p
                  className={`text-sm mb-1 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {task.description}
                </p>
                <p className="text-sm">
                  Assigned To: {task.assigned_to || "—"}
                </p>
                <p className="text-sm">Team ID: {task.team_id}</p>
                <p className="text-sm">
                  Due Date: {task.due_date?.slice(0, 10)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
