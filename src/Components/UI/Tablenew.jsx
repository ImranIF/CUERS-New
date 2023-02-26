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
import { faTableTennisPaddleBall } from "@fortawesome/free-solid-svg-icons";

const Tablenew = (prop) => {
  const { tableName, tableCols, loadCondition } = prop; // tableName
  const [tableData, setTableData] = useState([]); // to set the data after fetching
  // const [indexi, setIndexi] = useState(1);
  const rowStatus = [0, 0];
  const [newRow, setNewRow] = useState(rowStatus);
  const { message, setStatus } = useContext(StatusContext);
  // the initial state will load the table


  const [loaded, setLoaded] = useState(false);
  const [changes, setChanges] = useState({
    tableName: tableName,
    operation: "load",
  });

  useEffect(() => {
    const getTableInfo = JSON.parse(sessionStorage.getItem("tableInfo"));
    // processDB();
    let val = "";
    if (loadCondition) {

      let dataTypes = getTableInfo[tableName]["dataTypes"];
      console.log("Data types: ", dataTypes);
      for (let i = 0; i < loadCondition.length; i++) {
        console.log("Load condition: ", Object.keys(loadCondition[i])[0]);
        let key = Object.keys(loadCondition[i])[0];
        console.log("dataTypes[key]: ", dataTypes[key]);
        if (dataTypes[key].localeCompare("int(11)") == 0)
          val += `${key} = ${loadCondition[i][key]}`;
        else
          val += `${key} = "${loadCondition[i][key]}"`;
        if (loadCondition.length - 1 != i) val += " and ";
      }

      console.log("Val: ", val);


      setChanges(prevChanges => ({
        ...prevChanges,
        conditionCheck: val,
      }));
    }
  }, [loadCondition, tableName]);

  useEffect(() => {
    function processDB() {
      //obtain all table structures from session storage and parse into json

      console.log("laodcondition: ", loadCondition);
      const getTableInfo = JSON.parse(sessionStorage.getItem("tableInfo"));
      const combinedTableInfo = { changes, getTableInfo };
      // console.log(getTableInfo[tableName])
      console.log("Requesting");

      fetch("http://localhost:3000/users/processData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(combinedTableInfo),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("At front: ", data);
          if (changes.operation === "load") {
            // when loading, setting a new key
            const withKey = data.map((item, i) => ({ ...item, key: i }));
            setTableData(withKey);
          } else if (changes.operation === "update") {
            // setting the localcopy of the tableData if successfully updated
            // in the remote database
            const updatedTable = [...tableData];
            const ucol = changes.updatedData.colType;
            const uValue = changes.updatedData.value;
            updatedTable[changes.index][ucol] = uValue;
            setTableData(updatedTable);
            setStatus(["s", "One cell updated"]);
          } else if (changes.operation === "insert") {
            setStatus(["s", data.msg]);
            // setting status to [0, 0], so that user can add new row
            setNewRow([0, 0]);
          } else if (changes.operation === "delete") {
            setStatus(["d", "One Row deleted"]);
          }
        });

      //setLoaded(true);
      // .catch((error) => {
      //   console.log(error);
      // });


    }
    if (loadCondition.length > 0) {
      if (changes.conditionCheck)
        processDB();
    }
    else {
      processDB();
    }

  }, [changes]);

  // creating new object for each new row
  const createNewObject = (key) => {
    const tempRow = {};
    for (let i = 0; i < tableCols.length; i++) {
      // Checking if the property is required passed from tableCols
      if (tableCols[i].required === true) {
        tempRow[tableCols[i].col] = "";
      }
    }
    // adding a new key property to uniquely identify row
    tempRow["key"] = key;
    return tempRow;
  };

  // checking if the user has filled the new row
  const checkIfFilled = (index) => {
    for (const prop in tableData[index]) {
      // we don't need to check for key property, so skipping it
      if (tableData[index][prop] != "" || prop === "key") {
        continue;
      } else {
        return false;
      }
    }
    return true;
  };
  const addRow = () => {
    // generating key, if the table is empty already, key would be 0
    const key =
      tableData.length === 0 ? 0 : tableData[tableData.length - 1].key + 1;
    const tempRow = createNewObject(key);
    if (tableData.length === 0) {
      setTableData([tempRow]);
      setNewRow([1, 0]);
    } else if (newRow[0] === 0 && newRow[1] === 0) {
      setTableData((prev) => [...prev, tempRow]);
      setNewRow([1, 0]);
    } else {
      const fillStatus = checkIfFilled(tableData.length - 1);
      if (fillStatus) {
        setNewRow([0, 0]);
      } else {
        setStatus(["d", "Fill the unfilled row first!"]);
      }
    }
  };

  const updateCell = (value, rowIndex, colType) => {
    // Editing realtime except the last index(if it is not uploaded yet [0, 0] or [1,0])
    // console.log("TableLength while editing: ", tableData.length);
    if (
      (rowIndex === tableData.length - 1 &&
        newRow[0] === 0 &&
        newRow[1] === 0) ||
      rowIndex !== tableData.length - 1
    ) {
      // console.log("value is", value, "and ", tableData[rowIndex][colType]);
      if (String(value) !== String(tableData[rowIndex][colType])) {
        const editedRow = { ...tableData[rowIndex] };
        delete editedRow.key;
        setChanges({
          tableName: tableName,
          row: editedRow,
          operation: "update",
          updatedData: {
            colType: colType,
            value: value,
          },
          index: rowIndex,
        });
      }
    }

    // Uploading a new row to the database when [1,0], added, not yet uploaded
    // we're doing it when the user edits the last column of the new row
    else if (
      rowIndex === tableData.length - 1 &&
      newRow[0] === 1 &&
      newRow[1] === 0
    ) {
      // updating the lastRow as the user edits it
      console.log(tableData[rowIndex]);
      let newTableData = Object.assign([], tableData);
      newTableData[rowIndex][colType] = value;
      setTableData(newTableData);
      // --------------
      // Checking if the whole row is completely filled
      const fillStatus = checkIfFilled(rowIndex);
      console.log("Fillstatus and newRow:", fillStatus, newRow);
      if (fillStatus && newRow[0] === 1 && newRow[1] === 0) {
        // we're just passing the row index, processDB should return a status of the adding
        const toUploadRow = { ...tableData[rowIndex] };
        console.log("TouploadRow: ", toUploadRow);
        delete toUploadRow.key;
        setChanges({
          tableName: tableName,
          row: toUploadRow,
          operation: "insert",
        });
        // const addedStatus = processDB(tableName, rowIndex, "insert");
        // if (addedStatus) {
        //   setStatus(["s", "New row saved!"]);
        //   setNewRow([0, 0]);
        //   // user can add another row
        // }
      }
    }
  };

  const handleDelete = (key, rowIndex) => {
    const deletedRow = { ...tableData[rowIndex] };
    setTableData(tableData.filter((item) => item.key !== key));
    delete deletedRow.key;
    if (
      rowIndex !== tableData.length - 1 ||
      (rowIndex === tableData.length - 1 && newRow[0] === 0 && newRow[1] === 0)
    ) {
      setChanges({
        tableName: tableName,
        row: deletedRow,
        operation: "delete",
      });
    }
  };

  const [activeCell, setActiveCell] = useState("");

  if (tableData === undefined) {
    return <Spin></Spin>;
  }
  // useEffect(() => {
  //   
  // }, []);

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
