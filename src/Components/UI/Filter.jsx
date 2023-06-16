import {
  AdjustmentsHorizontalIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';
import React, { useContext, useState } from 'react';
import { toBanglaNumber } from '../../Modules/toBanglaNumber';
import { toEnglishNumber } from '../../Modules/toEnglishNumber';
import Buttoncmp from './Buttoncmp';
import Dropdown from './Dropdown';
import { FilterContext } from './FilterContext';
import Inputcmp from './Inputcmp';
export const Filter = (prop) => {
  const { filterFields, updateFilterFields, filterValues, updateFilterValues } =
    useContext(FilterContext);
  const [toClearFilter, setClearFilter] = useState(false);

  const onFilterSelect = (option, item, toDelete) => {
    let toStore = option;
    if (toStore != null && item.mapping && item.mapping == true) {
      if (item.data_type && item.data_type == 'number')
        toStore = option.split('-')[0].trim();
      else if (item.col == 'course_id') {
        toStore = toBanglaNumber(option.split('-')[0].trim());
      }
    }
    updateFilterValues(item.col, item.filter, toStore, toDelete);
  };

  const onTextFilter = (e, type, col, toDelete) => {
    if (e.target.value == '') {
      updateFilterValues(col, type, null, true);
    } else {
      updateFilterValues(col, type, e.target.value, false);
    }
  };
  const clearFilter = () => {
    Object.keys(filterValues).map((item) => {
      updateFilterValues(item, null, null, true);
    });
    setClearFilter(!toClearFilter);
  };
  console.log('Filter fields here: ', filterFields);
  return (
    <div className="w-fit flex gap-x-2 border-2 p-4 rounded-lg bg-slate-200 justify-start items-start">
      {filterFields &&
        filterFields.map((item) => (
          <div key={item.col}>
            {item.filter == 'dropdown' && (
              <div className="max-w-[200px]">
                <Dropdown
                  id={item.col}
                  search={true}
                  name={item && item.col}
                  opened={false}
                  onSelect={onFilterSelect}
                  col={item}
                  variant="filter"
                  toClearFilter={toClearFilter}
                ></Dropdown>
              </div>
            )}
            {item.filter == 'text' && (
              <Inputcmp
                type="text"
                variant="filter"
                name={item.col}
                id={item.col}
                placeholder={item.col}
                onChange={onTextFilter}
                toClearFilter={toClearFilter}
              ></Inputcmp>
            )}
          </div>
        ))}
      <Buttoncmp
        label="Clear"
        variant="stsi"
        size="min"
        onClick={() => {
          clearFilter();
        }}
      >
        <XCircleIcon className="w-6 h-6"></XCircleIcon>
      </Buttoncmp>
    </div>
  );
};
