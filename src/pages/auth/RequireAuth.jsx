import { Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";

function RequireAuth({ children, redirectTo }) {
  const isAuthenticated = useAuth();
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

export default RequireAuth;
