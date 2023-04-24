import React from "react";
import Dropdown from "../../UI/Dropdown";
import Tablenew from "../../UI/Tablenew";
import patterns from "../../Resources/RegexPatterns";

const tablecols = [
  {
    col: "activity_type_id",
    type: "dropdown",
    values: [1, 2, 4, 5, 7, 8, 16, 17],
    required: true,
  },
  {
    col: "sector_or_program",
    type: "dropdown",
    values: [
      "Honours",
      "Masters",
      "Tutorial",
      "Terminal",
      "Certificate course",
      "Lab",
      "Presentation",
      "Scrutiny",
      "Lab notebook",
      "Masters thesis",
      "M.Phil thesis",
      "PhD thesis",
      "Industrial tour",
      "By computer",
      "By hand",
      "All programs",
    ],
    required: true,
  },
  {
    col: "evaluator_id",
    type: "number",
    regex: patterns.bengaliPattern.number,
    regexMessage: "e.g. 1013",

    required: true,
  },
  {
    col: "course_id",
    type: "dropdown",
    //need to be dynamic
    values: [
      "CSE311",
      "CSE312",
      "CSE321",
      "CSE322",
      "CSE331",
      "STA351",
      "ECO381",
      "CSE811",
      "CSE812",
      "CSE813",
      "CSE814",
      "CSE815",
      "CSE816",
      "CSE817",
      "CSE818",
      "CSE819",
      "CSE821",
      "CSE823",
    ],
    required: true,
  },
  {
    col: "semester_no",
    type: "dropdown",
    values: [1, 2, 3, 4, 5, 6, 7, 8],
    required: true,
  },
  {
    col: "factor",
    type: "dropdown",
    values: [
      "Hours",
      "Days",
      "Half/Full part",
      "No of students",
      "No of exams",
      "No of pages",
      "No of questions",
    ],
    required: true,
  },
  {
    col: "quantity",
    type: "number",
    required: true,
    regex: patterns.bengaliPattern.number,
    regexMessage: "e.g. 12",
  },
  {
    col: "Delete",
    type: "button",
    label: "Delete",
    variant: "dasi",
  },
];
const EvaluatesCourseActivity = () => {
  const semester_no = sessionStorage.getItem("semester_no");
  console.log("at course: ", semester_no);
  return (
    <div>
      <div className="mb-8 mt-8">
        <span className="text-xl sm:text-2xl block text-center">
          Manage Course Activity
        </span>
      </div>

      <Tablenew
        tableCols={tablecols}
        loadCondition={[{ semester_no: `${semester_no}` }]}
        tableName="Evaluates_Course_Activity"
      ></Tablenew>
    </div>
  );
};

export default EvaluatesCourseActivity;
