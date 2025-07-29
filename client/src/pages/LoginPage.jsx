import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginSchema } from "../utils/validation";
const Login = ({ theme }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = loginSchema.validate(form); // 👈 Validate input
    if (error) {
      toast.error(`${error.details[0].message}`, {
        theme: theme, // Use the theme prop
      });
      return;
    }
    try {
      const res = await API.post("/auth/login", form);
      setMessage(res.data || "Login successful 🎉");
      localStorage.setItem("user", JSON.stringify(res.data)); // Store
      navigate("/"); // Redirect to homepage
      toast.success("Login successful!", {
        theme: theme, // Use the theme prop
      });
    } catch (err) {
      setMessage(err.response?.data || "Login failed");

      toast.error("Invalid credentials!", {
        theme: theme, // Use the theme prop
      });
    }
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen transition-all duration-500 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={` shadow-md rounded-3xl p-6 w-full max-w-md space-y-4 transition-all duration-500 ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded transition-all duration-300 ${
            theme === "dark"
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
              : "bg-white border-gray-300 text-black"
          }`}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded transition-all duration-300 ${
            theme === "dark"
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
              : "bg-white border-gray-300 text-black"
          }`}
        />
        <button
          type="submit"
          className={`w-full text-white py-2 rounded cursor-pointer ${
            theme === "dark"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          Login
        </button>

        <button
          type="button"
          onClick={() => navigate("/register")}
          className={`w-full text-sm mt-2 cursor-pointer hover:underline ${
            theme === "dark" ? "text-blue-400" : "text-blue-600"
          }`}
        >
          Don’t have an account? Register
        </button>

        {message && <p className="text-sm text-center mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
