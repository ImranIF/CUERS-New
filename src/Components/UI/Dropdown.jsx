import React from "react";
import {
  ArrowDownIcon,
  ChevronDownIcon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

const Dropdown = (prop) => {
  // to close if user clicks outside of the dropdown
  useEffect(() => {
    const closeDropdown = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.body.addEventListener("click", closeDropdown);
    return () => document.body.removeEventListener("click", closeDropdown);
  }, []);
  const { options, name, id, label, search } = prop;
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const inputStyle =
    "duration-200 mt-1 border-0 ring-0 ring-transparent block w-full rounded-md bg-slate-200 active:ring-2 active:ring-slate-500  focus:ring-slate-500 focus:bg-white focus:outline-none focus:ring-offset-1 focus:ring-1 ";

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("Select");
  let inputBlock = (
    <div className={`relative flex w-full duration-200 ${open && "z-20"}`} ref={dropdownRef}>
      <div
        id={id}
        tabIndex={0}
        onClick={(e) => {
          setOpen(!open);
        }}
        className={`${inputStyle} ${
          open && "bg-white ring-1 ring-offset-1 ring-slate-500"
        } flex justify-between cursor-pointer p-2 pl-3 pr-3 h-full items-center
          duration-200 border-0 ring-0 ring-transparent w-full rounded-md bg-slate-200`}
      >
        <input type="text" name={name} id={name} className="w-full p-0 border-0 bg-transparent ring-0 focus:ring-0 cursor-pointer" value ={selected} readOnly></input>
        <ChevronDownIcon
          className={`${open && "rotate-180"} w-4 h-4 duration-200`}
        ></ChevronDownIcon>
      </div>
      <div
        className={`${
          !open ? "max-h-0 hidden" : "max-h-64"
        } duration-200 absolute bg-white text-slate-900 mt-12 w-full px-2 ${!search && "py-2"} pb-2 rounded-lg border border-slate-300 overflow-y-auto`}
      >
        {search == true && (
          <div
            className={`p-2 pt-3 rounded-md flex justify-between items-center gap-2 sticky top-0 bg-white`}
          >
            <MagnifyingGlassIcon className="w-6 h-6"></MagnifyingGlassIcon>
            <input
              tabIndex={0}
              ref={inputRef}
              id="searchbox"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value.toLowerCase());
              }}
              className={` pl-2 p-1 ring-1 bg-white duration-200 ring-slate-500 block w-full rounded-md active:ring-2 active:ring-slate-500  focus:ring-slate-500 focus:bg-white focus:outline-none focus:ring-offset-1 focus:ring-1`}
            ></input>
          </div>
        )}

        <ul>
          {options.map((option) => (
            <li
              tabIndex={0}
              className={`hover:bg-slate-200 cursor-pointer p-2 rounded-md
              ${option.toLowerCase().match(inputValue) ? "block" : "hidden"} ${
                selected.toLowerCase().localeCompare(option.toLowerCase()) ==
                  0 && "bg-blue-200"
              }
              `}
              onClick={() => {
                setSelected(option);
                setInputValue("");
                setOpen(!open);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <label htmlFor={name} className="block text-base">
      <span className="flex min-w-fit">{label}</span>
      {inputBlock}
    </label>
  );
};

export default Dropdown;
