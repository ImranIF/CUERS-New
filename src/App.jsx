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
import { useState, useEffect } from "react";
import Status from "./Components/UI/Status";
function App() {
  const options = ["Evaluator", "Chairman of Exam Committee", "Chairman"];
  const [message, setMessage] = useState(null);
  let loggedIn = null;
  // status message
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  function useonLogin(e) {
    // get the data from the user
  }

  return (
    <div className="bg-slate-100 flex flex-col h-screen relative">
      <div>
        <Navbar></Navbar>
      </div>
      <Login onLogin={useonLogin}></Login>
      {/* <div className="h-full w-full flex justify-center items-center overflow-auto"> */}
      {/* <Dashboard></Dashboard> */}
      {/* <div className="p-32 border-2 border-slate-500"></div> */}
      {/* </div> */}
      {message && (
        <div className="absolute bottom-4 left-4">
          <Status variant="d" onClick={(e) => setMessage(null)}>
            {message}
          </Status>
        </div>
      )}
    </div>
  );
}

export default App;
