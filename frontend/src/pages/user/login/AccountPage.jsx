

import React, { useState } from "react";
import { useSelector } from "react-redux";
import ChangePasswordModal from "./ChangePasswordModal"; 
1
const AccountPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <div className="text-center py-10">Đang tải thông tin...</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Tài khoản của tôi</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <strong className="block text-gray-700">Họ tên:</strong>
          <span>{user.ten_hoc_ten || "Chưa cập nhật"}</span>
        </div>
        <div className="mb-4">
          <strong className="block text-gray-700">Email:</strong>
          <span>{user.email}</span>
        </div>
        <div className="mb-4">
          <strong className="block text-gray-700">Tên đăng nhập:</strong>
          <span>{user.ten_dang_nhap}</span>
        </div>
        <div className="mb-4">
          <strong className="block text-gray-700">Vai trò:</strong>
          <span className="capitalize">{user.role}</span>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Đổi mật khẩu
        </button>
      </div>

      {/* Render Modal */}
      <ChangePasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default AccountPage;
