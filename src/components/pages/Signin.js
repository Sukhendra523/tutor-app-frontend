import React, { useState } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";

import { API } from "../../urlConfig";

const Signin = () => {
  const [mobile, setMobile] = useState(localStorage.getItem("token") || "");
  const [message, setMessage] = useState("");
  const [redirectToVerify, setRedirectToVerify] = useState(false);
  const onClickHanler = async () => {
    try {
      localStorage.setItem("mobile", mobile);
      const res = await Axios.post(`${API}/sendOTP`, { mobile: mobile });
      console.log("res.status:::", res.status, res.data.success);
      if (res.data.success) {
        setRedirectToVerify(true);
      } else {
        setMessage(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (redirectToVerify) {
    return <Redirect to={`/verify`} />;
  }

  if (localStorage.getItem("token")) {
    const user = localStorage.getItem("user");
    const { _id, role } = JSON.parse(user);
    if (role === "student") {
      return <Redirect to={`/s/${_id}`} />;
    }
    if (role === "tutor") {
      return <Redirect to={`/t/${_id}`} />;
    }
    if (role === "admin") {
      return <Redirect to={`/a/${_id}`} />;
    }
  }

  return (
    <div className="w-25 h-55v d-flex flex-column justify-content-evenly align-items-center p-4 text-center m-auto bg-success marginTop-10">
      <div>
        <h1 className="fw-bolder logo-text">Vidyayan</h1>
        <p className="logo-color">let’s get started</p>
      </div>

      <h3 className="">Enter your mobile number to sign in to your account</h3>
      <div className="w-100">
        <input
          type="number"
          className="w-75 text-center border-0 border-bottom-3 border-dark outline-none bg-transparent"
          value={mobile}
          onChange={(event) => setMobile(event.target.value)}
          autoFocus
        />
      </div>
      <div className="w-50  btn btn-primary btn-lg" onClick={onClickHanler}>
        Next
      </div>
    </div>
  );
};

export default Signin;
