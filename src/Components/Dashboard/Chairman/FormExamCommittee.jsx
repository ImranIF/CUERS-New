import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import Buttoncmp from "../../UI/Buttoncmp";
import Inputcmp from "../../UI/Inputcmp";
import Table from "../../UI/Table";
import { useState } from "react";
import Dropdown from "../../UI/Dropdown";
import Tablenew from "../../UI/Tablenew";
const tableCols = [
  // { col: "No", type: "row", required: true, },
  {
    col: "evaluator_id",
    type: "number",
    regex: "^\\d{4}$",
    regexMessage: "e.g. 1013",
    required: true,
  },
  {
    col: "role",
    type: "dropdown",
    values: ["Member", "Chairman", "External member"],
    required: true,
  },
  {
    col: "program",
    type: "dropdown",
    values: ["Honours", "Masters", "M.Phil", "PhD"],
    required: true,
  },
  {
    col: "semester_no",
    type: "dropdown",
    values: [1, 2, 3, 4, 5, 6, 7, 8],
    required: true,
  },
  {
    col: "year",
    type: "number",
    regex: "^\\d{4}$",
    regexMessage: "e.g. 2023",
    required: true,
  },
  {
    col: "Delete",
    type: "button",
    label: "Delete",
    variant: "dasi",
  },
];

// const peoples = ["1","2", "3", "4", "5"];
const FormExamCommittee = () => {
  const programOptions = ["BSc", "MSc"];
  return (
    <div className="">
      <div className="mb-8  mt-8">
        <span className="text-xl sm:text-2xl block">Committee information</span>
      </div>
      <div>
        <Tablenew
          tableCols={tableCols}
          tableName={"Exam_Committee"}
          loadCondition={[]}
        ></Tablenew>
      </div>
    </div>
  );
};

export default FormExamCommittee;
