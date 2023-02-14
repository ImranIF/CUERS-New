import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import Buttoncmp from "../../UI/Buttoncmp";
// import Inputcmp from "../../Inputcmp";
import Temptable from "../../UI/Temptable";
import Tablenew from "../../UI/Tablenew";

const tableData = [
  { col: "No" },
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
  },
  {
    col: "sector",
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
  },
  {
    col: "category",
    type: "dropdown",
    values: ["Course_activity", "Semester_activity"],
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
  },
  {
    col: "Initial quantity",
    type: "number",
  },
  { col: "Final quantity", type: "number" },
  { col: "Minbill", type: "number" },
  { col: "Bill", type: "number" },
];

const FillActivityBill = () => {
  const [activities, setActivities] = useState([1, 2]);

  function addactivities(e) {
    console.log(e);
    setActivities([...activities, activities.length + 1]);
  }
  function removeactivities(e) {
    console.log(e);
    let activity = activities.slice(0, -1);
    setActivities([...activity]);
  }

  return (
    <div className="flex h-full w-full justify-center">
      <form action="" className="w-9/12 min-w-fit max-w-4xl p-2 my-4">
        <div className="mb-8 mt-8">
          <div>
            <span className="text-xl sm:text-2xl block">
              Activity Bill information
            </span>
          </div>
          <div className="mt-8">
            <Tablenew tableData={tableData}></Tablenew>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FillActivityBill;
