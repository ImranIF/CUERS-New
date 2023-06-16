import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState, useContext } from 'react';
import Buttoncmp from '../../UI/Buttoncmp';
import Tablenew from '../../UI/Tablenew';
import patterns from '../../Resources/RegexPatterns';
import axios from 'axios';
import { json } from 'react-router';
import { toBanglaNumber } from '../../../Modules/toBanglaNumber';

import { DropdownOptionsContext } from '../../DropdownOptionsContext';
import { FilterContext } from '../../UI/FilterContext';
import { Filter } from '../../UI/Filter';

const FillActivityBill = () => {
  const tableCols = [
    {
      col: 'activity_type_id',
      storageLabel: 'activity_type_id',
      type: 'dropdown',
      data_type: 'number',
      mapping: true,
      required: true,
      filter: 'dropdown',
      addNew: false,
    },
    {
      col: 'sector_or_program',
      type: 'dropdown',
      required: true,
      filter: 'dropdown',
      addNew: true,
    },
    {
      col: 'category',
      type: 'dropdown',
      required: true,
      filter: 'dropdown',
      addNew: true,
    },
    {
      col: 'factor',
      type: 'dropdown',
      required: true,
      filter: 'dropdown',
      addNew: true,
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
  const { dropdownOptions, updateDropdownOptions } = useContext(
    DropdownOptionsContext
  );
  const { filterFields, updateFilterFields } = useContext(FilterContext);
  useEffect(() => {
    const tobeFilter = tableCols.filter((item) =>
      item.hasOwnProperty('filter')
    );
    updateFilterFields(tobeFilter);
  }, []);

  const dynamicCol = ['id', 'activity_name'];
  useEffect(() => {
    const postData = async () => {
      try {
        const params = {
          dynamicOps: true,
          tableName: 'Activity_Type',
          operation: 'load',
          cols: [dynamicCol],
          storageLabel: 'activity_type_id',
        };
        // console.log('Params is: ', params);
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
          if (parsedData.length !== 0) {
            updateDropdownOptions(parsedData);
          }
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

  return (
    <div>
      <div className="mb-8">
        <Filter></Filter>
      </div>
      <Tablenew
        tableCols={tableCols}
        tableName="Activity"
        loadCondition={[]}
      ></Tablenew>
    </div>
  );
};

export default FillActivityBill;
