import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import Buttoncmp from "../../UI/Buttoncmp";
import Inputcmp from "../../UI/Inputcmp";
import Table from "../../UI/Table";
import { useState } from "react";
import Dropdown from "../../UI/Dropdown";
import Tablenew from "../../UI/Tablenew";
const tableCols = [
  // { col: "No", type: "row", required: true, },
  {
    col: "evaluator_id",
    type: "number",
    required: true,
    // type: "dropdown",
    // values: [
    //   "Dr. Rudra Pratap Devnath",
    //   "Dr. Anwarul Azim",
    //   "Dr. Abu Nowshad Chowdhury",
    //   ,
    //   "Mr. Nihad Karim Chowdhury",
    //   "Dr. Mohammad Osiur Rahman",
    //   "Dr. Rashed Mustafa",
    //   "Dr. Mohammad Khairul Islam",
    //   "Dr. Kazi Ashrafuzzaman",
    //   "Mr. Mohammad Rokan UddinFaruque",
    //   "Mrs. Nasrin Sultana",
    //   "Dr. Asaduzzaman",
    //   "Mr. H.S. Faruq Alam",
    //   "Dr. Mohammed Hanif Siddique",
    //   "Dr. Mohammed Abdur Rauf",
    // ],
  },
  {
    col: "role",
    type: "dropdown",
    values: ["Member", "Chairman", "External member"],
    required: true,
  },
  {
    col: "program",
    type: "dropdown",
    values: ["Honours", "Masters", "M.Phil", "PhD"],
    required: true,
  },
  {
    col: "semester_no",
    type: "dropdown",
    values: [1, 2, 3, 4, 5, 6, 7, 8],
    required: true,
  },
  {
    col: "year",
    type: "number",
    required: true,
  },
  {
    col: "Delete",
    type: "button",
    label: "Delete",
    variant: "dasi",
  },
];

// const peoples = ["1","2", "3", "4", "5"];
const FormExamCommittee = () => {
  const programOptions = ["BSc", "MSc"];
  return (
    <div className="flex h-full w-full justify-center text-center">
      <form action="" className="w-9/12 min-w-fit max-w-4xl p-2 my-4">
        <div className="mb-8 mt-8">
          {" "}
          {/* committee information*/}
          <div>
            <span className="text-xl sm:text-2xl block">
              Committee information
            </span>
          </div>
        </div>
        <div>
          <Tablenew
            tableCols={tableCols}
            tableName={"Exam_Committee"}
            loadCondition={[]}
          ></Tablenew>
        </div>
      </form>
    </div>
  );
};

export default FormExamCommittee;
