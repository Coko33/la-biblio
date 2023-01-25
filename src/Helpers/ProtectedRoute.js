import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  console.log(user);
  if (loading) return <Spinner></Spinner>;
  if (!user) return <Navigate to="/login" />;

  return children;
}
