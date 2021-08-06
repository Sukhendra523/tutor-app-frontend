import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { API } from "../../urlConfig";

const RegisterStudent = () => {
  const [classes, setClasses] = useState([]);
  const [boards, setBoards] = useState([]);
  const [streams, setStreams] = useState([]);
  const [subject, setSubjects] = useState([]);
  const [classId, setClassId] = useState("");
  const [boardId, setBoardId] = useState("");
  const [streamId, setStreamId] = useState("");
  const [message, setMessage] = useState("");
  const { userId } = useParams("");
  const [redirectToDashBoard, setRedirectToDashBoard] = useState(false);

  useEffect(async () => {
    var { data } = await Axios.get(`${API}/classes`);
    data && setClasses(data);
    var { data } = await Axios.get(`${API}/boards`);
    data && setBoards(data);
    var { data } = await Axios.get(`${API}/streams`);
    data && setStreams(data);
    var { data } = await Axios.get(`${API}/subjects`);
    data && setSubjects(data);
  }, []);

  const RegisterStudentHandler = async () => {
    const student = {
      userId,
      classId,
      boardId,
      streamId,
    };
    try {
      const res = await Axios.post(`${API}/registerStudent`, student);
      if (res.status === 201) {
        localStorage.setItem("student", JSON.stringify(res.data));
        setRedirectToDashBoard(true);
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
  return (
    <form className="w-50 h-75v d-flex flex-column  justify-content-evenly align-items-center  p-4 text-center m-auto bg-success marginTop-6">
      <div>
        <h1 className="fw-bolder logo-text">Vidyayan</h1>
        <p className="logo-color">let’s get started</p>
      </div>
      <h4>Select Your Class</h4>

      <div
        className="row w-100 my-2 justify-content-between btn-group "
        role="group"
        aria-label="Basic radio toggle button group"
      >
        {classes &&
          classes.map(({ _id, name }, i) => (
            <div key={i} className="col-sm-3 mb-2">
              <input
                type="radio"
                className="btn-check"
                name="class"
                id={name}
                value={_id}
                onChange={(e) => setClassId(e.target.value)}
                autocomplete="off"
              />
              <label className="w-50 btn btn-outline-primary" for={name}>
                {name}
              </label>
            </div>
          ))}
      </div>
      <h4>Select Your Board</h4>
      <div
        className="row w-100 my-2 justify-content-between btn-group "
        role="group"
        aria-label="Basic radio toggle button group"
      >
        {boards &&
          boards.map(({ _id, name }, i) => (
            <div key={i} className="col-sm-3 mb-2">
              <input
                type="radio"
                className="btn-check"
                name="board"
                id={name}
                value={_id}
                onChange={(e) => setBoardId(e.target.value)}
                autocomplete="off"
              />
              <label className="w-50 btn btn-outline-primary" for={name}>
                {name}
              </label>
            </div>
          ))}
      </div>
      <h4>Select Your Stream</h4>
      <div
        className="row w-100 my-2 justify-content-between btn-group "
        role="group"
        aria-label="Basic radio toggle button group"
      >
        {streams &&
          streams.map(({ _id, name }, i) => (
            <div key={i} className="col-sm-3 mb-2">
              <input
                type="radio"
                className="btn-check"
                name="stream"
                id={name}
                value={_id}
                onChange={(e) => setStreamId(e.target.value)}
                autocomplete="off"
              />
              <label className="w-50 btn btn-outline-primary" for={name}>
                {name}
              </label>
            </div>
          ))}
      </div>

      <div
        className="w-50  btn btn-primary btn-lg"
        onClick={RegisterStudentHandler}
      >
        Submit
      </div>
    </form>
  );
};

export default RegisterStudent;
