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
import EvaluatesCourseActivity from "./Components/Dashboard/CEC/EvaluatesCourseActivity";
import ManageSemesterActivity from "./Components/Dashboard/CEC/ManageSemesterActivity";
import ManageEditRequests from "./Components/Dashboard/CEC/ManageEditRequests";
import { Outlet } from "react-router-dom";
import FillActivityBill from "./Components/Dashboard/Chairman/FillActivityBill";
import FormExamCommittee from "./Components/Dashboard/Chairman/FormExamCommittee";
import ManageEvaluators from "./Components/Dashboard/Chairman/ManageEvaluators";
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
          navigate("/dashboard")
          if(logInfoRef.current.role == "Chairman"){
            navigate("/dashboard/chairman");
          }
          else if(logInfoRef.current.role == "Chairman of Exam Committee"){
            navigate("/dashboard/cec")
          }
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
          path="/dashboard"
        ></Route>
        <Route element = {<Dashboard userInfo={logInfoRef.current}></Dashboard>} path = "/dashboard/chairman">
        <Route element = {<FillActivityBill></FillActivityBill>} path = "/dashboard/chairman/fill-activity-bill"></Route>
          <Route element = {<FormExamCommittee></FormExamCommittee>} path = "/dashboard/chairman/form-exam-committee"></Route>
          <Route element = {<ManageEvaluators></ManageEvaluators>} path = "/dashboard/chairman/manage-evaluators"></Route>
        </Route>
        <Route element = {<Dashboard userInfo={logInfoRef.current}></Dashboard>} path = "/dashboard/cec">
          <Route element = {<EvaluatesCourseActivity></EvaluatesCourseActivity>} path = "/dashboard/cec/evaluates-course-activity"></Route>
          <Route element = {<ManageSemesterActivity></ManageSemesterActivity>} path = "/dashboard/cec/manage-semester-activity"></Route>
          <Route element = {<ManageEditRequests></ManageEditRequests>} path = "/dashboard/cec/manage-edit-requests"></Route>
        </Route>
        <Route element={<Login onLogin={onLogin}></Login>} path="/"></Route>
        <Route
          element={<Login onLogin={onLogin}></Login>}
          path="/login"
        ></Route>
      </Routes>
      {/* <div>
        {" "}
        <Outlet></Outlet>
      </div> */}
      {/* <div className="h-full w-full flex justify-center items-center overflow-auto"> */}
      {/* <Dashboard></Dashboard> */}
      {/* <div className="p-32 border-2 border-slate-500"></div> */}
      {/* </div> */}
    </div>
    
  );
}

export default App;
