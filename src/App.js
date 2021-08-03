import "./App.css";
import { React, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signin from "./components/pages/Signin";
import Verify from "./components/pages/Verify";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* <PrivateRoute path="/" exact component={MeetingsList} /> */}
          <Route path="/signin" component={Signin} />
          <Route path="/verify/:mobile" component={Verify} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
