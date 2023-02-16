import React from "react";
import Dropdown from "../../UI/Dropdown";
import Tablenew from "../../UI/Tablenew";

const tableData = [
    {
        col: "No",
    },
    {
        col: "activity type",
        type: "dropdown",
        values: [
            "Question setting",
            "Question translating",
            "Answer script Examining",
            "Practical Examining",
            "Examiner",
            "These guide/Supervision",
            "Invigilation(per tutorial)",
            "Invigilation(per hour)",
        ],
    },
    {
        col: "sector/program",
        type: "dropdown",
        values: [
            "BSc",
            "MSc",
            "Tutorial",
            "Lab",
            "By computer",
            "By hand",
        ],

    },
    {
        col: "evaluator id",
        type: "number",
    },
    {
        col: "course id",
        type: "dropdown",
        values: [
            "CSE 810",
            "CSE 811",
            "CSE 812",
            "CSE 813",
            "CSE 815",
            "CSE 817",
            "CSE 819",
            "CSE 821",
            "CSE 823"
        ],
    },
    {
        col: "semester no",
        type: "dropdown",
        values: [
            "1st",
            "2nd",
            "3rd",
            "4th",
            "5th",
            "6th",
            "7th",
            "8th",
        ],
    },
    {
        col: "factor",
        type: "dropdown",
        values: [
            "Hours",
            "Days",
            "Half/Full part",
            "No of students",
            "No of tutorial",
            "No of pages",
        ],
    },
    {
        col: "quantity",
        type: "number",
    },
]
const EvaluatesCourseActivity =() =>{
    return(
      <div className="flex h-full w-full justify-center ">
        <form action="" className="w-9/12 min-w-fit max-w-4xl p-2 my-4">
          <Tablenew tableData={tableData}></Tablenew>
        </form>
      </div>
    )
}

export default EvaluatesCourseActivity;