import React from "react";
import Tablenew from "../../UI/Tablenew";

const tableData = [
  {
    col: "No",
  },
  {
    col: "evaluator_id",
    type: "number",
  },
  {
    col: "evaluator_name",
    type: "text",
  },
  {
    col: "designation",
    type: "dropdown",
    values: [
      "Professor",
      "Assistant professor",
      "Associate professor",
      "lecturer",
    ],
  },
  {
    col: "university_name",
    type: "dropdown",
    values: [
      "University of Chittagong",
      "University of Dhaka",
      "University of Khulna",
    ],
  },
  {
    col: "dept_name",
    type: "dropdown",
    values: [
      "Dept of Computer Science",
      "Dept of Physics",
      "Dept of English",
      "Dept of Electronics & Engineering",
      "Dept of Chemistry",
      "Dept of Mathematics",
      "Dept of Economics",
    ],
  },
  {
    col: "phone_no",
    type: "tel",
  },
];
const ManageEvaluators = () => {
  return (
    <div className="flex h-full w-full justify-center ">
      <form action="" className="w-9/12 min-w-fit max-w-4xl p-2 my-4">
        <Tablenew tableData={tableData}></Tablenew>
      </form>
    </div>
  );
};

export default ManageEvaluators;
