import { TrashIcon } from '@heroicons/react/24/solid';
import React, { useRef, useState } from 'react';
import { useContext, useEffect } from 'react';
import Buttoncmp from './Buttoncmp';
import Dropdown from './Dropdown';
import Inputcmp from './Inputcmp';
import { StatusContext } from './StatusContext';
import { DashboardContext } from './DashboardContext';

const TableCell = (prop) => {
  // const { setOverflow } = useContext(DashboardContext);
  const {
    col,
    row,
    cellOptions,
    isActive,
    onActive,
    onDelete,
    id,
    pvalue,
    onUpdate,
  } = prop;
  const { message, setStatus } = useContext(StatusContext);
  // Initially, the value would be from the array or ''
  const [value, setValue] = useState(pvalue !== undefined ? pvalue : '');
  const [input, showInput] = useState(false);
  const [valid, setValid] = useState(true);
  const cellRef = useRef(null);
  const regExp = new RegExp(col.regex && col.regex);
  let editable = false;
  let inputBlock;

  // So, when any value is selected from the dropdownlist, we're doing
  // something here...
  function handleSelect(value) {
    onUpdate(value);
    setValue(value);
    showInput(false);
  }
  // For checking valid input
  const checkRegex = (text) => {
    const isValid = regExp.test(text);
    setValid(isValid);
    return isValid;
  };
  // For two types of data, we're generating general dropdown or editable field
  if (col.type == 'dropdown') {
    inputBlock = (
      <Dropdown
        options={cellOptions}
        search={true}
        name={col.col}
        onSelect={handleSelect}
        opened={false}
        preSelect={value}
        variant="table"
      ></Dropdown>
    );
  } else if (col.col != 'No' && col.type != 'button') {
    editable = true;
  }

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const unfocus = (e) => {
      if (!cellRef.current.contains(e.target)) {
        showInput(false);
      }
    };
    document.body.addEventListener('click', unfocus);
    return () => document.body.removeEventListener('click', unfocus);
  }, []);

  return (
    <div
      className={`duration-200 relative cursor-pointer table-cell align${
        col.type === 'button' && 'align-center text-center'
      }
      ${!valid && 'bg-red-50 ring-2 ring-red-900'}
      border-r border-b border-slate-300 last-of-type:border-r-0 focus:shadow-xl focus:ring-cyan-700 focus:bg-slate-50 focus:outline-none  focus:ring-2 p-2 hover:bg-blue-100`}
      ref={cellRef}
      onBlur={(e) => {
        setIsFocused(false);
        if (col.regex) {
          const isValid = checkRegex(e.target.innerText);
          onUpdate(e.target.innerText, isValid);
        } else if (col.type != 'button') {
          onUpdate(e.target.innerText);
        }
        onActive(e, false);
      }}
      contentEditable={editable}
      suppressContentEditableWarning={true}
    >
      {col.type == 'dropdown' && (
        <div className="flex items-center ">{inputBlock}</div>
      )}
      {col.type != 'dropdown' && !input && value}
      {col.type == 'button' && (
        <Buttoncmp
          label={col.label ? col.label : 'null'}
          variant={col.variant ? col.variant : 'dasi'}
          type="button"
          onClick={
            col.label == 'Delete'
              ? onDelete
              : col.label == 'View'
              ? onView
              : null
          }
        ></Buttoncmp>
      )}
    </div>
  );
};

export default TableCell;
