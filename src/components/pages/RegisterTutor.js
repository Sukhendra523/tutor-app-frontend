import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { API } from "../../urlConfig";

const RegisterTutor = () => {
  const [classes, setClasses] = useState([]);
  const [boards, setBoards] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [qualification, setQualification] = useState("");
  const [status, setStatus] = useState("");
  const [college, setCollege] = useState("");
  const [modeOfTeaching, setModeOfTeaching] = useState("");
  const [language, setLanguage] = useState("");
  const [classId, setClassId] = useState("");
  const [boardId, setBoardId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [timing, setTiming] = useState("");
  const [occupation, setOccupation] = useState("");
  const [chargesFrom, setChargesFrom] = useState("");
  const [chargesTo, setChargesTo] = useState("");

  const [message, setMessage] = useState("");
  const { userId } = useParams();
  const [redirectToDashBoard, setRedirectToDashBoard] = useState(false);

  const qualifications = [
    "BA",
    "MA",
    "BE",
    "ME",
    "B.Tech",
    "M.Tech",
    "B.Sc",
    "M.Sc",
    "BCA",
    "MCA",
    "BBA",
    "MBA",
    "B.Arch",
    "MBBS",
    "MD",
    "BDS",
    "MDS",
    "BPT",
    "B.Pharm",
    "M.Pharm",
    "B.Com",
    "M.Com",
    "CA",
  ];
  const timings = [
    "6-7am",
    "7-8am",
    "8-9am",
    "9-10am",
    "10-11am",
    "11-12pm",
    "12-1pm",
    "1-2pm",
    "2-3pm",
    "3-4pm",
    "4-5pm",
    "5-6pm",
    "6-7pm",
    "7-8pm",
  ];
  const occupations = [
    "Full-Time Teacher",
    "Freelancer",
    "Working Professional",
    "College Student",
    "Not Working",
    "Other",
  ];

  useEffect(async () => {
    var { data } = await Axios.get(`${API}/classes`);
    data && setClasses(data);
    var { data } = await Axios.get(`${API}/boards`);
    data && setBoards(data);
    var { data } = await Axios.get(`${API}/subjects`);
    data && setSubjects(data);
  }, []);

  const RegisterTutorHandler = async () => {
    const Tutor = {
      qualification,
      status,
      college,
      modeOfTeaching,
      language,
      userId,
      classId,
      boardId,
      subjectId,
      timing,
      occupation,
      charges: { from: chargesFrom, to: chargesTo },
    };

    try {
      const token = localStorage.getItem("token");
      const res = await Axios.post(`${API}/registerTutor`, Tutor, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 201) {
        localStorage.setItem("Tutor", JSON.stringify(res.data));
        setRedirectToDashBoard(true);
      }
      if (res.status === 400) {
        setMessage(res.data.message);
        console.log("Message", message);
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
  return (
    <div className="w-50 h-60v d-flex flex-column  justify-content-evenly  p-4 text-center m-auto bg-success marginTop-10">
      {message && <h1 className="text-center text-danger">{message}</h1>}
      <div className="row justify-content-around ">
        <div className="col-sm-6">
          <select
            required
            value={qualification}
            className="w-100 px-4 py-2"
            onChange={(e) => {
              setQualification(e.target.value);
            }}
          >
            <option value="" selected disabled hidden>
              Highest Qualification
            </option>
            {qualifications.map((qualification) => (
              <option value={qualification}>{qualification}</option>
            ))}
          </select>
        </div>
        <div className="col-sm-6">
          <select
            required
            value={status}
            className="w-100 px-4 py-2"
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            <option value="" selected disabled hidden>
              Status
            </option>
            <option value="Completed">Completed</option>
            <option value="Pursuing">Pursuing</option>
          </select>
        </div>
      </div>
      <div className="row justify-content-around">
        <div className="col-sm-12">
          <input
            required={true}
            type="text"
            className="w-100 px-4 py-2"
            value={college}
            onChange={(e) => {
              setCollege(e.target.value);
            }}
            placeholder="College Name"
          />
        </div>
      </div>
      <div className="row justify-content-around">
        <div className="col-sm-6">
          <select
            required
            value={modeOfTeaching}
            className="w-100 px-4 py-2"
            onChange={(e) => {
              setModeOfTeaching(e.target.value);
            }}
          >
            <option value="" selected disabled hidden>
              Mode of Teaching
            </option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
        <div className="col-sm-6">
          <select
            required
            value={language}
            className="w-100 px-4 py-2"
            onChange={(e) => {
              setLanguage(e.target.value);
            }}
          >
            <option value="" selected disabled hidden>
              Language
            </option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
            <option value="Both">Both</option>
          </select>
        </div>
      </div>

      <div className="row justify-content-around">
        <div className="col-sm-6">
          <select
            required
            value={classId}
            className="w-100 px-4 py-2"
            onChange={(e) => {
              setClassId(e.target.value);
            }}
          >
            <option value="" selected disabled hidden>
              Class
            </option>
            {classes.map(({ _id, name }) => (
              <option value={_id}>{name}</option>
            ))}
          </select>
        </div>
        <div className="col-sm-6">
          <select
            required={true}
            value={subjectId}
            className="w-100 px-4 py-2"
            onChange={(e) => {
              setSubjectId(e.target.value);
            }}
          >
            <option value="" selected disabled hidden>
              Subject
            </option>
            {subjects.map(({ _id, name }) => (
              <option value={_id}>{name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row justify-content-around">
        <div className="col-sm-12">
          <select
            required
            value={boardId}
            className="w-100 px-4 py-2"
            onChange={(e) => {
              setBoardId(e.target.value);
            }}
          >
            <option value="" selected disabled hidden>
              Board
            </option>
            {boards.map(({ _id, name }) => (
              <option value={_id}>{name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row justify-content-around">
        <div className="col-sm-6">
          <select
            required
            value={timing}
            className="w-100 px-4 py-2"
            onChange={(e) => {
              setTiming(e.target.value);
            }}
          >
            <option value="">Timing</option>
            {timings.map((timing) => (
              <option value={timing}>{timing}</option>
            ))}
          </select>
        </div>
        <div className="col-sm-6">
          <select
            required
            value={occupation}
            className="w-100 px-4 py-2"
            onChange={(e) => {
              setOccupation(e.target.value);
            }}
          >
            <option value="" selected disabled hidden>
              Occupation
            </option>
            {occupations.map((occupation) => (
              <option value={occupation}>{occupation}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row justify-content-around">
        <div className="d-flex justify-content-around">
          <big>Charges:- </big>
          <span>From</span>

          <input
            type="text"
            className="w-25 px-4 py-2"
            value={chargesFrom}
            onChange={(e) => {
              setChargesFrom(e.target.value);
            }}
            placeholder=""
          />
          <span>To</span>
          <input
            type="text"
            className="w-25 px-4 py-2"
            value={chargesTo}
            onChange={(e) => {
              setChargesTo(e.target.value);
            }}
            placeholder=""
          />
        </div>
      </div>
      <div
        className="w-50 mx-auto  btn btn-primary btn-lg"
        onClick={RegisterTutorHandler}
      >
        Submit
      </div>
    </div>
  );
};

export default RegisterTutor;
