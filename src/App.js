import "./App.css";
import { React, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signin from "./components/pages/Signin";
import Verify from "./components/pages/Verify";
import Register from "./components/pages/Register";
import RegisterStudent from "./components/pages/RegisterStudent";
import RegisterTutor from "./components/pages/RegisterTutor";
import StudentDashboard from "./components/pages/StudentDashboard";
import TutorDashBoard from "./components/pages/TutorDashBoard";
import PrivateRoute from "./components/HOC/PrivateRoute";
import RegisterPrivateRoute from "./components/HOC/RegisterPrivateRoute";
import StudentRoute from "./components/HOC/StudentRoute";
import TutorRoute from "./components/HOC/TutorRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Signin} />
          <Route path="/verify" component={Verify} />
          <RegisterPrivateRoute path="/register" component={Register} />
          <PrivateRoute
            path="/registerStudent/:userId"
            component={RegisterStudent}
          />
          <PrivateRoute
            path="/registerTutor/:userId"
            component={RegisterTutor}
          />
          <StudentRoute path="/s/:userId" component={StudentDashboard} />
          <TutorRoute path="/t/:userId" component={TutorDashBoard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
