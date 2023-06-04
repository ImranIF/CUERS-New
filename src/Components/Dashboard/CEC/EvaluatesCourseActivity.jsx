import { React, useContext, useEffect } from 'react';
import Dropdown from '../../UI/Dropdown';
import Tablenew from '../../UI/Tablenew';
import patterns from '../../Resources/RegexPatterns';

import { DropdownOptionsContext } from '../../DropdownOptionsContext';

const tablecols = [
  {
    col: 'activity_type_id',
    type: 'dropdown',
    data_type: 'number',
    mapping: true,
    required: true,
    optionInfo: {
      dynamicCol: ['id', 'activity_name'],
      tableName: 'Activity_Type',
      // condition: 'category="কোর্স কার্যকলাপ"',
    },
    storageLabel: 'activity_type_id',
  },
  {
    col: 'sector_or_program',
    type: 'dropdown',
    required: true,
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
  },
  {
    col: 'semester_no',
    type: 'dropdown',
    required: true,
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

    const dynamicCols = tablecols.filter((item) => item.mapping);
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
