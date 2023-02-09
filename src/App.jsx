import React from "react";
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
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function App() {
  const options = ["Evaluator", "Chairman of Exam Committee", "Chairman"];
  let loggedIn = null;
  function onLogin(e) {
    // const navigate = useNavigate();
    console.log(e);
    loggedIn = e.target[0].value;
    console.log(loggedIn);
    // navigate("/Dashboard");
  }

  return (
    <div className="h-min bg-slate-100">
      <Navbar></Navbar>
      <div className="mt-14 ">
        {/* <Login onLogin={onLogin}></Login> */}
      </div>
      <Dashboard></Dashboard>
    </div>
  );
}

export default App;
