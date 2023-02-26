import React from "react";
import { Outlet, useNavigate } from "react-router";
import Table from "../../UI/Table";
import Dashboard from "../Dashboard";
import ViewBillForm from "./ViewBillForm";
const Bill = [
  {
    "activity_type_id": 1,
    "sector_or_program": "Honours",
    "multiplied_by": 1,

  },
  {
    "activity_type_id": 1,
    "sector_or_program": "Lab",
    "multiplied_by": 1,

  },
  {
    "activity_type_id": 1,
    "sector_or_program": "Tutorial",

  },
  {
    "activity_type_id": 1,
    "sector_or_program": "Terminal",

  },
  {
    "activity_type_id": 3,
    "sector_or_program": "Tutorial",

  },


]
const Evaluator = () => {
  return <div className="w-full h-full">

    {/* Somehow bad happens it works */}
    {/* <FillActivityBill /> */}
  </div>;
};

export default Evaluator;
