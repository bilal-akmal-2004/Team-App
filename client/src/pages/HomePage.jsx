import { useTheme } from "../context/ThemeContext";
export default function Home() {
  const { darkMode } = useTheme();
  return (
    <div
      className={`h-[93vh] w-full flex flex-col items-center justify-center p-4 transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-3xl font-bold mb-2">
        🏠 Welcome to the Team Manager
      </h1>
      <p className="text-lg">
        Create teams, assign tasks, and collaborate easily!
      </p>
    </div>
  );
}
