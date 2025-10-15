import { toast, ToastContainer } from "react-toastify";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../../../context/AuthContext";


const Login = () => {
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (typeof loginIdentifier !== "string" || typeof password !== "string") {
        throw new Error("Thông tin đăng nhập không hợp lệ.");
      }

      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          loginIdentifier: loginIdentifier,
          mat_khau: password,
        }),
      });

      const responseData = await response.json();

      if (!responseData.success) {
        throw new Error(responseData.message || "Đăng nhập thất bại");
      }

      login(responseData.user, responseData.token);

      if (responseData.user.role === "admin") {
        toast.success("Đăng nhập thành công với vai trò Admin!");
        navigate("/admin");
      } else {
        toast.success("Đăng nhập thành công!");
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    // Sử dụng min-h-screen để đảm bảo component chiếm toàn bộ chiều cao màn hình
    <div className="flex flex-col md:flex-row min-w-screen bg-gray-100">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <div className="relative bg-cover bg-center text-white p-8 md:p-12 md:w-1/2 flex flex-col justify-between image">
        <div className="absolute inset-0 bg-black/40 z-0"></div>

        <div className="z-10 relative flex flex-col h-full">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 transition-transform hover:scale-105 duration-300 drop-shadow-lg" // Thêm drop-shadow-lg
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8 text-white"
            >
              <path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5" />
              <path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244" />
              <path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05" />
            </svg>
            <span className="text-2xl font-extrabold text-white drop-shadow-lg">
              Mộc's HOME
            </span>{" "}
            {/* THAY ĐỔI: font-extrabold và drop-shadow-lg */}
          </Link>

          <div className="mt-auto pb-10">
            {" "}
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-xl">
              Welcome back
            </h1>{" "}
            <p className="max-w-md text-lg opacity-95 drop-shadow-lg">
              {" "}
              Chào mừng đến với Mộc's home! Vui lòng đăng nhập để tiếp tục quản
              lý và mua sắm tại cửa hàng của chúng tôi.
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        {/* Có thể chỉnh màu trắng/opacity cho các element trang trí nếu cần */}
        <div className="absolute -bottom-20 -right-20 w-72 h-72 border-4 border-white/20 rounded-full z-0"></div>
        <div className="absolute -top-20 -left-20 w-80 h-80 border-4 border-white/20 rounded-full z-0"></div>
      </div>

      {/* Right Section - Login Form */}
      <div className="p-8 md:p-12 md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md bg-gradient-to-br from-gray-50 to-gray-200 p-8 rounded-2xl shadow-2xl border border-gray-200">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
              Đăng nhập
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md text-sm">
                  <p>{error}</p>
                </div>
              )}
              <div className="space-y-2">
                <label
                  htmlFor="login-identifier"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tên đăng nhập hoặc Email
                </label>
                <input
                  id="login-identifier"
                  type="text"
                  placeholder="Nhập tên đăng nhập hoặc email"
                  required
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  className="w-full h-12 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mật khẩu
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200"
                />
                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500 hover:underline"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50"
              >
                Đăng nhập
              </button>
            </div>
          </form>
          <div className="text-center mt-6">
            <span className="text-sm text-gray-500">Chưa có tài khoản? </span>
            <Link
              to="/register"
              className="text-sm text-blue-600 font-medium hover:underline"
            >
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
