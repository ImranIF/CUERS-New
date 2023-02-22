import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import Buttoncmp from "../../UI/Buttoncmp";
import Tablenew from "../../UI/Tablenew";
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
    ],
    required: true,
  },
  {
    col: "sector/program",
    type: "dropdown",
    values: [
      "Honours/Masters",
      "M.Phil",
      "PhD",
      "BSc, MSc",
      "Terminal",
      "Tutorial",
      "Lab",
      "Scrutiny",
      "MSc (Project/thesis)",
      "Lab notebook",
      "Industrial tour",
      "BSc (1st year to 3rd year)",
      "BSc (4th year)",
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
      "No of members in Exam Committee",
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
    required: true,
  },
  { col: "quantity_final", type: "number", required: true },
  { col: "min_bill", type: "number", required: true },
  { col: "bill", type: "number", required: true },
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
    <div className="flex h-full w-full justify-center overflow-auto text-center">
      <form action="" className="w-9/12 min-w-fit max-w-4xl p-2 my-4">
        {/* <hr className="border border-slate-300 mt-12"></hr> */}
        <div className="mb-8 mt-8">
          <div>
            <span className="text-xl sm:text-2xl block">
              Activity Bill information
            </span>
          </div>
          <div className="mt-8">
            <Tablenew tableCols={tableCols} tableName="Activity"></Tablenew>
          </div>
        </div>
        {/* <Buttoncmp type="submit" label="Save" variant="stpr"></Buttoncmp> */}
        {/* <hr className="border border-slate-300 mt-12"></hr> */}
      </form>
    </div>
  );
};

export default FillActivityBill;
