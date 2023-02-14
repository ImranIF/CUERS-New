import React from "react";
import department from "../../Resources/Data/Department";
import designation from "../../Resources/Data/Designation";
import evaluators from "../../Resources/Data/Evaluators";
import university from "../../Resources/Data/University";
import Tablenew from "../../UI/Tablenew";

const tableData = [
  {col: "Delete", type: "button"},
  { col: "No", type: "row" },
  {
    col: "Evaluator_id",
    type: "number",
  },
  {
    col: "Name",
    type: "dropdown",
    values: evaluators,
  },
  {
    col: "Designation",
    type: "dropdown",
    values: designation,
  },
  {
    col: "University",
    type: "dropdown",
    values: university,
  },
  {
    col: "Department",
    type: "dropdown",
    values: department,
  },
  {
    col: "Phone No",
    type: "tel",
  },
];
const ManageEvaluators = () => {
  return (
    <div className="flex h-full w-full justify-center">
      <form action="" className="w-9/12 min-w-fit max-w-4xl p-2 my-4">
		<div>
			<Tablenew tableData={tableData}></Tablenew>
		</div>
	  </form>
    </div>
  );
};

export default ManageEvaluators;
