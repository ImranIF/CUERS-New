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
        col: "quantity",
        type: "number",
    },
    {
        col: "semester number",
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
    }
]

const ManageSemesterActivity = () => {
    return (
        <div className = "flex h-full w-full justify-center">
            <form action ="w-9/12 min-w-fit max-w-4xl p-2 my-4">
                <Tablenew tableData={tableData}></Tablenew>
            </form>
        </div>
    )
}


export default ManageSemesterActivity;