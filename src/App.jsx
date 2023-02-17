import React, { useRef, useState } from "react";
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
import PrivateRoutes from "./Components/Login/PrivateRoutes";
import Chairman from "./Components/Dashboard/Chairman/Chairman";
import CEC from "./Components/Dashboard/CEC/CEC";
function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setAuthenticated] = useState(false);
  const logInfoRef = useRef({
    role: "",
    evaluator_id: "",
    password: "",
  });
  function onLogin(e) {
    // console.log(e);

    logInfoRef.current.role = e.target[0].value;
    logInfoRef.current.evaluator_id = e.target[1].value;
    logInfoRef.current.password = e.target[2].value;

    fetch("http://localhost:3000/users/authenticatelogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logInfoRef.current),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.msg === "Correct Password") {
          setAuthenticated(true);
          console.log(logInfoRef.current.role);
           navigate('dashboard');
          // if (logInfoRef.current.role == "Chairman") {

          //   navigate("/dashboard/chairman");
          // } else if (logInfoRef.current.role == "Chairman of Exam Committee") {
          //   //navigate("/dashboard/cec");
          // }
        } else {
          let error = data.msg;
          alert(error);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="bg-slate-100 flex flex-col h-screen">
      <div>
        <Navbar></Navbar>
      </div>
      <Routes>
        <Route
          element={<Login onLogin={onLogin}></Login>}
          path="/"></Route>
        <Route
          element={<Dashboard userInfo={logInfoRef.current}></Dashboard>}
          path="dashboard"
        >
          {/* <Route element={<CEC />} path="cec"></Route>
          <Route
            element={<Chairman />}
            path="chairman"
          ></Route> */}
        </Route>
        <Route
          element={<Login onLogin={onLogin}></Login>}
          path="/login"
        ></Route>
      </Routes>


      {/* <div className="h-full w-full flex justify-center items-center overflow-auto"> */}
      {/* <Dashboard></Dashboard> */}
      {/* <div className="p-32 border-2 border-slate-500"></div> */}
      {/* </div> */}
    </div >
  );
}

export default App;
