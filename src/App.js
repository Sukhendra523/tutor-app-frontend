import "./App.css";
import { React, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signin from "./components/pages/Signin";
import Verify from "./components/pages/Verify";
import Register from "./components/pages/Register";
import RegisterStudent from "./components/pages/RegisterStudent";
import RegisterTutor from "./components/pages/RegisterTutor";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* <PrivateRoute path="/" exact component={MeetingsList} /> */}
          <Route path="/signin" component={Signin} />
          <Route path="/verify/:mobile" component={Verify} />
          <Route path="/register/:mobile" component={Register} />
          <Route path="/registerStudent/:userId" component={RegisterStudent} />
          <Route path="/registerTutor/:userId" component={RegisterTutor} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
