import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav
      className={`p-4 flex items-center justify-between transition-colors duration-500 ${
        darkMode ? "bg-gray-800 text-white" : "bg-blue-600 text-white"
      }`}
    >
      {/* Left Links */}
      <div className="flex gap-4">
        <Link
          to="/"
          className="hover:underline hover:text-yellow-300 transition-colors duration-300"
        >
          Home
        </Link>
        <Link
          to="/add-team"
          className="hover:underline hover:text-yellow-300 transition-colors duration-300"
        >
          Add Team
        </Link>
        <Link
          to="/teams"
          className="hover:underline hover:text-yellow-300 transition-colors duration-300"
        >
          Teams
        </Link>
        <Link
          to="/tasks"
          className="hover:underline hover:text-yellow-300 transition-colors duration-300"
        >
          Tasks
        </Link>
      </div>

      {/* Right Button */}
      <button
        onClick={handleLogout}
        className={`px-3 py-1 rounded transition-all duration-300 ${
          darkMode
            ? "bg-red-600 hover:bg-red-700"
            : "bg-white text-black hover:bg-gray-200"
        }`}
      >
        Logout
      </button>
    </nav>
  );
}
