import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
}

const Layout = (props: Props) => {
  //

  return (
    <>
      <Navbar />
      {props?.children}
      <Footer />
    </>
  );
};

export default Layout;
