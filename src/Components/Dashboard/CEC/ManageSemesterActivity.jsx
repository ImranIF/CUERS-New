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
    col: 'semester_no',
    type: 'dropdown',
    required: true,
    filter: 'dropdown',
  },
  {
    col: 'factor',
    type: 'dropdown',
    required: true,
    filter: 'dropdown',
  },
  {
    col: 'quantity',
    type: 'number',
    regex: patterns.bengaliPattern.number,
    regexMessage: 'e.g. 13',
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

  console.log('At semester: ', semester_no);
  return (
    <div>
      <div className="mb-8">
        <Filter></Filter>
      </div>

      <Tablenew
        tableCols={tableCols}
        loadCondition={[{ semester_no: `${semester_no}` }]}
        tableName="Processes_Semester_Activity"
      ></Tablenew>
    </div>
  );
};

export default ManageSemesterActivity;
