import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./component/Home/Header.jsx";
import Footer from "./component/Home/Footer.jsx";

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
