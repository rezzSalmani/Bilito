import React, { useEffect } from "react";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import { Toaster } from "react-hot-toast";
const Layout = () => {
  useEffect(() => {
    //   scroll to the top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Toaster />
      <Header />
      <body>
        <Outlet />
      </body>
      <Footer />
    </div>
  );
};

export default Layout;
