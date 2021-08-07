import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const Header = () => {
  const [redirect, setRedirect] = useState(false);
  const logOut = () => {
    localStorage.clear();
    setRedirect(true);
  };
  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <header className=" d-flex justify-content-between fixed-top px-4 bg-logo-color-2">
      <h1>Vidyayan</h1>
      <button className="p-2 bg-transparent border-0" onClick={logOut}>
        <h1>Log Out</h1>
      </button>
    </header>
  );
};

export default Header;
