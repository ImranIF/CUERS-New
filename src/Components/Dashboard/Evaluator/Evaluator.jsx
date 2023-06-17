import React from "react";
import { Outlet, useNavigate } from "react-router";
import Table from "../../UI/Table";
import Dashboard from "../Dashboard";
import ViewBillForm from "./ViewBillForm";
import Dropdown from "../../UI/Dropdown";
import BillFormDropdown from "../../UI/BillFormDropdown";
const Bill = [
  {
    "activity_type_id" : 1,
    "sector_or_program" : "Honours",
    "quantity_initial" : 4,
    "quantity_final" : 4,
  },
  {
    "activity_type_id" : 1,
    "sector_or_program" : "Lab",
    "quantity_initial" : 6,
    "quantity_final" : 8,
  },
  {
    "activity_type_id" : 1,
    "sector_or_program" : "Tutorial",
    "quantity_initial" : 1,
    "quantity_final" : 1,
  },
  {
    "activity_type_id" : 1,
    "sector_or_program" : "Terminal",
    "quantity_initial" : 1,
    "quantity_final" : 1,
  },
  {
    "activity_type_id" : 3,
    "sector_or_program" : "Tutorial",
    "quantity_initial" : 1,
    "quantity_final" : 1,
  },
]

const Evaluator = () => {
  return <div className="w-full h-full">

    {/* Somehow bad happens it works */}
    {/* <FillActivityBill /> */}
    {/* <BillFormDropdown/> */}
  </div>;
};

export default Evaluator;
