import React, { useEffect, useState } from "react";
import { useRef } from "react";
import Buttoncmp from "../../UI/Buttoncmp";
import Tablenew from "../../UI/Tablenew";
import patterns from "../../Resources/RegexPatterns";

// Generating dynamically
const tablecols = [
  {
    col: "evaluator_id",
    type: "number",
    regex: patterns.bengaliPattern.number,
    regexMessage: "e.g. 1013",
    required: true,
  },
  {
    col: "evaluator_name",
    type: "text",
    regex: patterns.bengaliPattern.textWithSpace,
    regexMessage: "e.g. Dr. Rudra Pratap Deb Nath",
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
    regex: patterns.bengaliPattern.phoneNo,
    regexMessage: "e.g. 01234567892",
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
    <div>
      <div className="mb-8 mt-8">
        <span className="text-xl sm:text-2xl block">Manage Evaluators</span>
      </div>
      <div>
        <Tablenew
          tableCols={tablecols}
          loadCondition={[]}
          tableName="Evaluator"
        ></Tablenew>
      </div>
    </div>
  );
};

export default ManageEvaluators;
