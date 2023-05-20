import React from 'react';
import Dropdown from '../../UI/Dropdown';
import Tablenew from '../../UI/Tablenew';
import patterns from '../../Resources/RegexPatterns';

// const dropdownCols = ["activity_type_id", "sector_or_program", "course_id", "semester_number"];
// dropdownCols.map((dropDownCol) => {
//     console.log(dropDownCol);
// });


//code fetch the dd

const tablecols = [
  {
    col: "activity_type_id",
    type: "dropdown",
    values: JSON.parse(sessionStorage.getItem("activity_type_id")),
    required: true,
  },
  {
    col: "sector_or_program",
    type: "dropdown",
    values: JSON.parse(sessionStorage.getItem("sector_or_program")),
    required: true,
  },
  {
    col: 'evaluator_id',
    type: 'number',
    regex: patterns.bengaliPattern.number,
    regexMessage: 'e.g. 1013',

    required: true,
  },
  {
    col: 'course_id',
    type: 'dropdown',
    //need to be dynamic
    values: JSON.parse(sessionStorage.getItem("course_id")),
    required: true,
  },
  {
    col: "semester_no",
    type: "dropdown",
    values: JSON.parse(sessionStorage.getItem("semester_no")),
    required: true,
  },
  {
    col: "factor",
    type: "dropdown",
    values: JSON.parse(sessionStorage.getItem("factor")),
    required: true,
  },
  {
    col: 'quantity',
    type: 'number',
    required: true,
    regex: patterns.bengaliPattern.number,
    regexMessage: 'e.g. 12',
  },
  {
    col: 'Delete',
    type: 'button',
    label: 'Delete',
    variant: 'dasi',
  },
];
const EvaluatesCourseActivity = () => {
  const semester_no = sessionStorage.getItem('semester_no');
  console.log('at course: ', semester_no);
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
