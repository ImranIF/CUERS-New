import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useContext } from 'react';
import Buttoncmp from '../../UI/Buttoncmp';
import Inputcmp from '../../UI/Inputcmp';
import Table from '../../UI/Table';
import { useState } from 'react';
import Dropdown from '../../UI/Dropdown';
import Tablenew from '../../UI/Tablenew';
import axios from 'axios';
import patterns from '../../Resources/RegexPatterns';

import { DropdownOptionsContext } from '../../DropdownOptionsContext';
const tableCols = [
  // { col: "No", type: "row", required: true, },
  {
    col: 'evaluator_id',
    type: 'dropdown',
    mapping: true,
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

  const dynamicCol = ['evaluator_id', 'evaluator_name'];
  useEffect(() => {
    const postData = async () => {
      try {
        const params = {
          dynamicOps: true,
          tableName: 'Evaluator',
          operation: 'load',
          cols: [dynamicCol],
          storageLabel: 'evaluator_id',
        };
        let response = await fetch(
          'http://localhost:3000/users/processDropDownData',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: { params } }),
          }
        );

        if (response.ok) {
          let data = await response.json();
          const parsedData = JSON.parse(data);
          updateDropdownOptions(parsedData);
          // sessionStorage.setItem(storageLabel, data);
        } else {
          throw new Error('Error posting data');
        }
      } catch (error) {
        console.error('Error posting data:', error);
      }
    };

    postData();
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
