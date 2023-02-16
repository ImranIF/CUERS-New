import React, { useState } from "react";
import Buttoncmp from "./Buttoncmp";
import Dropdown from "./Dropdown";
import Inputcmp from "./Inputcmp";

const TableCell = (prop) => {
  const { data, row, isActive, onActive } = prop;
  const [value, setValue] = useState("");
  const [input, showInput] = useState(false);
  let editable = false;
  let inputBlock;
  function handleSelect(value) {
    setValue(value);
    showInput(false);
  }
  if (data.type == "dropdown") {
    inputBlock = (
      <Dropdown
        options={data.values}
        id={data.type + row + data.col + "d"}
        search={true}
        name={data.col}
        onSelect={handleSelect}
        opened={true}
      ></Dropdown>
    );
  } else if (data.col != "No") {
    editable = true;
  }
  return (
    <div
      className={`duration-200 relative cursor-pointer table-cell ${data.type === "button" && "align-center text-center"} border-r border-b border-slate-300 last-of-type:border-r-0 focus:ring-slate-500 focus:bg-white focus:outline-none  focus:ring-1 p-2`}
      id={data.type + row + data.col}
      onClick={(e) => {
        showInput(!input);
        onActive(e);
      }}
      contentEditable={editable}
    >
      {data.type == "dropdown" && (
        <div className="flex items-center ">
          {
            <div className={`${input && isActive ? "block" : "hidden"}`}>
              {inputBlock}
            </div>
          }
          {!input && value}
        </div>
      )}
      {data.col == "No" && row}
      {data.type == "button" && <Buttoncmp label={data.label? data.label: "null"} variant="dase"></Buttoncmp>}
    </div>
  );
};

export default TableCell;
