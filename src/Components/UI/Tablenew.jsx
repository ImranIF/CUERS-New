import { StopIcon, TrashIcon } from '@heroicons/react/24/outline';
import {
  ChevronDownIcon,
  ListBulletIcon,
  PencilSquareIcon,
  PlusIcon,
} from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import Buttoncmp from './Buttoncmp';
import Dropdown from './Dropdown';
import Inputcmp from './Inputcmp';
import Spin from './Spin';
import Table from './Table';
import TableCell from './TableCell';
import { useContext } from 'react';
import { StatusContext } from './StatusContext';
import { faTableTennisPaddleBall } from '@fortawesome/free-solid-svg-icons';

const Tablenew = (prop) => {
  const { tableName, tableCols, loadCondition } = prop; // tableName

  // state for tableData
  const [tableData, setTableData] = useState([]); // to set the data after fetching

  const rowStatus = [0, 0];
  // state to handle newRow
  const [newRow, setNewRow] = useState(rowStatus);
  const { message, setStatus, evaluator } = useContext(StatusContext);

  // state to handle dataLoading state
  const [dataLoading, setDataLoading] = useState(false);
  // the initial state will load the table

  const [loaded, setLoaded] = useState(false);
  const [changes, setChanges] = useState(() => {
    if (loadCondition.length > 0) {
      let val = '';
      const getTableInfo = JSON.parse(sessionStorage.getItem('tableInfo'));
      let dataTypes = getTableInfo[tableName]['dataTypes'];
      console.log('Data types: ', dataTypes);
      for (let i = 0; i < loadCondition.length; i++) {
        console.log('Load condition: ', Object.keys(loadCondition[i])[0]);
        let key = Object.keys(loadCondition[i])[0];
        console.log('dataTypes[key]: ', dataTypes[key]);
        if (dataTypes[key].localeCompare('int(11)') == 0)
          val += `${key} = ${loadCondition[i][key]}`;
        else val += `${key} = "${loadCondition[i][key]}"`;
        if (loadCondition.length - 1 != i) val += ' and ';
      }
      return { tableName: tableName, operation: 'load', conditionCheck: val };
    } else {
      return { tableName: tableName, operation: 'load' };
    }
  });
  console.log('Current evaluator is ', evaluator);

  useEffect(() => {
    function processDB() {
      //obtain all table structures from session storage and parse into json
      const getTableInfo = JSON.parse(sessionStorage.getItem('tableInfo'));
      const combinedTableInfo = { changes, getTableInfo };
      console.log('Requesting');

      if (changes.operation === 'load') {
        setDataLoading(true);
      }
      fetch('http://localhost:3000/users/processData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(combinedTableInfo),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('At front: ', data);
          if (changes.operation === 'load') {
            // when loading, setting a new key
            setDataLoading(false);
            const banglaNums = data.map((item) => {
              for (const key in item) {
                const englishInteger = item[key];
                if (
                  new RegExp('^\\d+(\\.\\d+)?$').test(
                    englishInteger && englishInteger.toString()
                  )
                ) {
                  const banglaInteger = englishInteger
                    .toString()
                    .replace(/0|1|2|3|4|5|6|7|8|9/g, (match) => {
                      return '০১২৩৪৫৬৭৮৯'[match];
                    });
                  item[key] = banglaInteger;
                }
              }
            });
            const withKey = data.map((item, i) => ({ ...item, key: i }));
            setTableData(withKey);
          } else if (changes.operation === 'update') {
            console.log('update data here', data);
            if (data[0]) {
              const updatedTable = [...tableData];
              const ucol = changes.updatedData.colType;
              const uValue = changes.updatedData.value;
              updatedTable[changes.index][ucol] = uValue;
              setTableData(updatedTable);
              setStatus(['s', `${data[1]}`]);
            } else {
              setStatus(['d', `${data[1]}`]);
            }
          } else if (changes.operation === 'insert') {
            if (data[0]) {
              setStatus(['s', `${data[0]} row added`]);
              setNewRow([0, 0]);
            } else {
              console.log('Data[0]', data[0]);
              setStatus(['d', `${data[1]}`]);
              setNewRow([1, 0]);
            }
          } else if (changes.operation === 'delete') {
            console.log('After deleting', data);
            if (data[0]) {
              setTableData(
                tableData.filter((item) => item.key !== changes.key)
              );
              setStatus(['d', `${data[0]} row deleted`]);
            } else {
              setStatus(['d', `${data[1]}`]);
            }
          }
        })
        .catch((error) => {
          console.log('Error happend', error);
        });
    }
    processDB();
  }, [changes]);

  // creating new object for each new row
  const createNewObject = (key) => {
    const tempRow = {};
    for (let i = 0; i < tableCols.length; i++) {
      // Checking if the property is required passed from tableCols
      if (tableCols[i].required === true) {
        tempRow[tableCols[i].col] = '';
      }
    }
    // adding a new key property to uniquely identify row
    tempRow['key'] = key;
    return tempRow;
  };

  // checking if the user has filled the new row
  const checkIfFilled = (index) => {
    for (const prop in tableData[index]) {
      // we don't need to check for key property, so skipping it
      if (tableData[index][prop] != '' || prop === 'key') {
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
        setStatus(['d', 'Fill the unfilled row first!']);
      }
    }
  };

  const updateCell = (value, isValid, rowIndex, col) => {
    // Editing realtime except the last index(if it is not uploaded yet [0, 0] or [1,0])
    // console.log("TableLength while editing: ", tableData.length);
    console.log('validity checking', isValid);
    const colType = col.col;
    if (!isValid && isValid !== undefined) {
      setStatus(['d', `Please use a valid value! (${col.regexMessage})`]);
    } else {
      if (
        (rowIndex === tableData.length - 1 &&
          newRow[0] === 0 &&
          newRow[1] === 0) ||
        rowIndex !== tableData.length - 1
      ) {
        // console.log("value is", value, "and ", tableData[rowIndex][colType]);
        if (
          String(value) !== String(tableData[rowIndex][colType]) &&
          String(value) !== ''
        ) {
          console.log(String(value), String(tableData[rowIndex][colType]));
          const editedRow = { ...tableData[rowIndex] };
          delete editedRow.key;
          setChanges({
            tableName: tableName,
            row: editedRow,
            operation: 'update',
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
        console.log('Fillstatus and newRow:', fillStatus, newRow);
        if (fillStatus && newRow[0] === 1 && newRow[1] === 0) {
          // we're just passing the row index, processDB should return a status of the adding
          const toUploadRow = { ...tableData[rowIndex] };
          console.log('TouploadRow: ', toUploadRow);
          delete toUploadRow.key;
          setChanges({
            tableName: tableName,
            row: toUploadRow,
            operation: 'insert',
            changeState: !newRow[0],
          });
          // const addedStatus = processDB(tableName, rowIndex, "insert");
          // if (addedStatus) {
          //   setStatus(["s", "New row saved!"]);
          //   setNewRow([0, 0]);
          //   // user can add another row
          // }
        }
      }
    }
  };

  const handleDelete = (key, rowIndex) => {
    const deletedRow = { ...tableData[rowIndex] };
    delete deletedRow.key;
    if (
      rowIndex !== tableData.length - 1 ||
      (rowIndex === tableData.length - 1 && newRow[0] === 0 && newRow[1] === 0)
    ) {
      console.log('Indirect action');
      setChanges({
        tableName: tableName,
        row: deletedRow,
        operation: 'delete',
        key: key,
      });
    } else {
      console.log('direct action');
      setTableData(tableData.filter((item) => item.key !== key));
    }
  };

  const [activeCell, setActiveCell] = useState('');

  return (
    <div className="mt-0 min-w-min">
      <div className="table  w-full">
        <div className="table-header-group bg-slate-200 sticky top-4 z-20 ">
          <div className="table-row">
            {/* Generating table headers */}
            {tableCols.map((data) => {
              // Giving different styles of icons based on different data types
              let icon;
              if (data.type == 'dropdown') {
                icon = (
                  <ChevronDownIcon className="w-5 h-5 rounded-full border border-slate-400 text-slate-400"></ChevronDownIcon>
                );
              } else if (data.col == 'No') {
                icon = (
                  <ListBulletIcon className="w-5 h-5 border text-slate-400"></ListBulletIcon>
                );
              } else if (data.col == 'Delete') {
                icon = (
                  <TrashIcon className="w-5 h-5 text-slate-400"></TrashIcon>
                );
              } else {
                icon = (
                  <PencilSquareIcon className="w-5 h-5l border text-slate-400"></PencilSquareIcon>
                );
              }
              return (
                <div className="relative table-cell p-2 border-r border-r-slate-300 font-bold text-slate-600 ">
                  <div className="flex justify-center items-center gap-2">
                    {icon}
                    {data.col.charAt(0).toUpperCase() + data.col.slice(1)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* The main body of the table */}
        <div className="table-row-group">
          {tableData?.map((row, rowIndex) => (
            <div key={row.key} className={`table-row text-slate-700`}>
              {tableCols.map((col, colIndex) => {
                return (
                  // TableCell is each cell on the table that contains different data or input
                  <TableCell
                    key={colIndex + row.key}
                    cellOptions={null}
                    row={row}
                    pvalue={col.col != 'No' && row[col.col]}
                    col={col}
                    isActive={activeCell == col.type + row.value + col.col}
                    onActive={(e) => {
                      setActiveCell(col.type + row.value + col.col);
                      e.stopPropagation();
                    }}
                    onUpdate={(value, isValid) =>
                      updateCell(value, isValid, rowIndex, col)
                    }
                    onDelete={(e) => handleDelete(row.key, rowIndex)}
                  ></TableCell>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {dataLoading && (
        <div className="mt-2">
          <Spin></Spin>
        </div>
      )}
      <div className="sticky left-0">
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
    </div>
  );
};

export default Tablenew;
