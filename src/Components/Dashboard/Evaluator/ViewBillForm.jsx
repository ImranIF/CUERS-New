///viewBIllForm,jsx
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import Buttoncmp from "../../UI/Buttoncmp";
import Spin from "../../UI/Spin";
import Tablenew from "../../UI/Tablenew";
import BillPdf from "./BillPdf";
import BillFormDropdown from "../../UI/BillFormDropdown";
import { use } from "i18next";

const ViewBillForm = () => {
  const [selectedSemester, setSelectedSemester] = useState("");
  const [semesters_they_in, setSemesters_they_in] = useState([]);
  
  

  const [temp, setTemp] = useState(''); // semester temporary saved for useeffect new bill generation
  function updateSemester(selectSemester){
    setSelectedSemester(selectSemester);
    sessionStorage.setItem("semester_no", selectSemester);
    console.log(selectSemester);
  }
  if(selectedSemester == ""){
    // <BillFormDropdown updateSemester={updateSemester} />
    setSelectedSemester(sessionStorage.getItem("semester_no"));
    setTemp(sessionStorage.getItem("semester_no"));
  }
  console.log(selectedSemester);
  let Bill ;
 useEffect(() => {
   Bill = [
     {
       activity_type_id: 1,
       sector_or_program: "অনার্স",
       factor: "অর্ধ/পূর্ণ",
       front: "1.1",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 1,
       sector_or_program: "ব্যবহারিক",
       factor: "পরীক্ষার সংখ্যা",
       front: "1.2",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 1,
       sector_or_program: "টিউটোরিয়াল",
       factor: "পরীক্ষার সংখ্যা",
       front: "1.3",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 1,
       sector_or_program: "টার্মিনাল",
       factor: "পরীক্ষার সংখ্যা",
       front: "1.4",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 3,
       sector_or_program: "সব খাতসমূহ",
       factor: "সদস্য সংখ্যা",
       front: "2",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 2,
       sector_or_program: "অনার্স",
       factor: "অর্ধ/পূর্ণ",
       front: "3",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 2,
       sector_or_program: "ব্যবহারিক",
       factor: "পরীক্ষার সংখ্যা",
       front: "3",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 2,
       sector_or_program: "টিউটোরিয়াল",
       factor: "পরীক্ষার সংখ্যা",
       front: "3",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 10,
       sector_or_program: "কম্পিউটার",
       factor: "পৃষ্ঠার সংখ্যা",
       front: "4",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 10,
       sector_or_program: "হাতে লেখা",
       factor: "পৃষ্ঠার সংখ্যা",
       front: "4",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 8,
       sector_or_program: "অনার্স",
       factor: "ছাত্রের সংখ্যা",
       front: "13",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 11,
       sector_or_program: "কম্পিউটার",
       factor: "পৃষ্ঠার সংখ্যা",
       front: "5",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 11,
       sector_or_program: "হাতে লেখা",
       factor: "পৃষ্ঠার সংখ্যা",
       front: "5",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 4,
       sector_or_program: "অনার্স",
       factor: "ঘণ্টা",
       front: "6.1",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 4,
       sector_or_program: "ব্যবহারিক",
       factor: "ছাত্রের সংখ্যা",
       front: "6.2",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 4,
       sector_or_program: "টিউটোরিয়াল",
       factor: "পরীক্ষার সংখ্যা",
       front: "6.3",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 4,
       sector_or_program: "টার্মিনাল",
       factor: ["ছাত্রের সংখ্যা", "পরীক্ষার সংখ্যা"],
       front: "6.4",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 4,
       sector_or_program: "প্রসেন্টেশন",
       factor: ["ছাত্রের সংখ্যা", "পরীক্ষার সংখ্যা"],
       front: "6.5",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 5,
       sector_or_program: "ব্যবহারিক",
       factor: ["ঘণ্টা"],
       front: "9",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 4,
       sector_or_program: "স্ক্রুটিনী",
       factor: "ছাত্রের সংখ্যা",
       front: "6.6",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 6,
       sector_or_program: "অনার্স",
       factor: "ছাত্রের সংখ্যা",
       front: "7",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 7,
       sector_or_program: "ইন্ডাস্ট্রিয়াল ট্যুর",
       factor: "ছাত্রের সংখ্যা",
       front: "8.1",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 7,
       sector_or_program: "ব্যবহারিক নোট বুক",
       factor: "ছাত্রের সংখ্যা",
       front: "8.2",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 7,
       sector_or_program: "প্রজেক্ট রিপোর্ট",
       factor: "ছাত্রের সংখ্যা",
       front: "8.4",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 9,
       sector_or_program: "অনার্স (১ম-৩য় বর্ষ)",
       factor: "ছাত্রের সংখ্যা",
       front: "10",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 9,
       sector_or_program: "অনার্স (৪র্থ বর্ষ)",
       factor: "ছাত্রের সংখ্যা",
       front: "10",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 12,
       sector_or_program: "অনার্স (১ম-৩য় বর্ষ)",
       factor: "ছাত্রের সংখ্যা",
       front: "11",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 12,
       sector_or_program: "অনার্স (৪র্থ বর্ষ)",
       factor: "ছাত্রের সংখ্যা",
       front: "11",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 13,
       sector_or_program: "অনার্স (১ম-৩য় বর্ষ)",
       factor: "ছাত্রের সংখ্যা",
       front: "12",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 13,
       sector_or_program: "অনার্স (৪র্থ বর্ষ)",
       factor: "ছাত্রের সংখ্যা",
       front: "12",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 14,
       sector_or_program: "সব খাতসমূহ",
       factor: "সদস্য সংখ্যা",
       front: "14",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 15,
       sector_or_program: "সব খাতসমূহ",
       factor: "সদস্য সংখ্যা",
       front: "15",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
     {
       activity_type_id: 16,
       sector_or_program: "সব খাতসমূহ",
       factor: "পরীক্ষার সংখ্যা",
       front: "16",
       evaluator_id: sessionStorage.getItem("evaluator_id"),
       semester_no: selectedSemester,
     },
   ]
  ,[selectedSemester]});
  const [billData, setBillData] = useState([]);

    useEffect(() => {
      async function activityBill() {
        console.log(Bill);
        if (
          JSON.parse(sessionStorage.getItem("billItem")) === undefined ||
          JSON.parse(sessionStorage.getItem("billItem")) === null || temp !== selectedSemester
        ) {
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
          // console.log("Inside erhe", data);
          return data;
        } else {
          return JSON.parse(sessionStorage.getItem("billItem"));
        }
      }

      activityBill().then((data) => {
        data &&
          data.map((item) => {
            for (const key in item) {
              if (key !== "front") {
                const englishInteger = item[key];
                if (
                  new RegExp("^\\d+(\\.\\d+)?$").test(
                    englishInteger && englishInteger.toString()
                  )
                ) {
                  const banglaInteger = englishInteger
                    .toString()
                    .replace(/0|1|2|3|4|5|6|7|8|9/g, (match) => {
                      return "০১২৩৪৫৬৭৮৯"[match];
                    });
                  item[key] = banglaInteger;
                }
              }
            }
          });
        setBillData(data);
        setTemp(selectedSemester);
        console.log("Data here", data);
        sessionStorage.setItem("billItem", JSON.stringify(data));
      });
    }, [selectedSemester]);
  
  if (billData === null || billData === undefined || billData.length == 0) {
    return <Spin text="Calculating!"></Spin>;
  } else {
    let keys = Object.keys(billData[0]);
    keys.sort();
    return (
      <div>
        <BillFormDropdown
          updateSemester={updateSemester}
        ></BillFormDropdown>
          
        <div className="table w-full">
          <div className="table-header-group top-0 sticky bg-slate-300">
            {
              <div className="table-row">
                {keys.map((key) => (
                  <div className=" table-cell p-2 border border-slate-900">
                    {key}
                  </div>
                ))}
              </div>
            }
          </div>
          {billData &&
            billData.map((item) => (
              <div className="table-row">
                {keys.map((key) => (
                  <div className="table-cell border p-2">
                    <div>{item[key]}</div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    );
  }
};

export default ViewBillForm;
