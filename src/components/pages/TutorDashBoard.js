import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../urlConfig";
import Layout from "../layout";

const TutorDashBoard = () => {
  const [tutor, setTutor] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    const getTutor = async () => {
      const { data } = await axios.get(`${API}/getTutor/${userData._id}`);
      if (data) {
        setTutor(data);
      }
    };

    getTutor();
  }, [, message]);

  const acceptRequest = async (studentId) => {
    const res = await axios.post(`${API}/acceptRequest`, {
      studentId,
      tutorId: tutor._id,
    });
    if (res.status === 200) {
      setMessage(res.data.message);
    }
  };
  const deleteRequest = async (studentId) => {
    const res = await axios.post(`${API}/deleteRequest`, {
      studentId,
      tutorId: tutor._id,
    });
    if (res.status === 200) {
      setMessage(res.data.message);
    }
  };
  return (
    <Layout>
      <div>
        <section id="studentRequest" className="my-4">
          <h1>Student Requests</h1>
          <div className="row  justify-content-between align-content-between">
            {tutor?.studentRequests &&
              tutor?.studentRequests.map((student, i) => (
                <div key={i} className="col-sm-4 my-2 d-flex flex-column">
                  <h3 className="bg-logo-color m-0">{`${student.user?.firstName}  ${student.user?.lastName}`}</h3>
                  <ul className="list-unstyled m-0 py-1 px-3 bg-aliceblue">
                    <li>
                      Class:- <span>{student.class.name}</span>
                    </li>
                    <li>
                      Stream:- <span> {student.stream.name}</span>
                    </li>
                    <li>
                      Board:- <span>{student.board?.name}</span>
                    </li>
                    <li>
                      City:- <span>{student.user?.city}</span>
                    </li>
                    <li>
                      Pin Code:- <span> {student.user?.pincode}</span>
                    </li>
                  </ul>

                  <div className="d-flex p-2 bg-aliceblue justify-content-between">
                    <button
                      className="bg-logo-color rounded-pill"
                      onClick={() => acceptRequest(student._id)}
                    >
                      Accept Request
                    </button>
                    <button
                      className="bg-logo-color rounded-pill"
                      onClick={() => deleteRequest(student._id)}
                    >
                      Delete Request
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </section>
        <section id="students" className="my-4">
          <h1>My Students</h1>
          <div className="row justify-content-between align-content-between">
            {tutor?.students &&
              tutor?.students.map((student, i) => (
                <div key={i} className="col-sm-4 my-2 d-flex flex-column">
                  <h3 className="bg-logo-color m-0">{`${student.user.firstName}  ${student.user.lastName}`}</h3>
                  <ul className="list-unstyled m-0 py-1 px-3 bg-aliceblue">
                    <li>
                      Class:- <span>{student.class.name}</span>
                    </li>
                    <li>
                      Stream:- <span> {student.stream.name}</span>
                    </li>
                    <li>
                      Board:- <span>{student.board.name}</span>
                    </li>
                    <li>
                      City:- <span>{student.user.city}</span>
                    </li>
                    <li>
                      Pin Code:- <span> {student.user.pincode}</span>
                    </li>
                  </ul>

                  <div className=" border-b-o"></div>
                </div>
              ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default TutorDashBoard;
