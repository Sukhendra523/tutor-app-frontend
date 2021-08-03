import React, { useState } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";

import { API } from "../../urlConfig";

const Signin = () => {
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const onClickHanler = async () => {
    try {
      const res = await Axios.post(`${API}/sendOTP`, mobile);
      if (res.status === 200) {
        return <Redirect to={`/verify/:${mobile}`} />;
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
        <p className="logo-color">let’s get started</p>
      </div>

      <h3 className="">Enter your mobile number to sign in to your account</h3>
      <div className="w-100">
        <input
          type="number"
          className="w-75 border-0 border-bottom-3 border-dark outline-none bg-transparent"
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