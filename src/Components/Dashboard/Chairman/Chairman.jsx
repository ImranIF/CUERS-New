import React from "react";
import { Outlet, useNavigate } from "react-router";
import Table from "../../UI/Table";
import Dashboard from "../Dashboard";
import FillActivityBill from "./FillActivityBill";
import FormExamCommittee from "./FormExamCommittee";
import ManageEvaluators from "./ManageEvaluators";
const Chairman = () => {
  return <div className="w-full h-full">

    {/* Somehow bad happens it works */}
    {/* <FillActivityBill /> */}
  </div>;
};

export default Chairman;
