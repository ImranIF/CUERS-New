import React from "react";
import Dropdown from "../../UI/Dropdown";
import Tablenew from "../../UI/Tablenew";

const tablecols = [
    {
        col: "activity_type_id",
        type: "dropdown",
        values: [
            "3", "6", "9", "10", "11", "12", "13", "14", "15",
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
            "Lab",
            "Honours (1st year to 3rd year)",
            "Honours (4th year)",
            "By computer",
            "By hand",
            "All programs",
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
        col: "semester_no",
        type: "dropdown",
        values: [
            1, 2, 3, 4, 5, 6, 7, 8,
        ],
        required: true,
    },
    {
        col: "factor",
        type: "dropdown",
        values: [
            "No of members",
            "No of students",
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

const ManageSemesterActivity = () => {
    const semester_no = sessionStorage.getItem("semester_no");
    return (
    <div>
        <div className="mb-8 mt-8">
        <span className="text-xl sm:text-2xl block text-center">
            Manage Semester Activity
        </span>
        </div>
        <div className = "flex h-full w-full justify-center">
            <form action ="w-9/12 min-w-fit max-w-4xl p-2 my-4">
                    <Tablenew tableCols={tablecols} loadCondition={{ semester_no: `${semester_no}` }} tableName= "Processes_Semester_Activity"></Tablenew>
            </form>
        </div>
    </div>
    )
}


export default ManageSemesterActivity;