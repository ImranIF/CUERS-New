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
    values: [
      "BSc",
      "MSc",
      "M.Phil",
      "PhD",
    ],
    required: true,
  },
  {
    col: "semester_number",
    type: "dropdown",
    values: [
      1, 2, 3, 4, 5, 6, 7, 8,
    ],
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
        {/* <div className="">
          {" "}
          exam information
          <div className="mb-8">
            <span className="text-xl sm:text-2xl">Exam information</span>
          </div>
          <div className="grid grid-cols-3 gap-x-8 gap-y-8">
            <div className="col-span-3 md:col-span-1">
              <Dropdown
                type="dropdown"
                label="Select program"
                name="program"
                id="program"
                options={programOptions}
              ></Dropdown>
            </div>
            <div className="col-span-3 md:col-span-1">
              <Inputcmp
                type="text"
                label="Exam year"
                required={true}
                name="exam-year"
                id="exam-year"
                placeholder="e.g. 2020"
              ></Inputcmp>
            </div>
            <div className="min-w-fit col-span-3 md:col-span-1">
              <Inputcmp
                type="number"
                label="Semester number"
                required={true}
                name="semester-number"
                id="semester-number"
                placeholder="e.g. 2020"
              ></Inputcmp>
            </div>
          </div>
        </div> */}
        {/* <hr className="border border-slate-300 mt-12"></hr> */}
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
          ></Tablenew>
        </div>
        {/* <div className="mt-16">
          <Buttoncmp
            type="submit"
            label="Form committee"
            variant="stpr"
          ></Buttoncmp>
        </div> */}
      </form>
    </div>
  );
};

export default FormExamCommittee;
