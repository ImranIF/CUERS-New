import React from "react";
import Table from "../../UI/Table";
import FillActivityBill from "./FillActivityBill";
import FormExamCommittee from "./FormExamCommittee";
import ManageEvaluators from "./ManageEvaluators";

const Chairman = () => {
  return <div className="w-full h-full">
    {/* <ManageEvaluators></ManageEvaluators> */}
    <FormExamCommittee></FormExamCommittee>
    {/* <FillActivityBill /> */}
  </div>;
};

export default Chairman;
