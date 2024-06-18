import React, { useEffect } from "react";
import Header from "../header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../footer/Footer";
import { Toaster } from "react-hot-toast";
const Layout = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Toaster position='top-left' reverseOrder={true} />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
