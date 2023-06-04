import React, { useEffect, useState, useContext } from 'react';
import { useRef } from 'react';
import Buttoncmp from '../../UI/Buttoncmp';
import Tablenew from '../../UI/Tablenew';

import axios from 'axios';
import patterns from '../../Resources/RegexPatterns';
import { DropdownOptionsContext } from '../../DropdownOptionsContext';

const ManageEvaluators = (prop) => {
  // const [dropdownOptions, setDropdownOptions] = useState();
  // Generating dynamically
  const tablecols = [
    {
      col: 'evaluator_id',
      type: 'number',
      data_type: 'number',
      regex: patterns.bengaliPattern.number,
      regexMessage: 'e.g. 1013',
      required: true,
    },
    {
      col: 'evaluator_name',
      type: 'text',
      data_type: 'text',
      regex: patterns.bengaliPattern.textWithSpace,
      regexMessage: 'e.g. Dr. Rudra Pratap Deb Nath',
      required: true,
    },
    {
      col: 'designation',
      type: 'dropdown',
      required: true,
      addNew: true,
    },
    {
      col: 'university_name',
      type: 'dropdown',
      required: true,
      addNew: true,
    },
    {
      col: 'dept_name',
      type: 'dropdown',
      required: true,
      addNew: true,
    },
    {
      col: 'phone_no',
      type: 'tel',
      regex: patterns.bengaliPattern.phoneNo,
      regexMessage: 'e.g. 01234567892',
      required: true,
    },
    {
      col: 'Delete',
      type: 'button',
      label: 'Delete',
      variant: 'dasi',
    },
  ];
  const { dropdownOptions, updateDropdownOptions, createdNew, setCreatedNew } =
    useContext(DropdownOptionsContext);

  useEffect(() => {
    const postData = async () => {
      try {
        const params = {
          dynamicOps: false,
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
          let parsedData = JSON.parse(data);
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
  }, [createdNew]);

  const dosomething = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div className="mb-8 mt-8">
        <span className="text-xl sm:text-2xl block">Manage Evaluators</span>
      </div>
      <div>
        <Tablenew
          tableCols={tablecols}
          loadCondition={[]}
          tableName="Evaluator"
        ></Tablenew>
      </div>
    </div>
  );
};

export default ManageEvaluators;
