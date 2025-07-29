import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex gap-4">
      <Link to="/">Home</Link>
      <Link to="/add-team">Add Team</Link>
      <Link to="/teams">Teams</Link>
      <Link to="/tasks">Tasks</Link>
    </nav>
  );
}
