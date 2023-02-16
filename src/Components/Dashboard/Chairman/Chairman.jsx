import React from "react";
import Table from "../../UI/Table";
import FillActivityBill from "../CEC/FillActivityBill";
import FormExamCommittee from "./FormExamCommittee";
import ManageEvaluators from "./ManageEvaluators";

const Chairman = () => {
  return <div className="w-full h-full">
    <ManageEvaluators></ManageEvaluators>
    {/* <FillActivityBill></FillActivityBill> */}
    {/* <FormExamCommittee></FormExamCommittee> */}
  </div>;
};

export default Chairman;
