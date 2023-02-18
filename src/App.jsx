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

import Chairman from "./Components/Dashboard/Chairman/Chairman";
import CEC from "./Components/Dashboard/CEC/CEC";
import EvaluatesCourseActivity from "./Components/Dashboard/CEC/EvaluatesCourseActivity";
import ManageSemesterActivity from "./Components/Dashboard/CEC/ManageSemesterActivity";
import ManageEditRequests from "./Components/Dashboard/CEC/ManageEditRequests";
import { Outlet } from "react-router-dom";
import FillActivityBill from "./Components/Dashboard/Chairman/FillActivityBill";
import FormExamCommittee from "./Components/Dashboard/Chairman/FormExamCommittee";
import ManageEvaluators from "./Components/Dashboard/Chairman/ManageEvaluators";
import Status from "./Components/UI/Status";
import { useEffect } from "react";
import PrivateOutlet from "./Components/Login/PrivateOutlet";
function App() {
  const navigate = useNavigate();
  // status message
  const [message, setMessage] = useState(null);
  const [tologin, setToLogin] = useState(false);
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);
  const setStatus = (message) => {
    setMessage(message);
  };

  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const logInfoRef = useRef({
    role: "",
    evaluator_id: "",
    password: "",
  });
  useEffect(() => {
    if (tologin) {
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
            console.log(isAuthenticated);
            setAuthenticated(true);
            setToLogin(false);
            setLoading(false);
            setStatus(["s", "User Authenticated!"]);
            // navigate("/dashboard");
            if (logInfoRef.current.role == "Chairman") {
              navigate("/dashboard/chairman");
            } else if (logInfoRef.current.role == "Chairman of Exam Committee") {
              navigate("/dashboard/cec");
            }
          } else {
            let error = data.msg;
            // setToLogin(true);
            setStatus(["d", error + ". Try again!"]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      setToLogin(false);
    }
  }, [tologin]);
  function onLogin(e) {
    // console.log(e);

    logInfoRef.current.role = e.target[0].value;
    logInfoRef.current.evaluator_id = e.target[1].value;
    logInfoRef.current.password = e.target[2].value;
    setToLogin(true);

  }
  //if(isLoading) return <h1>Loading</h1>
  return (
    <div className="bg-slate-100 flex flex-col h-screen relative">
      <div>
        <Navbar></Navbar>
      </div>
      {/* <Router> */}
      {/* <Routes>
          <Route
            element={
              <PrivateRoutes isAuthenticated={isAuthenticated}></PrivateRoutes>
            }
          >
            <Route element={<Dashboard></Dashboard>} path="/dashboard" />
          </Route>
          <Route element={<Login onLogin={onLogin} />} path="/login" />
          <Route element={<Login onLogin={onLogin} />} path="/" />
        </Routes> */}
      {/* </Router> */}
      <Routes>
        <Route
          element={<Login onLogin={onLogin}></Login>}
          path="/login"
        ></Route>
        <Route path="/*" element={<PrivateOutlet isAuthenticated={isAuthenticated} />}>
          <Route
            element={<Dashboard userInfo={logInfoRef.current}></Dashboard>}
            path="dashboard/chairman"
          >
            {/* <Route
              element={<Chairman/>}
              path="chairman"
            > */}
            <Route
              element={<FillActivityBill></FillActivityBill>}
              path="fill-activity-bill"
            ></Route>
            <Route
              element={<FormExamCommittee></FormExamCommittee>}
              path="form-exam-committee"
            ></Route>
            <Route
              element={<ManageEvaluators></ManageEvaluators>}
              path="manage-evaluators"
            ></Route>
          </Route>
          <Route
            element={<Dashboard userInfo={logInfoRef.current}></Dashboard>}
            path="dashboard/cec"
          >
            <Route
              element={<EvaluatesCourseActivity></EvaluatesCourseActivity>}
              path="evaluates-course-activity"
            ></Route>
            <Route
              element={<ManageSemesterActivity></ManageSemesterActivity>}
              path="manage-semester-activity"
            ></Route>
            <Route
              element={<ManageEditRequests></ManageEditRequests>}
              path="manage-edit-requests"
            ></Route>
          </Route>
        </Route>
        {/* </Route> */}
        <Route element={<Login onLogin={onLogin}></Login>} path="/"></Route>

      </Routes>
      {/* <div>
        {" "}
        <Outlet></Outlet>
      </div> */}
      {/* <div className="h-full w-full flex justify-center items-center overflow-auto"> */}
      {/* <Dashboard></Dashboard> */}
      {/* <div className="p-32 border-2 border-slate-500"></div> */}
      {/* </div> */}
      {
        message && (
          <div className="absolute bottom-4 right-4">
            <Status variant={message[0]} onClick={(e) => setMessage(null)}>
              {message[1]}
            </Status>
          </div>
        )
      }
    </div >
  );
}

export default App;
