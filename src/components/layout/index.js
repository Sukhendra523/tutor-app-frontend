import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = (props) => {
  return (
    <div>
      <Header />
      <div className="position-relative top-56">
        <div className="row justify-content-evenly">
          <Sidebar />
          <div className="col-sm-8 right-container bg-gray pt-3 px-5">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
