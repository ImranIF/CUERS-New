import {
  ArrowLeftOnRectangleIcon,
  RectangleStackIcon,
  ClipboardIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import Buttoncmp from "../UI/Buttoncmp";
import Chairman from "./Chairman/Chairman";
import Table from "../UI/Table";
import CEC from "./CEC/CEC";
import FillActivityBill from "./Chairman/FillActivityBill";
import Tablenew from "../UI/Tablenew";
import ManageEvaluators from "./Chairman/ManageEvaluators";
import { Route, Routes, useNavigate } from "react-router";
import { Outlet } from "react-router";

const tableNames = [
  "Evaluator",
  "Activity",
  "Activity_Type",
  "Course",
  "Course_in_Semester_Exam",
  "Evaluates_Course_Activity",
  "Exam_Committee",
  "Login_Info",
];

const menus = [
  {
    person: "Chairman",
    activity: [
      { menuText: "Manage evaluators", route: "manage-evaluators" },
      { menuText: "Exam committee info", route: "form-exam-committee" },
      { menuText: "Manage activity bill", route: "fill-activity-bill" },
    ],
  },
  {
    person: "Chairman of exam committee",
    activity: [
      {
        menuText: "Manage course activity",
        route: "evaluates-course-activity",
      },
      {
        menuText: "Manage semester activity",
        route: "manage-semester-activity",
      },
      { menuText: "Manage edit requests", route: "manage-edit-requests" },
    ],
  },
  {
    person: "Evaluator",
    activity: [{ menuText: "View Bill forms", route: "" }],
  },
];
async function loadTableInfo() {
  if (sessionStorage.getItem("tableInfo") === null) {
    let response = await fetch("http://localhost:3000/users/loadTableInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tableNames }),
    })
    let data = await response.json();
    if(data){
      let tableInfo = JSON.stringify(data);
      console.log(data);
      sessionStorage.setItem("tableInfo", tableInfo);
    }
  }
}
const Dashboard = (prop) => {
  const { userInfo, showStatus } = prop;
  const onLogOut = () => {
    sessionStorage.clear(); //Delete Login Data from session. So that, user need to verify after logout.
    navigate("/login");
  };

  //Button added for Sidebar when you clicked the sidebar button. And Check the user.
  const clickme = (activity, e) => {
    console.log(activity, window.location.pathname);
    // CEC
    if (window.location.pathname.includes("cec")) {
      navigate(`/dashboard/cec/${activity.route}`);

    } else if (window.location.pathname.includes("chairman")) {
      navigate(`/dashboard/chairman/${activity.route}`);

    }
  };
  if (sessionStorage.getItem("tableInfo") === null) {
    loadTableInfo();
  }
  const navigate = useNavigate();

  const Cactivity = menus.filter(
    (menu) => menu.person.toLowerCase() === sessionStorage.role.toLowerCase()
  );

  //checking purpose
  console.log(sessionStorage.getItem("role"));
  console.log(sessionStorage.getItem("evaluator_id"));
  console.log(sessionStorage.getItem("password"));
  return (
    <div className="flex w-full h-full justify-start ">
      <div className="flex-none">
        <div className="bg-slate-200 w-72 h-full flex-col px-4 py-4 border-r-2 z-30 border-slate-300">
          <div className="flex-col">
            {Cactivity.map((person, pIndex) => {
              let activity = person.activity;

              return activity.map((option, cindex) => {
                return (
                  <div className="mb-3" key={pIndex + cindex}>
                    <Buttoncmp
                      label={option.menuText}
                      variant="stsi"
                      size="full"
                      value={option.menuText}
                      onClick={() => clickme(option)}
                    >
                      <HashtagIcon></HashtagIcon>
                    </Buttoncmp>
                  </div>
                );
              });
            })}
          </div>
          <div>
            <Buttoncmp
              label="Log out"
              onClick={onLogOut}
              variant="dasi"
              size="full"
            >
              <ArrowLeftOnRectangleIcon></ArrowLeftOnRectangleIcon>
            </Buttoncmp>
          </div>
        </div>
      </div>
      <div className="flex-1 px-16 w-full h-full overflow-auto">
        <div className="">
          {" "}
          <Outlet></Outlet>
          <div className="p-24"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
