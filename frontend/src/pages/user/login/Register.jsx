import { toast, ToastContainer } from "react-toastify";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router";

const Register = () => {
  const [formData, setFormData] = useState({
    ten_dang_nhap: "",
    email: "",
    ten_hoc_ten: "",
    so_dien_thoai: "",
    mat_khau: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Kiểm tra mật khẩu nhập lại
    if (formData.mat_khau !== formData.confirmPassword) {
      const errMsg = "Mật khẩu nhập lại không khớp.";
      setError(errMsg);
      toast.error(errMsg);
      return;
    }

    try {
      const { ...dataToSend } = formData; 
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const responseData = await response.json();

      if (!responseData.success) {
        throw new Error(responseData.message || "Đăng ký thất bại");
      }

      toast.success(
        "Đăng ký thành công! Bạn sẽ được chuyển đến trang đăng nhập."
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <div className="relative bg-cover bg-center text-white p-8 md:p-12 md:w-1/2 flex flex-col justify-between image">
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="z-10 relative flex flex-col h-full">
          <Link to="/" className="flex items-center space-x-2">
            {/* SVG Logo */}
            <span className="text-2xl font-extrabold text-white">
              Mộc's HOME
            </span>
          </Link>
          <div className="mt-auto pb-10">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
              Tạo tài khoản mới
            </h1>
            <p className="max-w-md text-lg opacity-95">
              Gia nhập cộng đồng Mộc's Home để nhận những ưu đãi hấp dẫn và trải
              nghiệm mua sắm tuyệt vời.
            </p>
          </div>
        </div>
      </div>

      <div className="p-8 md:p-12 md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md bg-gradient-to-br from-gray-50 to-gray-200 p-8 rounded-2xl shadow-2xl border">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
              Đăng ký
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md text-sm">
                  <p>{error}</p>
                </div>
              )}

              <input
                id="ten_hoc_ten"
                type="text"
                placeholder="Họ và tên*"
                required
                value={formData.ten_hoc_ten}
                onChange={handleInputChange}
                className="input-field"
              />
              <input
                id="ten_dang_nhap"
                type="text"
                placeholder="Tên đăng nhập*"
                required
                value={formData.ten_dang_nhap}
                onChange={handleInputChange}
                className="input-field"
              />
              <input
                id="email"
                type="email"
                placeholder="Email*"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="input-field"
              />
              <input
                id="so_dien_thoai"
                type="tel"
                placeholder="Số điện thoại*"
                required
                value={formData.so_dien_thoai}
                onChange={handleInputChange}
                className="input-field"
              />
              <input
                id="mat_khau"
                type="password"
                placeholder="Mật khẩu*"
                required
                value={formData.mat_khau}
                onChange={handleInputChange}
                className="input-field"
              />
              <input
                id="confirmPassword"
                type="password"
                placeholder="Nhập lại mật khẩu*"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="input-field"
              />

              <button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md"
              >
                Đăng ký
              </button>
            </div>
          </form>
          <div className="text-center mt-6">
            <span className="text-sm text-gray-500">Đã có tài khoản? </span>
            <Link
              to="/login"
              className="text-sm text-blue-600 font-medium hover:underline"
            >
              Đăng nhập ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
