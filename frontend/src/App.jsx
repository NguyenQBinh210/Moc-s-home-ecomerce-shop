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
import AdminHome from "./pages/admin/home";
import Order from "./pages/admin/order";
import ManagementPage from "./pages/admin/management";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<About />} />
            <Route path="product" element={<Product />} />
            <Route path="contact" element={<Contact />} />
            <Route path="product-detail" element={<div>ProductDetail</div>} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="/admin" element={<LayoutAdmin />} >
            <Route index element={<AdminHome />} />
            <Route path="product" element={<ProductManagement />} />
            <Route path="management" element={<ManagementPage />} />
            <Route path="order" element={<Order/>} />
          </Route>
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
