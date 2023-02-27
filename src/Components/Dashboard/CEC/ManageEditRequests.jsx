import React from "react";
import Tablenew from "../../UI/Tablenew";

const tableCol = [
  {
    col: "evaluator id",
    type: "number",
  },
  {
    col: "view form",
    type: "button",
    label: "view",
  },
  {
    col: "approve form",
    type: "button",
    label: "approve",
  },
];

const ManageEditRequests = () => {
  return (
    <div>
      <div className="mb-8 mt-8">
        <span className="text-xl sm:text-2xl block text-center">
          Manage Edit Requests
        </span>
      </div>
      {/* <Tablenew tableCol = {tableCol}></Tablenew> */}
    </div>
  );
};

export default ManageEditRequests;
