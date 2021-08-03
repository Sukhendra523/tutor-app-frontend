import React, { useState } from "react";
import Axios from "axios";
import { Link, Redirect, useParams } from "react-router-dom";
import OtpInput from "react-otp-input";

import { API } from "../../urlConfig";

const Verify = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const { mobile } = useParams();

  const onClickHanler = async () => {
    try {
      const res = await Axios.post(`${API}/signin`, { mobile, code });
      if (res.status === 200) {
        const { token, user } = res.data;
        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          return <Redirect to="/" />;
        } else {
          return <Redirect to={`/register/:${mobile}`} />;
        }
      } else {
        setMessage(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-50 h-55v d-flex flex-column justify-content-evenly align-items-center p-4 text-center m-auto bg-success marginTop-10">
      <div>
        <h1 className="fw-bolder logo-text">Vidyayan</h1>
        <p className="logo-color">Let's gain together</p>
      </div>

      <h3 className="">
        Please Enter OTP sent to you mobile XXXXXXX{mobile.toString().slice(-3)}{" "}
        <span className="logo-color">EDIT</span>
      </h3>
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
      <div className="w-50  btn btn-primary btn-lg" onClick={onClickHanler}>
        Verify and Proceed
      </div>
    </div>
  );
};

export default Verify;
