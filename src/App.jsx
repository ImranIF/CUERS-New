import React, { useState } from "react";
import Navbar from "./Components/UI/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCarBattery,
  faLeftRight,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faNode } from "@fortawesome/free-brands-svg-icons";
import { Login } from "./Components/Login/Login";
import Buttoncmp from "./Components/UI/Buttoncmp";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import Inputcmp from "./Components/UI/Inputcmp";
import Dashboard from "./Components/Dashboard/Dashboard";
import Table from "./Components/UI/Table";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import PrivateRoutes from "./Components/Login/PrivateRoutes";
// import PrivateRoutes from "./Components/Login/PrivateRoutes/PrivateRoutes";
function App() {

  const options = ["Evaluator", "Chairman of Exam Committee", "Chairman"];
  let loggedIn = null;
  const [isAuthenticated, setAuthenticated] = useState(false);







  function onLogin(e) {
    // console.log(e);

    const role = e.target[0].value;
    const evaluator_id = e.target[1].value;
    const password = e.target[2].value;
    const logInfo = { role: role, evaluator_id: evaluator_id, password: password };
    console.log(logInfo);


    fetch("http://localhost:3000/users/authenticatelogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.msg === "Correct Password") {
          setAuthenticated(true);
          alert(data.msg);
        }
        else {
          let error = data.msg;
          alert(error);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <div className="bg-slate-100 flex flex-col h-screen">
      <div>
        <Navbar></Navbar>
      </div>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} />}>
            {/* <Route element={<Login />} path="/" exact /> */}
            <Route element={<Dashboard />} path="/dashboard" />
          </Route>
          <Route element={<Login onLogin={onLogin} />} path="/" />
        </Routes>
      </Router>

      {/* <div className="h-full w-full flex justify-center items-center overflow-auto"> */}
      {/* <Dashboard></Dashboard> */}
      {/* <div className="p-32 border-2 border-slate-500"></div> */}
      {/* </div> */}
    </div>
  );
}

export default App;
