import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../urlConfig";
import Layout from "../layout";

const StudentDashboard = () => {
  const [tutors, setTutors] = useState("");
  const [student, setStudent] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    const getStudent = async () => {
      const { data } = await axios.get(`${API}/getStudent/${userData._id}`);
      if (data) {
        setStudent(data);
      }
    };
    const getAllTutor = async () => {
      const { data } = await axios.get(`${API}/getAllTutor`);
      if (data) {
        setTutors(data);
      }
    };
    getStudent();
    getAllTutor();
  }, [, message]);

  const sendRequest = async (tutorId) => {
    const res = await axios.post(`${API}/sendRequest`, {
      studentId: student._id,
      tutorId,
    });
    if (res.status === 200) {
      setMessage(res.data.message);
    }
  };

  return (
    <Layout>
      <div>
        <section className="my-4" id="AllTutors">
          <h1>All Tutors</h1>
          <div className="row  justify-content-between align-content-between">
            {tutors &&
              tutors.map((tutor, i) => (
                <div key={i} className="col-sm-4 my-2 d-flex flex-column">
                  <h3 className="bg-logo-color m-0">{`${tutor.user?.firstName}  ${tutor.user?.lastName}`}</h3>
                  <ul className="list-unstyled m-0 py-1 px-3 bg-aliceblue">
                    <li>
                      Highest Qualification:- <span>{tutor.qualification}</span>
                    </li>
                    <li>
                      College:- <span> {tutor.college}</span>
                    </li>
                    <li>
                      Mode of Teaching:- <span>{tutor.modeOfTeaching}</span>
                    </li>
                    <li>
                      Timing:- <span>{tutor.timing}</span>
                    </li>
                    <li>
                      Fee:- <span> {tutor.charges.from}</span>
                    </li>
                    <li>
                      Rating:- <span>4.23/5</span>
                    </li>
                  </ul>
                  <button
                    className="bg-logo-color"
                    onClick={() => sendRequest(tutor._id)}
                  >
                    Send Request
                  </button>
                </div>
              ))}
          </div>
        </section>
        <section className="my-4" id="RequestedTutors">
          <h1>Requested Tutors</h1>
          <div className="row  justify-content-between align-content-between">
            {student?.requestedTutors &&
              student?.requestedTutors.map((tutor, i) => (
                <div key={i} className="col-sm-4 my-2 d-flex flex-column">
                  <h3 className="bg-logo-color m-0">{`${tutor.user.firstName}  ${tutor.user.lastName}`}</h3>
                  <ul className="list-unstyled m-0 py-1 px-3 bg-aliceblue">
                    <li>
                      Highest Qualification:- <span>{tutor.qualification}</span>
                    </li>
                    <li>
                      College:- <span> {tutor.college}</span>
                    </li>
                    <li>
                      Mode of Teaching:- <span>{tutor.modeOfTeaching}</span>
                    </li>
                    <li>
                      Timing:- <span>{tutor.timing}</span>
                    </li>
                    <li>
                      Fee:- <span> {tutor.charges.from}</span>
                    </li>
                    <li>
                      Rating:- <span>4.23/5</span>
                    </li>
                  </ul>
                  <div className=" border-b-o"></div>
                </div>
              ))}
          </div>
        </section>
        <section className="my-4" id="MyTutors">
          <h1>My Tutors</h1>
          <div className="row  justify-content-between align-content-between">
            {student?.tutors &&
              student?.tutors.map((tutor, i) => (
                <div key={i} className="col-sm-4 my-2 d-flex flex-column">
                  <h3 className="bg-logo-color m-0">{`${tutor.user.firstName}  ${tutor.user.lastName}`}</h3>
                  <ul className="list-unstyled m-0 py-1 px-3 bg-aliceblue">
                    <li>
                      Highest Qualification:- <span>{tutor.qualification}</span>
                    </li>
                    <li>
                      College:- <span> {tutor.college}</span>
                    </li>
                    <li>
                      Mode of Teaching:- <span>{tutor.modeOfTeaching}</span>
                    </li>
                    <li>
                      Timing:- <span>{tutor.timing}</span>
                    </li>
                    <li>
                      Fee:- <span> {tutor.charges.from}</span>
                    </li>
                    <li>
                      Rating:- <span>4.23/5</span>
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

export default StudentDashboard;
