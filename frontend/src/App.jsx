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
import Order from "./pages/admin/order";
import ManagementPage from "./pages/admin/management";
import AdminLogin from "./pages/admin/login";
import AdminProtectedRoute from "./context/AdminProtectedRoute";
function App() {
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
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route index element={<AdminHome />} />
            <Route path="product" element={<ProductManagement />} />
            <Route path="management" element={<ManagementPage />} />
            <Route path="order" element={<Order />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
