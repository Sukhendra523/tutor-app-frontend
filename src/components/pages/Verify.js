import React, { useState } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import OtpInput from "react-otp-input";

import { API } from "../../urlConfig";

const Verify = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const mobile = localStorage.getItem("mobile");
  const [redirectToDashBoard, setRedirectToDashBoard] = useState(false);
  const [redirectToRegisterUser, setRedirectToRegisterUser] = useState(false);

  const onClickHanler = async () => {
    try {
      const res = await Axios.post(`${API}/signin`, { mobile, code });
      if (res.status === 200) {
        const { token, user, mobileAuthToken } = res.data;
        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          setRedirectToDashBoard(true);
        }
        if (mobileAuthToken) {
          localStorage.setItem("mobileAuthToken", mobileAuthToken);
          setRedirectToRegisterUser(true);
        }
      } else {
        setMessage(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (redirectToDashBoard) {
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
  if (redirectToRegisterUser) {
    return <Redirect to={`/register`} />;
  }

  if (localStorage.getItem("token")) {
    const user = localStorage.getItem("user");
    const { _id, role } = JSON.parse(user);
    if (role === "Tutor") {
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
        <p className="logo-color">Let's gain together</p>
      </div>

      <h5 className="">
        Please Enter OTP sent to you mobile XXXXXXX{mobile.toString().slice(-3)}{" "}
        <Link to="/">
          <span className="logo-color">EDIT</span>
        </Link>
      </h5>
      <div className="w-100 d-flex justify-content-center">
        <OtpInput
          value={code}
          onChange={(code) => setCode(code)}
          numInputs={4}
          separator={<span style={{ width: "8px" }}></span>}
          isInputNum={true}
          shouldAutoFocus={true}
          inputStyle={{
            border: "1px solid transparent",
            borderRadius: "8px",
            width: "54px",
            height: "54px",
            fontSize: "12px",
            color: "#000",
            fontWeight: "400",
            caretColor: "blue",
          }}
          focusStyle={{
            border: "1px solid #CFD3DB",
            outline: "none",
          }}
        />
      </div>
      <h3 className="logo-color">Resend OTP</h3>
      <div className="w-75  btn btn-primary btn-lg" onClick={onClickHanler}>
        Verify and Proceed
      </div>
    </div>
  );
};

export default Verify;
