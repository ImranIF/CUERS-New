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
            "Honours",
            "Masters",
            "Tutorial",
            'Terminal',
            'Certificate course',
            "Lab",
            "Lab notebook",
            "Masters thesis",
            "M.Phil thesis",
            "PhD thesis",
            "Industrial tour",
            "By computer",
            "By hand",
            "Others",
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
        //need to be dynamic
        values: [
            "CSE811",
            "CSE812",
            "CSE813",
            "CSE814",
            "CSE815",
            "CSE816",
            "CSE817",
            "CSE818",
            "CSE819",
            "CSE821",
            "CSE823",
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
            "No of questions",
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
const EvaluatesCourseActivity = () => {
    const semester_no = sessionStorage.getItem("semester_no");
    return (
        <div >
            <div className="mb-8 mt-8">
                <span className="text-xl sm:text-2xl block text-center">
                    Manage Course Activity
                </span>
            </div>
            <div className="flex h-full w-full justify-center ">
                <form action="" className="w-9/12 min-w-fit max-w-4xl p-2 my-4">
                    <Tablenew tableCols={tablecols} loadCondition={[{semester_no: `${semester_no}`}]} tableName="Evaluates_Course_Activity"></Tablenew>
            </form>
        </div>
    </div >
      
    )
}

export default EvaluatesCourseActivity;