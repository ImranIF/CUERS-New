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
    // console.log(e);
    loggedIn = e.target[0].value;
    console.log(loggedIn);
  }

  return (
    <div className="bg-slate-100 flex flex-col h-screen">
      <div>
        <Navbar></Navbar>
      </div>
        {/* <Login onLogin={onLogin}></Login> */}
      {/* <div className="h-full w-full flex justify-center items-center overflow-auto"> */}
        <Dashboard></Dashboard>
        {/* <div className="p-32 border-2 border-slate-500"></div> */}
      {/* </div> */}
    </div>
  );
}

export default App;
