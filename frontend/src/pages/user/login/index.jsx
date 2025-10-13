import { toast, ToastContainer } from "react-toastify";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
[
  {
    resource:
      "/d:/visual studio code/Moc's-home'ecomerce-shop/frontend/src/pages/user/login/index.jsx",
    owner: "eslint5",
    code: {
      value: "no-undef",
      target: {
        $mid: 1,
        path: "/docs/latest/rules/no-undef",
        scheme: "https",
        authority: "eslint.org",
      },
    },
    severity: 8,
    message: "'toast' is not defined.",
    source: "eslint",
    startLineNumber: 54,
    startColumn: 11,
    endLineNumber: 54,
    endColumn: 16,
    origin: "extHost1",
  },
];

const useAuth = () => ({
  login: async (loginIdentifier, password) => {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loginIdentifier: loginIdentifier,
        mat_khau: password,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Đăng nhập thất bại");
    }

    // Lưu token và thông tin người dùng vào localStorage để sử dụng sau này
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user)); // Lưu thông tin người dùng

    return data; // Trả về toàn bộ dữ liệu để xử lý tiếp
  },
});

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
      // SỬA ĐỔI: Lưu kết quả trả về từ hàm login
      const responseData = await login(loginIdentifier, password);

      // SỬA ĐỔI: Kiểm tra vai trò của người dùng từ kết quả trả về
      if (responseData && responseData.user) {
        if (responseData.user.role === "admin") {
          toast.success("Đăng nhập thành công với vai trò Admin");
          navigate("/admin");
        } else {
          toast.success("Đăng nhập thành công");
          navigate("/");
        }
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng nhập tài khoản
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Hoặc{" "}
            <Link
              to="/register"
              className="font-medium text-amber-600 hover:text-amber-500"
            >
              đăng ký tài khoản mới
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="login-identifier" className="sr-only">
                Tên đăng nhập hoặc Email
              </label>
              <input
                id="login-identifier"
                name="login-identifier"
                type="text"
                autoComplete="username"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                placeholder="Tên đăng nhập hoặc Email"
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
