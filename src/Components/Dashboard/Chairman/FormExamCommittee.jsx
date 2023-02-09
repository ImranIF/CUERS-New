import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import Buttoncmp from "../../UI/Buttoncmp";
import Inputcmp from "../../UI/Inputcmp";
import Table from "../../UI/Table";
import { useState } from "react";
const options = {
  evaluators: [
    "Dr. Rudra Pratap Devnath",
    "Dr. Anwarul Azim",
    "Dr. Abu Nowshad Chowdhury",
    ,
    "Mr. Nihad Karim Chowdhury",
    "Dr. Mohammad Osiur Rahman",
    "Dr. Rashed Mustafa",
    "Dr. Mohammad Khairul Islam",
    "Dr. Kazi Ashrafuzzaman",
    "Mr. Mohammad Rokan UddinFaruque",
    "Mrs. Nasrin Sultana",
    "Dr. Asaduzzaman",
    "Mr. H.S. Faruq Alam",
    "Dr. Mohammed Hanif Siddique",
    "Dr. Mohammed Abdur Rauf",
  ],
  roles: ["Member", "Chairman", "External member"],
};

// const peoples = ["1","2", "3", "4", "5"];
const FormExamCommittee = () => {
  const [peoples, setPeoples] = useState([1, 2]);
  function addnewpeople(e) {
    let len = peoples.length + 1;
    setPeoples([...peoples, len]);
  }
  function removepeople(e) {
    let peoples2 = peoples.slice(0, -1);
    // console.log(e);
    setPeoples([...peoples2]);
  }
  const programOptions = ["BSc", "MSc"];
  return (
    <div className="flex h-full w-full justify-center">
      <form action="" className="w-9/12 min-w-fit max-w-4xl p-2 my-4">
        <div className="">
          {" "}
          {/* exam information*/}
          <div className="mb-8">
            <span className="text-xl sm:text-2xl">Exam information</span>
          </div>
          <div className="grid grid-cols-3 gap-x-8 gap-y-8">
            <div className="col-span-3 md:col-span-1">
              <Inputcmp
                type="select"
                label="Select program"
                options={programOptions}
                required="true"
                name="program"
                id="program"
              ></Inputcmp>
            </div>
            <div className="col-span-3 md:col-span-1">
              <Inputcmp
                type="text"
                label="Exam year"
                required="true"
                name="exam-year"
                id="exam-year"
                placeholder="e.g. 2020"
              ></Inputcmp>
            </div>
            <div className="min-w-fit col-span-3 md:col-span-1">
              <Inputcmp
                type="number"
                label="Semester number"
                required="true"
                name="semester-number"
                id="semester-number"
                placeholder="e.g. 2020"
              ></Inputcmp>
            </div>
          </div>
        </div>
        <hr className="border border-slate-300 mt-12"></hr>
        <div className="mb-8   mt-8">
          {" "}
          {/* committee information*/}
          <div>
            <span className="text-xl sm:text-2xl block">
              Committee information
            </span>
          </div>
          <div className="mt-8">
            <Table options={options} peoples={peoples}></Table>
          </div>
        </div>
        <div className="w-full mb-8 flex gap-4">
          <Buttoncmp
            onClick={addnewpeople}
            variant="stse"
            size="min"
            type="button"
          >
            <PlusCircleIcon></PlusCircleIcon>
          </Buttoncmp>
          <Buttoncmp
            onClick={removepeople}
            variant="stse"
            size="min"
            type="button"
          >
            <MinusCircleIcon></MinusCircleIcon>
          </Buttoncmp>
        </div>
        <Buttoncmp type="submit" name="Save" variant="stpr"></Buttoncmp>
      </form>
    </div>
  );
};

export default FormExamCommittee;
