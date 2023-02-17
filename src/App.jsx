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
import { useState, useEffect } from "react";
import Status from "./Components/UI/Status";
function App() {
  // const navigate = useNavigate();
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
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [message, setMessage] = useState(null);
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
          console.log("Things are good");
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
      {!isAuthenticated ? (
        <Login onLogin={onLogin}></Login>
      ) : (
        <Dashboard userInfo={logInfoRef.current}></Dashboard>
      )}
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
