import { TrashIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useContext } from "react";
import Buttoncmp from "./Buttoncmp";
import Dropdown from "./Dropdown";
import Inputcmp from "./Inputcmp";
import { StatusContext } from "./StatusContext";

const TableCell = (prop) => {
  const { col, row, isActive, onActive, onDelete, id, pvalue, onUpdate } = prop;
  const { message, setStatus } = useContext(StatusContext);
  const [value, setValue] = useState(pvalue ? pvalue : "");
  const [input, showInput] = useState(false);
  const [valid, setValid] = useState(true);
  const regExp = new RegExp(col.regex && col.regex);
  let editable = false;
  let inputBlock;
  function handleSelect(value) {
    onUpdate(value);
    setValue(value);
    showInput(false);
  }
  const checkRegex = (text) => {
    const isValid = regExp.test(text);
    setValid(isValid);
    return isValid;
  };
  if (col.type == "dropdown") {
    inputBlock = (
      <Dropdown
        options={col.values}
        search={true}
        name={col.col}
        onSelect={handleSelect}
        opened={true}
        preSelect={value}
        variant="table"
      ></Dropdown>
    );
  } else if (col.col != "No" && col.type != "button") {
    editable = true;
  }
  return (
    <div
      className={`duration-200 relative cursor-pointer table-cell align ${
        col.type === "button" && "align-center text-center"
      }
      ${!valid && "bg-red-50 ring-2 ring-red-900"}
      border-r border-b border-slate-300 last-of-type:border-r-0 focus:ring-cyan-700 focus:bg-slate-50 focus:outline-none  focus:ring-2 p-2 hover:bg-blue-100`}
      onClick={(e) => {
        if (col.type == "dropdown") showInput(!input);
        e.stopPropagation();
        onActive(e);
      }}
      onBlur={(e) => {
        if (col.regex) {
          const isValid = checkRegex(e.target.innerText);
          onUpdate(e.target.innerText, isValid);
        } else if (col.type != "button") {
          onUpdate(e.target.innerText);
        }
        onActive(e, false);
      }}
      contentEditable={editable}
      suppressContentEditableWarning={true}
    >
      {col.type == "dropdown" && (
        <div className="flex items-center ">
          {
            <div className={`${input && isActive ? "block" : "hidden"}`}>
              {inputBlock}
            </div>
          }
        </div>
      )}
      {/* {data.col == "No" && pvalue} */}
      {!input && value}
      {col.type == "button" && (
        <Buttoncmp
          label={col.label ? col.label : "null"}
          variant={col.variant ? col.variant : "dasi"}
          type="button"
          onClick={
            col.label == "Delete"
              ? onDelete
              : col.label == "View"
              ? onView
              : null
          }
        ></Buttoncmp>
      )}
    </div>
  );
};

export default TableCell;
