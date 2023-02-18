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
const menus = [
  {
    person: "Chairman",
    activity: [
      "Manage evaluators",
      "Exam committee info",
      "Manage activity bill",
    ],
  },
  {
    person: "Chairman of exam committee",
    activity: [
      "Manage course activity",
      "Manage semester activity",
      "Manage edit requests",
    ],
  },
  {
    person: "Evaluator",
    activity: ["View Bill forms"],
  },
];

const Dashboard = (prop) => {

  const onLogOut = () => {

    sessionStorage.clear(); //Delete Login Data from session. So that, user need to verify after logout.
    navigate("/login");

  }


  //Button added for Sidebar when you clicked the sidebar button. And Check the user. 
  const clickme = (e) => {

    let activity = e.target.innerText;
    console.log(activity, window.location.pathname);
    // CEC
    if (window.location.pathname.includes("cec")) {
      if (activity == "Manage semester activity") {

        navigate("/dashboard/cec/manage-semester-activity");
      } else if (activity == "Manage course activity") {

        navigate("/dashboard/cec/evaluates-course-activity");
      } else if (activity == "Manage edit requests") {

        navigate("/dashboard/cec/manage-edit-requests");
      }

    } else if (window.location.pathname.includes("chairman")) {
      if (activity == "Manage activity bill") {

        navigate("/dashboard/chairman/fill-activity-bill");
      } else if (activity == "Exam committee info") {

        navigate("/dashboard/chairman/form-exam-committee");
      } else if (activity == "Manage evaluators") {

        navigate("/dashboard/chairman/manage-evaluators");
      }

    }
  };

  const navigate = useNavigate();
  const { userInfo } = prop;

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
            {Cactivity.map((person) => {
              let activity = person.activity;

              return activity.map((temp) => {
                return (
                  <div className="mb-3">
                    <Buttoncmp
                      label={temp}
                      variant="stsi"
                      size="full"
                      value={temp}
                      onClick={clickme}
                    >
                      <HashtagIcon></HashtagIcon>
                    </Buttoncmp>
                  </div>
                );
              });
            })}
          </div>
          <div>
            <Buttoncmp label="Log out" onClick={onLogOut} variant="dasi" size="full">
              <ArrowLeftOnRectangleIcon></ArrowLeftOnRectangleIcon>
            </Buttoncmp>
          </div>
        </div>
      </div>
      <div className="flex-1 px-16 w-full h-full overflow-auto">
        <div>
          {" "}
          <Outlet></Outlet>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
