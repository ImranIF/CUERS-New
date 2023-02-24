import React, { useEffect, useState } from "react";
import { useRef } from "react";
import Buttoncmp from "../../UI/Buttoncmp";
import Tablenew from "../../UI/Tablenew";

// Generating dynamically
const tablecols = [
  {
    col: "evaluator_id",
    type: "number",
    required: true,
  },
  {
    col: "evaluator_name",
    type: "text",
    required: true,
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
    required: true,
  },
  {
    col: "university_name",
    type: "dropdown",
    values: [
      "University of Chittagong",
      "University of Dhaka",
      "University of Khulna",
    ],
    required: true,
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
    required: true,
  },
  {
    col: "phone_no",
    type: "tel",
    // [0-9]
    required: true,
  },
  {
    col: "Delete",
    type: "button",
    label: "Delete",
    variant: "dasi",
  },
];
const ManageEvaluators = (prop) => {

  const dosomething = (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex h-full w-full justify-center text-center">
      <form action="" className="w-9/12 min-w-fit max-w-4xl p-2 my-4">
        <div className="mb-8 mt-8">
          <span className="text-xl sm:text-2xl block">
            Manage Evaluators
          </span>
        </div>
        <Tablenew tableCols={tablecols} tableName="Evaluator"></Tablenew>
        {/* <Buttoncmp
          type="submit"
          label="Submit"
          variant="stpr"
          onClick={dosomething}
        ></Buttoncmp> */}
      </form>
    </div>
  );
};

export default ManageEvaluators;
