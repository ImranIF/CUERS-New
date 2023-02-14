import { TrashIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import Buttoncmp from "./Buttoncmp";
import Dropdown from "./Dropdown";
import Inputcmp from "./Inputcmp";

const TableCell = (prop) => {
  const { data, row, isActive, onActive, onDelete, key } = prop;
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
        id={data.type + row.id + data.col + "d"}
        search={true}
        name={data.col}
        onSelect={handleSelect}
        opened={true}
      ></Dropdown>
    );
  } else if (data.col != "No" && data.type != "button") {
    editable = true;
  }
  return (
    <div
      className={`duration-200 relative cursor-pointer align-middle table-cell border-r border-b border-slate-300 last-of-type:border-r-0 focus:ring-slate-500 focus:bg-white focus:outline-none  focus:ring-1 p-2 ${
        data.type == "button" && "text-center"
      }`}
      onClick={(e) => {
        showInput(!input);
        e.stopPropagation();
        onActive(e);
      }}
      contentEditable={editable}
      suppressContentEditableWarning={true}
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
      {data.col == "No" && row.value}
      {data.col == "Delete" && (
        <Buttoncmp type="button" variant="dase" onClick={(e) => onDelete(e,row)}>
          <TrashIcon></TrashIcon>
        </Buttoncmp>
      )}
    </div>
  );
};

export default TableCell;
