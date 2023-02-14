import { StopIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  ListBulletIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useRef } from "react";
import Buttoncmp from "./Buttoncmp";
import Dropdown from "./Dropdown";
import Inputcmp from "./Inputcmp";
import Table from "./Table";
import TableCell from "./TableCell";

const Tablenew = (prop) => {
  const { tableData } = prop;
  const [rows, setRows] = useState([]);
  function addnewRow(e) {
    let maxID = rows.length > 0 ? rows[rows.length - 1].id : 0;
    let newrows = [...rows, { id: maxID + 1, value: maxID + 1 }];
    setRows([...newrows]);
  }
  const [activeCell, setActiveCell] = useState("");
  function handleDelete(e, row) {
    e.stopPropagation();
    const updatedRows = rows.filter(({ id, value }) => id !== row.id);
    let temp = row.value;
    console.log(temp);
    console.log(updatedRows);
    for (let i = temp - 1; i < updatedRows.length; i++) {
      updatedRows[i].value = temp;
      console.log(i);
      temp++;
    }
    console.log(updatedRows);
    setRows(updatedRows);
  }
  return (
    <div className="mt-0">
      <div className="table w-full border-2">
        <div className="table-header-group bg-slate-200">
          <div className="table-row border-red-400">
            {tableData.map((data) => {
              let icon;
              if (data.type == "dropdown") {
                icon = (
                  <ChevronDownIcon className="w-5 h-5 rounded-full border border-slate-400 text-slate-400"></ChevronDownIcon>
                );
              } else if (data.col == "No") {
                icon = (
                  <ListBulletIcon className="w-5 h-5 border text-slate-400"></ListBulletIcon>
                );
              } else if (data.col == "Delete") {
                icon = <TrashIcon className="w-5 h-5"></TrashIcon>;
              } else {
                icon = (
                  <PencilSquareIcon className="w-5 h-5l border text-slate-400"></PencilSquareIcon>
                );
              }
              return (
                <div className="table-cell p-2 border-r border-r-slate-300 font-bold text-slate-600">
                  <div className="flex justify-center items-center gap-2">
                    {icon}
                    {data.col.charAt(0).toUpperCase() + data.col.slice(1)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="table-row-group">
          {rows?.map((row) => (
            <div key={row.id} className="table-row text-slate-700">
              {tableData.map((data) => {
                return (
                  <TableCell
                    key={data.type + row.value + data.col}
                    row={row}
                    data={data}
                    isActive={activeCell == data.type + row.value + data.col}
                    onActive={(e) => {
                      setActiveCell(data.type + row.value + data.col);
                      e.stopPropagation();
                      console.log(e);
                    }}
                    onDelete={handleDelete}
                  ></TableCell>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <Buttoncmp
        type="button"
        variant="stsi"
        size="full"
        label="New"
        onClick={(e) => addnewRow(e)}
      >
        <PlusIcon></PlusIcon>
      </Buttoncmp>
    </div>
  );
};

export default Tablenew;
