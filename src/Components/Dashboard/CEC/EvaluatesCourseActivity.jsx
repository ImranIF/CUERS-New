import React from "react";
import Dropdown from "../../UI/Dropdown";
import Tablenew from "../../UI/Tablenew";

const tablecols = [
    {
        col: "activity_type_id",
        type: "dropdown",
        values: [
            1,
            2,
            4,
            5,
            7,
            8,
            16,
            17,
        ],
        required: true,
    },
    {
        col: "sector_or_program",
        type: "dropdown",
        values: [
            "BSc",
            "MSc",
            "Tutorial",
            "Lab",
            "By computer",
            "By hand",
        ],
        required: true,
    },
    {
        col: "evaluator_id",
        type: "number",
        required: true,
    },
    {
        col: "course_id",
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
        required: true,
    },
    {
        col: "semester_no",
        type: "dropdown",
        values: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
        ],
        required: true,
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
        required: true,
    },
    {
        col: "quantity",
        type: "number",
        required: true,
    },
    {
        col: "Delete",
        type: "button",
        label: "Delete",
        variant: "dasi",
    },
]
const EvaluatesCourseActivity =() =>{
    return(
    <div >
        <div className="mb-8 mt-8">
        <span className="text-xl sm:text-2xl block text-center">
            Manage Course Activity
        </span>
    </div>
    <div className="flex h-full w-full justify-center ">
        <form action="" className="w-9/12 min-w-fit max-w-4xl p-2 my-4">
          <Tablenew tableCols={tablecols} tableName="Evaluates_Course_Activity"></Tablenew>
        </form>
      </div>
    </div>
      
    )
}

export default EvaluatesCourseActivity;