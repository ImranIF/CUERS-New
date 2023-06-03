import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useContext } from 'react';
import Buttoncmp from '../../UI/Buttoncmp';
import Inputcmp from '../../UI/Inputcmp';
import Table from '../../UI/Table';
import { useState } from 'react';
import Dropdown from '../../UI/Dropdown';
import Tablenew from '../../UI/Tablenew';
import patterns from '../../Resources/RegexPatterns';

import { DropdownOptionsContext } from '../../DropdownOptionsContext';
const tableCols = [
  // { col: "No", type: "row", required: true, },
  {
    col: 'evaluator_id',
    type: 'number',
    regex: patterns.bengaliPattern.number,
    regexMessage: 'e.g. 1013',
    required: true,
  },
  {
    col: 'role',
    type: 'dropdown',
    required: true,
  },
  {
    col: 'program',
    type: 'dropdown',
    required: true,
  },
  {
    col: 'semester_no',
    type: 'dropdown',
    required: true,
  },
  {
    col: 'year',
    type: 'number',
    regex: patterns.bengaliPattern.number,
    regexMessage: 'e.g. 2023',
    required: true,
  },
  {
    col: 'Delete',
    type: 'button',
    label: 'Delete',
    variant: 'dasi',
  },
];

const FormExamCommittee = () => {
  // const peoples = ["1","2", "3", "4", "5"];
  const { dropdownOptions, updateDropdownOptions } = useContext(
    DropdownOptionsContext
  );
  useEffect(() => {
    const fetchOptions = async () => {
      console.log('Here nothing happens');
      try {
        const response = await fetch('/Data/dropdown_options.json');
        const data = await response.json();
        console.log('Data from json ', data);
        updateDropdownOptions(data);
        console.log('Data from json to context: ', dropdownOptions);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };
    fetchOptions();
  }, []);
  const programOptions = ['BSc', 'MSc'];
  return (
    <div className="">
      <div className="mb-8  mt-8">
        <span className="text-xl sm:text-2xl block">Committee information</span>
      </div>
      <div>
        <Tablenew
          tableCols={tableCols}
          tableName={'Exam_Committee'}
          loadCondition={[]}
        ></Tablenew>
      </div>
    </div>
  );
};

export default FormExamCommittee;
