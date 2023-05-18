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
    values: JSON.parse(sessionStorage.getItem("designation")),
    required: true,
  },
  {
    col: "university_name",
    type: "dropdown",
    values: JSON.parse(sessionStorage.getItem("university_name")),
    required: true,
  },
  {
    col: "dept_name",
    type: "dropdown",
    values: JSON.parse(sessionStorage.getItem("dept_name")),
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
