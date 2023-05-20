import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import Buttoncmp from "../../UI/Buttoncmp";
import Tablenew from "../../UI/Tablenew";
import patterns from "../../Resources/RegexPatterns";
// import Inputcmp from "../../Inputcmp";
// import Temptable from "../../UI/Temptable";
console.log(sessionStorage.getItem("sector_or_program"));
const x= sessionStorage.getItem("sector_or_program");
console.log(JSON.parse(x));
const tableCols = [
  {
    col: "activity_type_id",
    type: "dropdown",
    values: JSON.parse(sessionStorage.getItem("activity_type_id")),
    required: true,
  },
  {
    col: "sector_or_program",
    type: "dropdown",
    values: JSON.parse(sessionStorage.getItem("sector_or_program")),
    required: true,
  },
  {
    col: "category",
    type: "dropdown",
    values: ["Course_activity", "Semester_activity"],
    required: true,
  },
  {
    col: "factor",
    type: "dropdown",
    values: JSON.parse(sessionStorage.getItem("factor")),
    required: true,
  },
  {
    col: "quantity_initial",
    type: "number",
    regex: patterns.bengaliPattern.number,
    regexMessage: "e.g. 2 or 2.5",
    required: true,
  },
  {
    col: "quantity_final",
    type: "number",
    regex: patterns.bengaliPattern.number,
    regexMessage: "e.g. 2 or 2.5",
    required: true,
  },
  {
    col: "min_bill",
    type: "number",
    regex: patterns.bengaliPattern.number,
    regexMessage: "e.g. 1200",
    required: true,
  },
  {
    col: "bill",
    type: "number",
    regex: patterns.bengaliPattern.number,
    regexMessage: "e.g. 1200",
    required: true,
  },
  {
    col: "Delete",
    type: "button",
    label: "Delete",
    variant: "dasi",
  },
];

const FillActivityBill = () => {
  // const [activities, setActivities] = useState([1, 2]);

  return (
    <div className="mb-8 mt-8">
      <div>
        <span className="text-xl sm:text-2xl block">
          Activity Bill information
        </span>
      </div>
      <div className="mt-8">
        <Tablenew
          tableCols={tableCols}
          tableName="Activity"
          loadCondition={[]}
        ></Tablenew>
      </div>
    </div>
  );
};

export default FillActivityBill;
