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
import Evaluator from "./Components/Dashboard/Evaluator/Evaluator";
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
import { StatusContext } from "./Components/UI/StatusContext";
import ViewBillForm from "./Components/Dashboard/Evaluator/ViewBillForm";
import CourseInSemesterExam from "./Components/Dashboard/CEC/CourseInSemesterExam";
import Spin from "./Components/UI/Spin";
import { GenerateActivityPDF } from "../../../../../../home/rohit/Doings/Web/CUERS-New/src/Components/Dashboard/CEC/PdfGeneration/GenerateActivityPDF";
import { fetchData } from "./Components/fetchModule";
function App() {
  const navigate = useNavigate();

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

  const tableNames = [
    "Evaluator",
    "Activity",
    "Activity_Type",
    "Course",
    "Course_in_Semester_Exam",
    "Evaluates_Course_Activity",
    "Processes_Semester_Activity",
    "Exam_Committee",
    "Login_Info",
  ];
  const [isLoading, setLoading] = useState(true);
  const logInfoRef = useRef({
    role: "",
    evaluator_id: "",
    password: "",
  });
  useEffect(() => {
    async function loadTableInfo() {
      const response = await fetch(
        "http://localhost:3000/users/loadTableInfo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tableNames }),
        }
      );
      const data = await response.json();
      return data;
    }

    async function loadSemesterInfo(tableName, colName, colValue) {
      // console.log(tableName, colName, colValue);
      const changes = {
        tableName: `${tableName}`,
        conditionCheck: `${colName} = ${colValue}`,
        operation: "load",
      };
      // console.log(changes);
      const response = await fetch("http://localhost:3000/users/processData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ changes }),
      });
      const data = await response.json();
      return data;
    }

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
            // sessionStorage.clear();
            // console.log(isAuthenticated);
            setAuthenticated(true);
            sessionStorage.setItem("previouslyLogin", true);
            setLoading(false);
            setStatus(["s", "User Authenticated!"]);

            // fetching tableInfo
            (async () => {
              let tableInfo = await loadTableInfo();
              // while (Object.keys(tableInfo).length !== 1) {
              // tableInfo = await loadTableInfo();
              console.log("still accumulating tableInfo");
              console.log(tableInfo);
              sessionStorage.setItem("tableInfo", JSON.stringify(tableInfo));
            })().then(() => {
              (async () => {
                let evaluatorInfo = await fetchData(
                  "Evaluator",
                  "processData",
                  undefined,
                  [
                    {
                      evaluator_id: sessionStorage.getItem("evaluator_id"),
                    },
                  ],
                  undefined
                );
                sessionStorage.setItem(
                  "evaluatorInfo",
                  JSON.stringify(evaluatorInfo[0])
                );
              })();
              if (logInfoRef.current.role == "Chairman") {
                console.log("Here: ", sessionStorage.getItem("tableInfo"));
                navigate("/dashboard/chairman");
                setToLogin(false);
              } else if (
                logInfoRef.current.role == "Chairman of Exam Committee"
              ) {
                (async () => {
                  let tableName = "Exam_Committee";
                  let colName = "evaluator_id";
                  let colValue = logInfoRef.current.evaluator_id;

                  let semesterInfo = await loadSemesterInfo(
                    tableName,
                    colName,
                    colValue
                  );
                  const { semester_no, year } = semesterInfo[0];
                  //  console.log(semester_no);
                  sessionStorage.setItem("semester_no", semester_no);
                  sessionStorage.setItem("year", year);
                })();
                navigate("/dashboard/cec");
                setToLogin(false);
              } else if (logInfoRef.current.role == "Evaluator") {
                navigate("/dashboard/evaluator");
                setToLogin(false);
              }
            });
            // } else {
            //   console.log("TableInfo is already in sessionStorage.");
            // }
          } else {
            let error = data.msg;
            setToLogin(false);
            setStatus(["d", error + ". Try again!"]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [tologin]);
  function onLogin(e) {
    setToLogin(true);
    setAuthenticated(sessionStorage.getItem("previouslyLogin"));
    console.log(sessionStorage.getItem("previouslyLogin"));
    sessionStorage.setItem("role", e.target[0].value);
    sessionStorage.setItem("evaluator_id", e.target[1].value);
    sessionStorage.setItem("password", e.target[2].value);
    console.log(sessionStorage.getItem("role"));
    console.log(sessionStorage.getItem("evaluator_id"));
    console.log(sessionStorage.getItem("password"));
    logInfoRef.current.role = sessionStorage.getItem("role");
    logInfoRef.current.evaluator_id = sessionStorage.getItem("evaluator_id");
    logInfoRef.current.password = sessionStorage.getItem("password");
  }

  return (
    <div className="bg-slate-100 flex flex-col h-screen relative overflow-hidden">
      <StatusContext.Provider
        value={{
          message: message,
          setStatus: setStatus,
          evaluator: sessionStorage.getItem("evaluator_id"),
        }}
      >
        <div>
          <Navbar></Navbar>
        </div>
        {tologin && (
          <div className="mt-20 absolute w-full">
            <Spin></Spin>
          </div>
        )}
        <Routes>
          <Route
            element={<Login onLogin={onLogin}></Login>}
            path="/login"
          ></Route>
          <Route
            path="/*"
            element={<PrivateOutlet isAuthenticated={isAuthenticated} />}
          >
            <Route
              element={<Dashboard userInfo={logInfoRef.current}></Dashboard>}
              path="dashboard/chairman"
            >
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
                element={<CourseInSemesterExam></CourseInSemesterExam>}
                path="course-in-semester-exam"
              ></Route>
              <Route
                element={<ManageSemesterActivity></ManageSemesterActivity>}
                path="manage-semester-activity"
              ></Route>
              <Route
                element={<ManageEditRequests></ManageEditRequests>}
                path="manage-edit-requests"
              ></Route>
              <Route
                element={<GenerateActivityPDF></GenerateActivityPDF>}
                path="generate-activity-pdf"
              ></Route>
            </Route>
            <Route
              element={<Dashboard userInfo={logInfoRef.current}></Dashboard>}
              path="dashboard/evaluator"
            >
              <Route
                element={<ViewBillForm></ViewBillForm>}
                path="view-bill-form"
              ></Route>
            </Route>
          </Route>

          <Route element={<Login onLogin={onLogin}></Login>} path="/"></Route>
        </Routes>
        {message && (
          <div className="absolute bottom-4 right-4">
            <Status variant={message[0]} onClick={(e) => setMessage(null)}>
              {message[1]}
            </Status>
          </div>
        )}
      </StatusContext.Provider>
    </div>
  );
}

export default App;
