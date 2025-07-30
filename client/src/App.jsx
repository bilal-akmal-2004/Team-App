import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import Navbar from "./components/Navbar";
import AddTeam from "./pages/AddTeam";
import Teams from "./pages/Teams";
import Tasks from "./pages/Tasks";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useTheme } from "./context/ThemeContext";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { darkMode, toggleTheme } = useTheme();
  const isLoggedIn = localStorage.getItem("user");

  return (
    <div>
      <BrowserRouter>
        {isLoggedIn ? <Navbar /> : <></>}

        <Routes>
          <Route
            path="/login"
            element={<LoginPage theme={darkMode ? "dark" : "light"} />}
          />
          <Route
            path="/register"
            element={<RegisterPage theme={darkMode ? "dark" : "light"} />}
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage theme={darkMode ? "dark" : "light"} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-team"
            element={
              <ProtectedRoute>
                <AddTeam />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teams"
            element={
              <ProtectedRoute>
                <Teams />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            }
          />
        </Routes>

        <ToastContainer position="top-center" autoClose={4000} />
      </BrowserRouter>

      <button
        onClick={toggleTheme}
        className="fixed bottom-4 left-4 bg-gray-200 dark:bg-gray-800 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
      >
        <motion.div
          key={darkMode ? "moon" : "sun"}
          initial={{ rotate: 180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          exit={{ rotate: -180, scale: 0 }}
          transition={{ duration: 0.3 }}
        >
          {darkMode ? (
            <Moon className="text-white" />
          ) : (
            <Sun className="text-yellow-500" />
          )}
        </motion.div>
      </button>
    </div>
  );
};

export default App;
