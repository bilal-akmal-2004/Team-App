import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [newMembers, setNewMembers] = useState({});
  const [newTasks, setNewTasks] = useState({});

  // Fetch all teams
  useEffect(() => {
    axios
      .get("http://localhost:5000/teams")
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
      await axios.post("http://localhost:5000/teams/add-member", {
        teamId,
        userName,
      });
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
      await axios.post("http://localhost:5000/teams/task", {
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
    <div className="p-4">
      <ToastContainer />
      <h2 className="text-xl font-bold mb-4">Teams</h2>
      <div className="space-y-4">
        {teams.map((team) => (
          <div key={team.id} className="border p-4 rounded shadow-sm">
            <h3 className="text-lg font-semibold">{team.name}</h3>
            <p className="text-sm text-gray-600 mb-2">
              Created By: {team.created_by}
            </p>

            {/* Add Member */}
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                placeholder="Member Name"
                className="border p-2 rounded w-full"
                value={newMembers[team.id] || ""}
                onChange={(e) => handleMemberChange(team.id, e.target.value)}
              />
              <button
                onClick={() => handleAddMember(team.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add Member
              </button>
            </div>

            {/* Add Task Form */}
            <div className="space-y-2 mb-2">
              <input
                type="text"
                placeholder="Task Title"
                className="border p-2 rounded w-full"
                value={newTasks[team.id]?.title || ""}
                onChange={(e) =>
                  handleTaskInput(team.id, "title", e.target.value)
                }
              />
              <textarea
                placeholder="Task Description"
                className="border p-2 rounded w-full"
                value={newTasks[team.id]?.description || ""}
                onChange={(e) =>
                  handleTaskInput(team.id, "description", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Assign To (username)"
                className="border p-2 rounded w-full"
                value={newTasks[team.id]?.assignedTo || ""}
                onChange={(e) =>
                  handleTaskInput(team.id, "assignedTo", e.target.value)
                }
              />
              <input
                type="date"
                className="border p-2 rounded w-full"
                value={newTasks[team.id]?.dueDate || ""}
                onChange={(e) =>
                  handleTaskInput(team.id, "dueDate", e.target.value)
                }
              />
              <button
                onClick={() => handleAddTask(team.id)}
                className="bg-green-600 text-white px-4 py-2 rounded w-full"
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
