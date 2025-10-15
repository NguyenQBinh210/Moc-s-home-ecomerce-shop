import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAdminAuth } from "../context/AdminAuthContext";

const AdminProtectedRoute = () => {
  const { admin, loading } = useAdminAuth();
  if (loading) {
    return <div>Đang xác thực quyền truy cập...</div>;
  }

  if (!admin) {
    return (
      <>
        <Navigate to="/" replace/>;
      </>
    );
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
