import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { fetchData } from "../../../fetchModule";
import ActivityPDF from "./ActivityPDF";

export const GenerateActivityPDF = () => {
  const [activities, setActivities] = useState({});
  const semester_no = sessionStorage.getItem("semester_no");

  useEffect(() => {
    const loadActivityList = async (semester_no) => {
      const options = {
        semester_no: semester_no,
        evaluator_id: undefined,
        // to_get: course_table, semester_table, activity_list
        to_get: "activity_list",
        activity_type_id: undefined,
        sector_or_program: undefined,
      };
      fetch("http://localhost:3000/users/pdfGeneration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      })
        .then((response) => response.json())
        .then((data) => {
          setActivities(data);
        });
    };
    loadActivityList(semester_no);
  }, []);
  return (
    <div className="h-full">
      <ActivityPDF activities={activities} semester_no={semester_no}></ActivityPDF>
    </div>
  );
};
