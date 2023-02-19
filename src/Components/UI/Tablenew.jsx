import { StopIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  ListBulletIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import Buttoncmp from "./Buttoncmp";
import Dropdown from "./Dropdown";
import Inputcmp from "./Inputcmp";
import Spin from "./Spin";
import Table from "./Table";
import TableCell from "./TableCell";

const Tablenew = (prop) => {
  const { toFetch, tableCols } = prop; // toFetch : route to fetch from
  const [tableData, setTableData] = useState([]); // to set the data after fetching
  const [indexi, setIndexi] = useState(1);

  // ------------------------
  // Handling indexes is done through secondary parameter of map
  // ------------------------
  // ------------------------
  // To add a new row on the table
  const addRow = () => {
    // Row will be handled realtime
    // Create a new object for each row and fill it up as the user fills up
    // Whenever he finishes and blur the last cell of the row, make a request to
    // insert this row into the database
    setTableData((prev) => [...prev, {}]);
    console.log(tableData);
  };
  // ------------------------

  // ------------------------
  // What happens whenever user update a cell's data
  // We get the previous state from the action and {col, updated value} and make
  // a request to edit the particular col in the database
  const updateCell = (col, value) => {};
  // ------------------------

  // ------------------------
  // What happens whenever user delete a row
  // We get the current state of the row and make a request to delete the row
  // from the database
  const handleDelete = (index) => {
    setTableData(tableData.filter((item) => item.key !== index));
    setIndexi(indexi - 1);
    console.log(tableData[index]);
  };
  // ------------------------
  useEffect(() => {
    let fetched = true;
    if (fetched) {
      console.log("I'm fetching again");
      fetch(`http://localhost:3000/users/${toFetch}`)
        .then((data) => {
          return data.json();
        })
        .then((jsonData) => {
          const newData = jsonData.map((item, i) => ({ ...item, key: i }));
          setTableData(newData);
        });
    }
    return () => {
      fetched = false;
    };
  }, []);
  // console.log(tableData);
  const [activeCell, setActiveCell] = useState("");

  if (tableData === undefined || tableData.length == 0) {
    return <Spin></Spin>;
  }
  return (
    <div className="mt-0">
      <div className="table w-full border-2">
        <div className="table-header-group bg-slate-200">
          <div className="table-row border-red-400">
            {tableCols.map((data) => {
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
                icon = (
                  <TrashIcon className="w-5 h-5 text-slate-400"></TrashIcon>
                );
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
          {tableData?.map((row, RowIndex) => (
            <div key={row.key} className="table-row text-slate-700">
              {tableCols.map((col, colIndex) => {
                return (
                  <TableCell
                    key={colIndex + row.key}
                    row={row}
                    pvalue={col.col != "No" && row[col.col]}
                    data={col}
                    isActive={activeCell == col.type + row.value + col.col}
                    onActive={(e) => {
                      setActiveCell(col.type + row.value + col.col);
                      e.stopPropagation();
                    }}
                    onUpdate={(e) => updateCell}
                    onDelete={(e) => handleDelete(row.key)}
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
        onClick={(e) => addRow()}
      >
        <PlusIcon></PlusIcon>
      </Buttoncmp>
    </div>
  );
};

export default Tablenew;
