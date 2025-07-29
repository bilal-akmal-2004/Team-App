import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../utils/validation";
import { toast } from "react-toastify";

const Register = ({ theme }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const { error } = registerSchema.validate(form); // 👈 Validate input
    if (error) {
      toast.error(`${error.details[0].message}`, {
        theme: theme, // ✅ use theme prop directly
      });
      return;
    }
    try {
      const res = await API?.post("/auth/register", form);
      setMessage("Registered successfully 🎉");

      localStorage.setItem("user", JSON.stringify(res.data)); // Store user in localStorage
      navigate("/"); // Redirect to homepage
      toast.success("Registered successful!", {
        theme: theme, // ✅ use theme prop directly
      });
    } catch (err) {
      console.error(err);
      const errorMsg = err?.response?.data?.error || "Something went wrong 😓";
      if (errorMsg.includes("Key (email)=")) {
        setMessage("❌ User with this email already exists.");
        toast.error("User with this email already exists.", {
          theme: theme, // ✅ use theme prop directly
        });
      } else {
        setMessage("❌ " + errorMsg);

        toast.error(errorMsg, {
          theme: theme, // ✅ use theme prop directly
        });
      }
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
        className={`rounded-3xl shadow-md p-6 w-full max-w-md space-y-4 transition-all duration-500 ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded transition-all duration-300 ${
            theme === "dark"
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
              : "bg-white border-gray-300 text-black"
          }`}
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded transition-all duration-300 ${
            theme === "dark"
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
              : "bg-white border-gray-300 text-black"
          }`}
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded transition-all duration-300 ${
            theme === "dark"
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
              : "bg-white border-gray-300 text-black"
          }`}
          required
        />

        <button
          type="submit"
          className={`w-full py-2 rounded transition-all duration-300 ${
            theme === "dark"
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Register
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className={`w-full text-sm mt-2 cursor-pointer transition-all duration-300 ${
            theme === "dark"
              ? "text-blue-300 hover:underline"
              : "text-blue-600 hover:underline"
          }`}
        >
          Already have an account? Login
        </button>

        {message && (
          <p
            className={`text-sm text-center mt-2 transition-all duration-300 ${
              theme === "dark" ? "text-red-400" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Register;
