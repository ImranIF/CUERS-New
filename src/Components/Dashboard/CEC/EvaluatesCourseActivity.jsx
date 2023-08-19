import { React, useContext, useEffect } from 'react';
import Dropdown from '../../UI/Dropdown';
import Tablenew from '../../UI/Tablenew';
import patterns from '../../Resources/RegexPatterns';

import { DropdownOptionsContext } from '../../DropdownOptionsContext';

import { FilterContext } from '../../UI/FilterContext';
import { Filter } from '../../UI/Filter';

const tableCols = [
    {
        // col represents the name of the col that is identical to the database
        col: 'activity_type_id',
        // type represents the input option for this column
        type: 'dropdown',
        // data_type represents the data type of the data of this column.
        // Helpful for authentication and data modification to backend and database
        data_type: 'number',
        /*
         * mapping refers to shown options list to real data mapping. So
         * when I select a option from the list what value it should
         * represent. We're using this because, we're showing two concated
         * columns as options for this column. So we need to map each option to
         * real value they represent. For example, "1 - question setting" is
         * mapped to 1. And 1 will be stored and used for further calculation.
         * The mapping is done on the backend.
         */
        mapping: true,
        // required: the user must fill this to upload the completed row to the
        // database
        required: true,
        // 'id' and 'activity name' will be loaded as option for this column
        // tableName says from where to load this data
        optionInfo: {
            dynamicCol: ['id', 'activity_name'],
            tableName: 'Activity_Type',
        },
        // the fetched dropdown options('id' + 'activity name') will be stored
        // as the 'activity_type_id' object in the dropdown_option.json file on
        // backend
        storageLabel: 'activity_type_id',
        // this option is for showing dropdown to filter this column
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
        /*
         * regex is used to handle authentication of data.
         * We'll use dedicated module to authenticate data in future where
         * regex will be handled also.
         */
        regex: patterns.bengaliPattern.number,
        /*
         * regexMessage represents the message to show if there is an error found by
         * regex checking
         */
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

    /*
     * filterFields is used to capture the fields of the current table. So If I
     * am now at Evaluates_Course_Activity table, then filterFields will have the
     * cols that has property "filter : true".
     * -----------
     * Then Filter component will load those fields or cols as filter options
     */
    const { filterFields, updateFilterFields } = useContext(FilterContext);
    useEffect(() => {
        const tobeFilter = tableCols.filter((item) =>
            // Only capturing cols with "filter" property
            item.hasOwnProperty('filter')
        );
        updateFilterFields(tobeFilter);
    }, []);

    useEffect(() => {
        // this is used to load the dropdown options from the backend
        const postData = async (colInfo) => {
            console.log('colinfo: ', colInfo);
            try {
                // params contains the necessary information for a particular
                // column(filter is enabled)
                const params = {
                    // dynamicOps: true means we need to load these options from database and then format them and send them to front end
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
                        // parsedData contains the dropdown options for a
                        // particular column where filter is enabled
                        return parsedData;
                    }
                } else {
                    throw new Error('Error posting data');
                }
            } catch (error) {
                console.error('Error posting data:', error);
            }
        };

        // dynamicCols array contains the columns for which we're going to load the
        // dynamic options
        const dynamicCols = tableCols.filter((item) => item.mapping);
        console.log('dynamiccols: ', dynamicCols);
        const fetchSequentially = async (index) => {
            if (index < dynamicCols.length) {
                const data = await postData(dynamicCols[index]);
                if (data) {
                    // this is a context function from DropdownOptionsContext
                    // This is used to update the fetched options
                    updateDropdownOptions(data);
                }

                // We are fetching the options of each column one by one
                fetchSequentially(index + 1);
            }
        };
        // starting fetching options from the first element of the dynamicCols
        fetchSequentially(0);
    }, []);

    const semester_no = sessionStorage.getItem('semester_no');
    console.log('at course: ', semester_no);
    return (
        <div>
            <div className="mb-8">
                {/* Using the filter component*/}
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
