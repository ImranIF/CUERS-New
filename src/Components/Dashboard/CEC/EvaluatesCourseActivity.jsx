import { React, useContext, useEffect } from 'react';
import Dropdown from '../../UI/Dropdown';
import Tablenew from '../../UI/Tablenew';
import patterns from '../../Resources/RegexPatterns';

import { DropdownOptionsContext } from '../../DropdownOptionsContext';

import { FilterContext } from '../../UI/FilterContext';
import { Filter } from '../../UI/Filter';

const tableCols = [
  {
    col: 'activity_type_id',
    type: 'dropdown',
    data_type: 'number',
    mapping: true,
    required: true,
    optionInfo: {
      dynamicCol: ['id', 'activity_name'],
      tableName: 'Activity_Type',
    },
    storageLabel: 'activity_type_id',
    filter: 'dropdown',
  },
  {
    col: 'sector_or_program',
    type: 'dropdown',
    required: true,
    filter: 'dropdown',
  },
  {
    col: 'evaluator_id',
    type: 'dropdown',
    data_type: 'number',
    mapping: true,
    required: true,
    optionInfo: {
      dynamicCol: ['evaluator_id', 'evaluator_name'],
      tableName: 'Evaluator',
    },
    storageLabel: 'evaluator_id',
    filter: 'dropdown',
  },
  {
    col: 'course_id',
    type: 'dropdown',
    data_type: 'text',
    mapping: true,
    optionInfo: {
      dynamicCol: ['id', 'title'],
      tableName: 'Course',
    },
    storageLabel: 'course_id',
    //need to be dynamic
    required: true,
    filter: 'dropdown',
  },
  {
    col: 'semester_no',
    type: 'dropdown',
    required: true,
    filter: 'dropdown',
  },
  {
    col: 'factor',
    type: 'dropdown',
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

  useEffect(() => {
    const postData = async (colInfo) => {
      console.log('colinfo: ', colInfo);
      try {
        const params = {
          dynamicOps: true,
          tableName: colInfo.optionInfo.tableName,
          operation: 'load',
          cols: [colInfo.optionInfo.dynamicCol],
          storageLabel: colInfo.storageLabel,
          condition: colInfo.optionInfo.condition,
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
          if (parsedData.length !== 0) {
            return parsedData;
          }
        } else {
          throw new Error('Error posting data');
        }
      } catch (error) {
        console.error('Error posting data:', error);
      }
    };

    const dynamicCols = tableCols.filter((item) => item.mapping);
    console.log('dynamiccols: ', dynamicCols);
    const fetchSequentially = async (index) => {
      if (index < dynamicCols.length) {
        const data = await postData(dynamicCols[index]);
        if (data) {
          updateDropdownOptions(data);
        }
        fetchSequentially(index + 1);
      }
    };
    fetchSequentially(0);
  }, []);

  const semester_no = sessionStorage.getItem('semester_no');
  console.log('at course: ', semester_no);
  return (
    <div>
      <div className="mb-8">
        <Filter></Filter>
      </div>
      <Tablenew
        tableCols={tableCols}
        loadCondition={[{ semester_no: `${semester_no}` }]}
        tableName="Evaluates_Course_Activity"
      ></Tablenew>
    </div>
  );
};

export default EvaluatesCourseActivity;
