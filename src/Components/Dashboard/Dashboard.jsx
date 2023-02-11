import {
  ArrowLeftOnRectangleIcon,
  RectangleStackIcon,
  ClipboardIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import Buttoncmp from "../UI/Buttoncmp";
import Chairman from "./Chairman/Chairman";
import Table from "../UI/Table";
import CEC from "./CEC/CEC";
import FillActivityBill from "./CEC/FillActivityBill";
import Tablenew from "../UI/Tablenew";
const menus = [
  {
    person: "chairman",
    activity: ["Manage evaluators", "Exam committee info"],
  },
];
const Dashboard = () => {
  return (
    <div className="flex w-full h-full justify-start ">
      <div className="flex-none">
        <div className="bg-slate-200 w-72 h-full flex-col px-4 py-4 border-r-2 z-30 border-slate-300">
          <div className="flex-col">
            {menus.map((person) => {
              let activity = person.activity;
              // console.log(activity);
              return activity.map((temp) => {
                return (
                  <div className="mb-3">
                    <Buttoncmp label={temp} variant="stsi" size="full">
                      <HashtagIcon></HashtagIcon>
                    </Buttoncmp>
                  </div>
                );
              });
            })}
          </div>
          <div>
            <Buttoncmp label="Log out" variant="dasi" size="full">
              <ArrowLeftOnRectangleIcon></ArrowLeftOnRectangleIcon>
            </Buttoncmp>
          </div>
        </div>
      </div>
      <div className="flex-1 px-16 w-full h-full overflow-auto">
        <div className="">
          {/* <FillActivityBill></FillActivityBill> */}
          {/* <Tablenew></Tablenew> */}
          <Chairman></Chairman>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
