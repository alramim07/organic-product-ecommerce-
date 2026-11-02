import { Navigate, Outlet } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function AdminProtectedRoute() {
  const { isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
