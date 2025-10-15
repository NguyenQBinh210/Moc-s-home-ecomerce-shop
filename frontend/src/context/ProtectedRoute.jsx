import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const ProtectedRoute = ({ requiredRole }) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    toast.warn("Vui lòng đăng nhập để tiếp tục.");
    return <Navigate to="/login" replace />;
  }
  if (requiredRole && user.role !== requiredRole) {
    toast.error("Bạn không có quyền truy cập vào trang này.");
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
