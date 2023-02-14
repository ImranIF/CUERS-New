import React from "react";
import Table from "../../UI/Table";
import FormExamCommittee from "./FormExamCommittee";
import ManageEvaluators from "./ManageEvaluators";

const Chairman = () => {
  return (
    <div className="w-full h-full">
      {/* <FormExamCommittee></FormExamCommittee> */}
      <ManageEvaluators></ManageEvaluators>
    </div>
  );
};

export default Chairman;
