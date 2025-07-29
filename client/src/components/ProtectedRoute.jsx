import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user"); // or token, as you’ve set
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
