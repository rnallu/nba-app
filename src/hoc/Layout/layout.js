import React from "react";

import "./layout.css";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";

const Layout = props => {
  return (
    <div>
      <Header {...props} />
      {props.children}
      <Footer />
    </div>
  );
};
export default Layout;
