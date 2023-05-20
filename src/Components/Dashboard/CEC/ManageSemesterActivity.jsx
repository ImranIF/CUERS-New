import React from 'react';
import Dropdown from '../../UI/Dropdown';
import Tablenew from '../../UI/Tablenew';
import patterns from '../../Resources/RegexPatterns';

const tablecols = [
  {
    col: 'activity_type_id',
    type: 'dropdown',
    values: ['3', '6', '9', '10', '11', '12', '13', '14', '15'],
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
    regex: patterns.bengaliPattern.number,
    regexMessage: 'e.g. 12',
    required: true,
  },
  {
    col: 'Delete',
    type: 'button',
    label: 'Delete',
    variant: 'dasi',
  },
];

const ManageSemesterActivity = () => {
  const semester_no = sessionStorage.getItem('semester_no');
  console.log('At semester: ', semester_no);
  return (
    <div>
      <div className="mb-8 mt-8">
        <span className="text-xl sm:text-2xl block text-center">
          Manage Semester Activity
        </span>
      </div>

      <Tablenew
        tableCols={tablecols}
        loadCondition={[{ semester_no: `${semester_no}` }]}
        tableName="Processes_Semester_Activity"
      ></Tablenew>
    </div>
  );
};

export default ManageSemesterActivity;
