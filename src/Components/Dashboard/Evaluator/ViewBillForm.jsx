import React, { useEffect, useState } from "react";
import { useRef } from "react";
import Buttoncmp from "../../UI/Buttoncmp";
import Tablenew from "../../UI/Tablenew";

const ViewBillForm = () => {
    return (
      <div className="flex h-full w-full justify-center text-center">
        <form action="" className="w-9/12 min-w-fit max-w-4xl p-2 my-4">
          <div>
            <span className="text-xl sm:text-2xl block">
              View Bill Form
            </span>
          </div>
          {/* <Tablenew tableCols={tablecols} tableName=""></Tablenew> */}
          {/* <Buttoncmp
            type="submit"
            label="Submit"
            variant="stpr"
            onClick={dosomething}
          ></Buttoncmp> */}
        </form>
      </div>
    );
  };
  
  export default ViewBillForm;
  