import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import Buttoncmp from "../../UI/Buttoncmp";
import Tablenew from "../../UI/Tablenew";
import patterns from "../../Resources/RegexPatterns";
// import Inputcmp from "../../Inputcmp";
// import Temptable from "../../UI/Temptable";

const tableCols = [
  {
    col: "activity_type_id",
    type: "dropdown",
    values: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
    ],
    required: true,
  },
  {
    col: "sector_or_program",
    type: "dropdown",
    values: [
      "Honours/Masters",
      "M.Phil",
      "PhD",
      "Terminal",
      "Certificate course",
      "M.Phil thesis",
      "Masters thesis",
      "PhD thesis",
      "Tutorial",
      "Lab",
      "Scrutiny",
      "Masters (Project/thesis)",
      "Lab notebook",
      "Industrial tour",
      "Honours (1st year to 3rd year)",
      "Honours (4th year)",
      "Masters",
      "By hand",
      "By computer",
      "All programs",
      "Others",
    ],
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
    values: [
      "Hours",
      "No of questions",
      "No of pages",
      "No of members",
      "No of students",
      "No of exams",
      "Course",
      "Bill for question setting",
    ],
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
