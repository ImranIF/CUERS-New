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
import { useContext } from "react";
import { StatusContext } from "./StatusContext";

const Tablenew = (prop) => {
  const { toFetch, tableCols } = prop; // toFetch : route to fetch from
  const [tableData, setTableData] = useState([]); // to set the data after fetching
  const [indexi, setIndexi] = useState(1);
  const rowStatus = [0, 0];
  const [newRow, setNewRow] = useState(rowStatus);
  const { message, setStatus } = useContext(StatusContext);

  const createNewObject = (key) => {
    const tempRow = {};
    for (let i = 0; i < tableCols.length; i++) {
      if (tableCols[i].required == true) {
        tempRow[tableCols[i].col] = "";
      }
    }
    tempRow["key"] = key;
    return tempRow;
  };

  const checkIfFilled = (index) => {
    for (const prop in tableData[index]) {
      if (tableData[index][prop] != "") {
        continue;
      } else {
        return false;
      }
    }
    return true;
  };
  const addRow = () => {
    const key = tableData[tableData.length - 1].key + 1;
    const tempRow = createNewObject(key);
    console.log(newRow[0], newRow[1]);
    if (tableData.length === 0) {
      setTableData([tempRow]);
      setNewRow([1, 0]);
    } else if (newRow[0] === 0 && newRow[1] === 0) {
      setTableData((prev) => [...prev, tempRow]);
      setNewRow([1, 0]);
    } else {
      const fillStatus = checkIfFilled(tableData.length - 1);
      if (fillStatus) {
        // upload to the database
        // after uploading
        setNewRow([0, 0]);
      } else {
        setStatus(["d", "Fill the unfilled row first!"]);
      }
    }
    console.log(tableData);
  };

  const processDB = (rowIndex, operation, updated) => {};

  const updateCell = (value, rowIndex, colType) => {
    // console.log(value, rowIndex, colType);
    let newTableData = Object.assign([], tableData);
    newTableData[rowIndex][colType] = value;
    setTableData(newTableData);

    // Editing realtime except the last index(if it is not uploaded yet [0, 0] or [1,0])
    if (rowIndex != tableData.length - 1 && newRow[1] !== 1) {
      processDB(rowIndex, "update", { colType, value });
    }

    // Uploading a new row to the database when [1,0], added, not yet uploaded
    if (rowIndex == tableData.length - 1) {
      const fillStatus = checkIfFilled(rowIndex);
      if (fillStatus && newRow[0] === 1 && newRow[1] === 0) {
        processDB(rowIndex, "insert");
        setStatus(["s", "New row saved!"]);
        setNewRow([0, 0]);
      }
    }
  };

  const handleDelete = (key, RowIndex) => {
    setTableData(tableData.filter((item) => item.key !== key));
    setIndexi(indexi - 1);
    processDB(RowIndex, "deletion");
    setStatus(["d", "1 row deleted!"]);
  };

  useEffect(() => {
    let fetched = true;
    if (fetched) {
      console.log("I'm fetching again");
      fetch(`http://localhost:3000/users/${toFetch}`)
        .then((data) => {
          return data.json();
        })
        .then((jsonData) => {
          const newData = jsonData.map((item, i) => ({
            ...item,
            key: i,
          }));
          setTableData(newData);
        });
    }
    return () => {
      fetched = false;
    };
  }, []);
  const [activeCell, setActiveCell] = useState("");

  if (tableData === undefined || tableData.length == 0) {
    return <Spin></Spin>;
  }
  return (
    <div className="mt-0">
      <div className="table w-full border-2">
        <div className="table-header-group bg-slate-200 sticky top-0 z-20">
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
          {tableData?.map((row, rowIndex) => (
            <div key={row.key} className={`table-row text-slate-700`}>
              {tableCols.map((col, colIndex) => {
                return (
                  <TableCell
                    key={colIndex + row.key}
                    row={row}
                    pvalue={col.col != "No" && row[col.col]}
                    col={col}
                    isActive={activeCell == col.type + row.value + col.col}
                    onActive={(e) => {
                      setActiveCell(col.type + row.value + col.col);
                      e.stopPropagation();
                    }}
                    onUpdate={(value) => updateCell(value, rowIndex, col.col)}
                    onDelete={(e) => handleDelete(row.key, rowIndex)}
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
