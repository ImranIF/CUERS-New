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
      "sector_or_program": "অনার্স",
      "factor": "অর্ধ/পূর্ণ",
      "front": 1,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")

    },
    {
      "activity_type_id": 1,
      "sector_or_program": "ব্যবহারিক",
      "factor": "পরীক্ষার সংখ্যা",
      "front": 1,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 1,
      "sector_or_program": "টিউটোরিয়াল",
      "factor": "পরীক্ষার সংখ্যা",
      "front": 1,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 1,
      "sector_or_program": "টার্মিনাল",
      "factor": "পরীক্ষার সংখ্যা",
      "front": 1,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")

    },
    {
      "activity_type_id": 3,
      "sector_or_program": "সব খাতসমূহ",
      "factor": "সদস্য সংখ্যা",
      "front": 2, "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 2,
      "sector_or_program": "অনার্স",
      "factor": "অর্ধ/পূর্ণ",
      "front": 3, "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 2,
      "sector_or_program": "ব্যবহারিক",
      "factor": "পরীক্ষার সংখ্যা",
      "front": 3, "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 2,
      "sector_or_program": "টিউটোরিয়াল",
      "factor": "পরীক্ষার সংখ্যা",
      "front": 3,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 10,
      "sector_or_program": "কম্পিউটার",
      "factor": "পৃষ্ঠার সংখ্যা",
      "front": 4,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 10,
      "sector_or_program": "হাতে লেখা",
      "factor": "পৃষ্ঠার সংখ্যা",
      "front": 4,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 8,
      "sector_or_program": "অনার্স",
      "factor": "ছাত্রের সংখ্যা",
      "front": 13,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 11,
      "sector_or_program": "কম্পিউটার",
      "factor": "পৃষ্ঠার সংখ্যা",
      "front": 5,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 11,
      "sector_or_program": "হাতে লেখা",
      "factor": "পৃষ্ঠার সংখ্যা",
      "front": 5,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 4,
      "sector_or_program": "অনার্স",
      "factor": ["ছাত্রের সংখ্যা", "অর্ধ/পূর্ণ"],
      "front": 6,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 4,
      "sector_or_program": "ব্যবহারিক",
      "factor": "ছাত্রের সংখ্যা",
      "front": 6,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 4,
      "sector_or_program": "টিউটোরিয়াল",
      "factor": ["ছাত্রের সংখ্যা", "পরীক্ষার সংখ্যা"],
      "front": 6,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 4,
      "sector_or_program": "টার্মিনাল",
      "factor": ["ছাত্রের সংখ্যা", "পরীক্ষার সংখ্যা"],
      "front": 6,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 4,
      "sector_or_program": "প্রসেন্টেশন",
      "factor": ["ছাত্রের সংখ্যা", "পরীক্ষার সংখ্যা"],
      "front": 6,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 4,
      "sector_or_program": "স্ক্রুটিনী",
      "factor": "ছাত্রের সংখ্যা",
      "front": 6,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 6,
      "sector_or_program": "অনার্স",
      "factor": "ছাত্রের সংখ্যা",
      "front": 7,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 7,
      "sector_or_program": "ইন্ডাস্ট্রিয়াল ট্যুর",
      "factor": "ছাত্রের সংখ্যা",
      "front": 8,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 7,
      "sector_or_program": "ব্যবহারিক নোট বুক",
      "factor": "ছাত্রের সংখ্যা",
      "front": 8,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 7,
      "sector_or_program": "প্রজেক্ট রিপোর্ট",
      "factor": "ছাত্রের সংখ্যা",
      "front": 8,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 9,
      "sector_or_program": "অনার্স (১ম-৩য় বর্ষ)",
      "factor": "ছাত্রের সংখ্যা",
      "front": 10,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 9,
      "sector_or_program": "অনার্স (৪র্থ বর্ষ)",
      "factor": "ছাত্রের সংখ্যা",
      "front": 10,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 12,
      "sector_or_program": "অনার্স (১ম-৩য় বর্ষ)",
      "factor": "ছাত্রের সংখ্যা",
      "front": 11,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 12,
      "sector_or_program": "অনার্স (৪র্থ বর্ষ)",
      "factor": "ছাত্রের সংখ্যা",
      "front": 11,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 13,
      "sector_or_program": "অনার্স (১ম-৩য় বর্ষ)",
      "factor": "ছাত্রের সংখ্যা",
      "front": 12,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 13,
      "sector_or_program": "অনার্স (৪র্থ বর্ষ)",
      "factor": "ছাত্রের সংখ্যা",
      "front": 12,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 14,
      "sector_or_program": "সব খাতসমূহ",
      "factor": "সদস্য সংখ্যা",
      "front": 14,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 15,
      "sector_or_program": "সব খাতসমূহ",
      "factor": "সদস্য সংখ্যা",
      "front": 15,
      "evaluator_id": sessionStorage.getItem("evaluator_id"),
      "semester_no": sessionStorage.getItem("semester_no")
    },
    {
      "activity_type_id": 16,
      "sector_or_program": "সব খাতসমূহ",
      "factor": "পরীক্ষার সংখ্যা",
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
