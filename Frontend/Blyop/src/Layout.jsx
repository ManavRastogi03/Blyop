import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./component/User/Home/Header.jsx";
import Footer from "./component/User/Home/Footer.jsx";

export default function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
}
