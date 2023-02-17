import React from "react";
import Tablenew from "../../UI/Tablenew";

const tableData = [
    {
        col: "No",
    },
    {
        col: "evaluator id",
        type: "number",
    },
    {
        col: "view form",
        type: "button",
        label: "view"
    },
    {
        col: "approve form",
        type: "button",
        label: "approve",
    },

]

const ManageEditRequests = () => {
    return(
        <div>
        <div>
            <span className="text-xl sm:text-2xl block text-center">
                Manage Edit Requests
            </span>
        </div>
        <div className="flex h-full w-full justify-center ">
          <form action="" className="w-9/12 min-w-fit max-w-4xl p-2 my-4">
            <Tablenew tableData={tableData}></Tablenew>
          </form>
        </div>
        </div>
      )
}

export default ManageEditRequests;