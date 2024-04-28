import React, { useState } from "react";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import { Toaster } from "react-hot-toast";
const Layout = () => {
  return (
    <div className=''>
      <Toaster />
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
