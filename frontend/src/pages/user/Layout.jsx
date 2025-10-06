import React from "react";
import { Outlet } from "react-router";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="pt-16 flex flex-col items-center">
        <Outlet />
      </div>
      <Footer/>
    </>
  );
};

export default Layout;
