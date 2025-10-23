import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./pages/user/layout";
import HomePage from "./pages/user/home";
import About from "./pages/user/about";
import Product from "./pages/user/product";
import Login from "./pages/user/login";
import Contact from "./pages/user/contact";
import ScrollToTop from "./components/ScollToTop";
import LayoutAdmin from "./pages/admin/Layout";
import ProductManagement from "./pages/admin/product";
import ProductDetail from "./pages/user/product-detail";
import AdminHome from "./pages/admin/home";
import ManagementPage from "./pages/admin/management";
import ProtectedRoute from "./context/ProtectedRoute";
import Cart from "./pages/user/cart";
import Checkout from "./pages/user/checkout";
import Register from "./pages/user/login/Register";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./slice/authSlice";
import UserManagementPage from "./pages/admin/users";
import OrderManagementPage from "./pages/admin/order";
import Setting from "./pages/admin/setting";
import AccountPage from "./pages/user/login/AccountPage";
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            dispatch(setUser(data.user));
          }
        });
    }
  }, [dispatch, user]);
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="product" element={<Product />} />
          <Route path="product-detail/:productId" element={<ProductDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route index element={<AdminHome />} />
            <Route path="product" element={<ProductManagement />} />
            <Route path="management" element={<ManagementPage />} />
            <Route path="users" element={<UserManagementPage />} />
            <Route path="order" element={<OrderManagementPage />} />
            <Route path="setting" element={<Setting />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
