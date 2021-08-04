import Axios from "axios";
import React, { useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { API } from "../../urlConfig";

const Register = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [fatherFirstName, setFatherFirstName] = useState();
  const [fatherLastName, setFatherLastName] = useState();
  const [gender, setGender] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [pincode, setPincode] = useState();
  const [message, setMessage] = useState("");
  const [redirectTo, setRedirectTo] = useState(false);

  const { mobile } = useParams();

  const registerUser = async (event, role) => {
    const userData = {
      mobile: parseInt(mobile),
      firstName,
      lastName,
      fatherFirstName,
      fatherLastName,
      gender,
      dateOfBirth,
      email,
      address,
      city,
      pincode,
      role,
    };
    try {
      const res = await Axios.post(`${API}/registerUser`, userData);
      console.log("res.status:::", res.status, redirectTo, res.data.success);
      if (res.data.success) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setRedirectTo(true);
        console.log("RedirectTO", redirectTo);
      } else {
        setMessage(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log("Redirect", redirectTo);

  if (redirectTo) {
    const user = localStorage.getItem("user");
    const { _id, role } = JSON.parse(user);
    console.log("user", JSON.parse(user));
    console.log("role ", role, role === "student");
    if (role === "student") {
      return <Redirect to={`/registerStudent/${_id}`} />;
    }
    if (role === "tutor") {
      return <Redirect to={`/registerTutor/${_id}`} />;
    }
  }

  return (
    <div className="w-50 h-60v d-flex flex-column  justify-content-evenly  p-4 text-center m-auto bg-success marginTop-10">
      <div className="row justify-content-around ">
        <div className="col-sm-6">
          <input
            type="text"
            className="w-100 px-4 py-2"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder="First Name"
          />
        </div>
        <div className="col-sm-6">
          <input
            type="text"
            className="w-100 px-4 py-2"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder="Last Name"
          />
        </div>
      </div>
      <div className="row justify-content-around">
        <div className="col-sm-6">
          <input
            type="text"
            className="w-100 px-4 py-2"
            value={fatherFirstName}
            onChange={(e) => {
              setFatherFirstName(e.target.value);
            }}
            placeholder="Father's First Name"
          />
        </div>
        <div className="col-sm-6">
          <input
            type="text"
            className="w-100 px-4 py-2"
            value={fatherLastName}
            onChange={(e) => {
              setFatherLastName(e.target.value);
            }}
            placeholder="Father's Last Name"
          />
        </div>
      </div>
      <div className="row justify-content-around">
        <div className="col-sm-6">
          <select
            value={gender}
            className="w-100 px-4 py-2"
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            <option value="Gender" hidden>
              Gender
            </option>
            <option value="Male" onChange>
              Male
            </option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="col-sm-6">
          <input
            type="text"
            placeholder="Date of birth"
            onFocus={(e) => {
              e.target.type = "date";
            }}
            onBlur={(e) => {
              e.target.type = "date";
            }}
            className="w-100 px-4 py-2"
            value={dateOfBirth}
            onChange={(e) => {
              setDateOfBirth(e.target.value);
            }}
            placeholder="Date Of Birth"
          />
        </div>
      </div>
      <div className="row justify-content-around">
        <div className="col-sm-12">
          <input
            type="text"
            className="w-100 px-4 py-2"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder={"Email Address"}
          />
        </div>
      </div>
      <div className="row justify-content-around">
        <div className="col-sm-12">
          <input
            type="text"
            className="w-100 px-4 py-2"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            placeholder="Address"
          />
        </div>
      </div>
      <div className="row justify-content-around">
        <div className="col-sm-6">
          <input
            type="text"
            className="w-100 px-4 py-2"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            placeholder="city"
          />
        </div>
        <div className="col-sm-6">
          <input
            type="number"
            className="w-100 px-4 py-2"
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value);
            }}
            placeholder="Pincode"
          />
        </div>
      </div>
      <div className="row justify-content-around">
        <div className="col-sm-6">
          <button
            className="btn btn-sm btn-primary p-2"
            onClick={(event) => registerUser(event, "student")}
          >
            Register As Student
          </button>
        </div>
        <div className="col-sm-6">
          <button
            className="btn btn-sm btn-primary p-2"
            onClick={(event) => registerUser(event, "teacher")}
          >
            Register As Tutor
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
