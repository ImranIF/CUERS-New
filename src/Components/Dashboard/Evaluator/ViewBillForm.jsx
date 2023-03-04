///viewBIllForm,jsx

import React, { useEffect, useState } from "react";
import { useRef } from "react";
import Buttoncmp from "../../UI/Buttoncmp";
import Tablenew from "../../UI/Tablenew";
import BillPdf from "./BillPdf";

const ViewBillForm = () => {
  let Bill = [
    {
      "activity_type_id": 1,
      "sector_or_program": "Honours",
      "factor": "Half/Full part",
      "front": 1,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")

    },
    {
      "activity_type_id": 1,
      "sector_or_program": "Lab",
      "factor": "No of exams",
      "front": 1,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 1,
      "sector_or_program": "Tutorial",
      "factor": "No of exams",
      "front": 1,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 1,
      "sector_or_program": "Terminal",
      "factor": "No of exams",
      "front": 1,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")

    },
    {
      "activity_type_id": 3,
      "sector_or_program": "All programs",
      "factor": "No of members",
      "front": 2, "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 2,
      "sector_or_program": "Honours",
      "factor": "Half/Full part",
      "front": 3, "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 2,
      "sector_or_program": "Lab",
      "factor": "No of exams",
      "front": 3, "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 2,
      "sector_or_program": "Tutorial",
      "factor": "No of exams",
      "front": 3,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 2,
      "sector_or_program": "Tutorial",
      "factor": "No of exams",
      "front": 3,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 10,
      "sector_or_program": "By computer",
      "factor": "No of pages",
      "front": 4,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 10,
      "sector_or_program": "By hand",
      "factor": "No of pages",
      "front": 4,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 8,
      "sector_or_program": "Honours",
      "factor": "No of students",
      "front": 13,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 11,
      "sector_or_program": "By computer",
      "factor": "No of pages",
      "front": 5,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 11,
      "sector_or_program": "By hand",
      "factor": "No of pages",
      "front": 5,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 4,
      "sector_or_program": "Honours",
      "factor": ["No of students", "Half/full part"],
      "front": 6,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 4,
      "sector_or_program": "Lab",
      "factor": "No of students",
      "front": 6,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 4,
      "sector_or_program": "Tutorial",
      "factor": ["No of students", "No of exams"],
      "front": 6,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 4,
      "sector_or_program": "Terminal",
      "factor": ["No of students", "No of exams"],
      "front": 6,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 4,
      "sector_or_program": "Presentation",
      "factor": ["No of students", "No of exams"],
      "front": 6,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 4,
      "sector_or_program": "Scrutiny",
      "factor": "No of students",
      "front": 6,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 6,
      "sector_or_program": "Honours",
      "factor": "No of students",
      "front": 7,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 7,
      "sector_or_program": "Industrial tour",
      "factor": "No of students",
      "front": 8,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 7,
      "sector_or_program": "Notebook",
      "factor": "No of students",
      "front": 8,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 7,
      "sector_or_program": "Project report",
      "factor": "No of students",
      "front": 8,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 9,
      "sector_or_program": "Honours (1st year to 3rd year)",
      "factor": "No of students",
      "front": 10,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 9,
      "sector_or_program": "Honours (4th year)",
      "factor": "No of students",
      "front": 10,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 12,
      "sector_or_program": "Honours (1st year to 3rd year)",
      "factor": "No of students",
      "front": 11,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 12,
      "sector_or_program": "Honours (4th year)",
      "factor": "No of Students",
      "front": 11,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 13,
      "sector_or_program": "Honours (1st year to 3rd year)",
      "factor": "No of students",
      "front": 12,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 13,
      "sector_or_program": "Honours (4th year)",
      "factor": "No of Students",
      "front": 12,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 14,
      "sector_or_program": "All Programs",
      "factor": "No of members",
      "front": 14,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 15,
      "sector_or_program": "All Programs",
      "factor": "No of members",
      "front": 15,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 16,
      "sector_or_program": "All Programs",
      "factor": "No of exams",
      "front": 16,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
  ];
  const [billData, setBillData] = useState([]);
  useEffect(() => {
    async function activityBill() {
      console.log(Bill);
      if(JSON.parse(sessionStorage.getItem("billItem")) === undefined || JSON.parse(sessionStorage.getItem("billItem")) === null){
const response = await fetch(
        "http://localhost:3000/users/activityBillData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Bill }),
        }
      );
      const data = await response.json();
      return data;
      }
      else{
        return JSON.parse(sessionStorage.getItem("billItem"));
      }
}

    activityBill().then((data) => {
	 const alData= data.filter((item) => item.hasOwnProperty("activity_type_id"));
   sessionStorage.setItem("billItem", JSON.stringify(alData));
      setBillData(alData);
    });
  }, []);
  return (
        <div>
      <div className="mb-8 mt-8">
          <span className="text-xl sm:text-2xl block">
            View Bill Form
          </span>
      </div>
          <BillPdf billData = {billData}></BillPdf>
          </div>
  );
};

export default ViewBillForm;

