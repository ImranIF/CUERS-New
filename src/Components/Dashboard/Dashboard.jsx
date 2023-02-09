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
const menus = [
  {
    person: "chairman",
    activity: ["Form Exam-Committee", "Manage semester info"],
  },
];
const Dashboard = () => {
  return (
    <div className="flex h-screen bg-slate-100">
      <div className="bg-slate-200 w-72 h-full flex-col px-4 py-4 border-r-2 border-slate-300 min-w-fit fixed">
        <div className="flex-col">
          {menus.map((person) => {
            let activity = person.activity;
            // console.log(activity);
            return activity.map((temp) => {
              return (
                <div className="mb-3">
                  <Buttoncmp name={temp} variant="stsi" size="full">
                    <HashtagIcon></HashtagIcon>
                  </Buttoncmp>
                </div>
              );
            });
          })}
        </div>
        <div>
          <Buttoncmp name="Log out" variant="dasi" size="full">
            <ArrowLeftOnRectangleIcon></ArrowLeftOnRectangleIcon>
          </Buttoncmp>
        </div>
      </div>
      <div className="w-full ml-36">
        <Chairman></Chairman>
      </div>
    </div>
  );
};

export default Dashboard;
