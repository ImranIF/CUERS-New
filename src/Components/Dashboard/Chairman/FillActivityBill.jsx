import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import Buttoncmp from '../../UI/Buttoncmp';
import Tablenew from '../../UI/Tablenew';
import patterns from '../../Resources/RegexPatterns';
import axios from 'axios';
import { json } from 'react-router';
import { toBanglaNumber } from '../../../Modules/toBanglaNumber';
console.log(sessionStorage.getItem('sector_or_program'));
const x = sessionStorage.getItem('sector_or_program');
console.log(JSON.parse(x));
const storageLabel = 'activity_type_id';
const dynamicCol = ['id', 'activity_name'];
const FillActivityBill = () => {
  const [tableCols, setTableCols] = useState([]);
  useEffect(() => {
    const updatedCols = [
      {
        col: 'activity_type_id',
        type: 'dropdown',
        data_type: 'number',
        values: sessionStorage.getItem('activity_type_id')
          ? JSON.parse(sessionStorage.getItem('activity_type_id'))
          : null,
        required: true,
        addNew: false,
      },
      {
        col: 'sector_or_program',
        type: 'dropdown',
        required: true,
      },
      {
        col: 'category',
        type: 'dropdown',
        required: true,
      },
      {
        col: 'factor',
        type: 'dropdown',
        required: true,
      },
      {
        col: 'quantity_initial',
        type: 'number',
        regex: patterns.bengaliPattern.number,
        regexMessage: 'e.g. 2 or 2.5',
        required: true,
      },
      {
        col: 'quantity_final',
        type: 'number',
        regex: patterns.bengaliPattern.number,
        regexMessage: 'e.g. 2 or 2.5',
        required: true,
      },
      {
        col: 'min_bill',
        type: 'number',
        regex: patterns.bengaliPattern.number,
        regexMessage: 'e.g. 1200',
        required: true,
      },
      {
        col: 'bill',
        type: 'number',
        regex: patterns.bengaliPattern.number,
        regexMessage: 'e.g. 1200',
        required: true,
      },
      {
        col: 'Delete',
        type: 'button',
        label: 'Delete',
        variant: 'dasi',
      },
    ];

    setTableCols([...updatedCols]);
  }, [sessionStorage.getItem('activity_type_id')]);

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

  useEffect(() => {
    if (sessionStorage.getItem(dynamicCol[0]) === null) {
      const postData = async () => {
        try {
          const params = {
            tableName: 'Activity_Type',
            operation: 'load',
            cols: [dynamicCol],
          };
          console.log('Params is: ', params);
          let response = await axios.post(
            'http://localhost:3000/users/processDropDownData',
            { data: { params } }
          );

          console.log('Post response:', response.data);

          console.log('Bangal: ', response.data);
          let data =
            response.data && response.data.map((item) => toBanglaNumber(item));

          sessionStorage.setItem(storageLabel, data);
        } catch (error) {
          console.error('Error posting data:', error);
        }
      };
      console.log(postData());
    }
  });

  return (
    <div className="mb-8 mt-8">
      <div>
        <span className="text-xl sm:text-2xl block">
          Activity Bill information
        </span>
      </div>
      <div className="mt-8">
        <Tablenew
          tableCols={tableCols}
          tableName="Activity"
          loadCondition={[]}
        ></Tablenew>
      </div>
    </div>
  );
};

export default FillActivityBill;
