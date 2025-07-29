import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Tasks() {
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
    <div className="p-4">
      <ToastContainer />

      <h2 className="text-2xl font-bold mb-4">📝 Task Management</h2>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Filter by Team ID"
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Filter by User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={fetchTasks}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Apply Filters
        </button>
      </div>

      {/* Tasks List */}
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-sm text-gray-600 mb-1">{task.description}</p>
              <p className="text-sm">Assigned To: {task.assigned_to || "—"}</p>
              <p className="text-sm">Team ID: {task.team_id}</p>
              <p className="text-sm">Due Date: {task.due_date?.slice(0, 10)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
