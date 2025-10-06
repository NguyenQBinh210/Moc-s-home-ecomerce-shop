import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./pages/user/layout";
import HomePage from "./pages/user/home";
import About from "./pages/user/about";
import Product from "./pages/user/product";
import Login from "./pages/user/login";
import Contact from "./pages/user/contact";
import ScrollToTop from "./components/ScollToTop";

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
