import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRole }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return role === "doctor" ? (
      <Navigate to="/doctor/dashboard" replace />
    ) : (
      <Navigate to="/user/dashboard" replace />
    );
  }

  // ✅ Allowed → render child routes
  return <Outlet />;
};

export default ProtectedRoute;
