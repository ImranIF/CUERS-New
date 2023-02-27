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

  const { options, name, id, label, search, onSelect, opened, preSelect, variant } =
    prop;

    // state for options
  const [open, setOpen] = useState(opened);
  // state for selected option, initially the preSelect value will be set if passed
  const [selected, setSelected] = useState(
    !preSelect ? "Select " + name : preSelect
  );
  // while options are open, clicking outside will close the option list
  useEffect(() => {
    const closeDropdown = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.body.addEventListener("click", closeDropdown);
    return () => document.body.removeEventListener("click", closeDropdown);
  }, []);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const inputStyle =
    "duration-200 mt-1 border-0 ring-0 ring-transparent block w-full rounded-md bg-slate-200 active:ring-2 active:ring-slate-500  focus:ring-slate-500 focus:bg-white focus:outline-none focus:ring-offset-1 focus:ring-1 ";

  const [inputValue, setInputValue] = useState("");
  let inputBlock = (
    <div
      className={`relative flex w-full duration-200 ${open && "z-10"}`}
      ref={dropdownRef}
      // if clicked, option list will display
      onClick={(e) => {
        e.stopPropagation();
        setOpen(!open);
      }}
    >
      <div
        id={id}
        tabIndex={0}
        className={`${inputStyle} ${
          open && "bg-white ring-1 ring-offset-1 ring-slate-500"
        } flex justify-between cursor-pointer p-2 pl-3 pr-3 h-full items-center
          duration-200 border-0 ring-0 ring-transparent w-full rounded-md bg-slate-200`}
      >
        {/* A input box that will contain the value of the dropdown */}
        <input
          type="text"
          name={name}
          id={name}
          className="w-full p-0 border-0 bg-transparent ring-0 focus:ring-0 cursor-pointer"
          value={selected}
          readOnly
        ></input>
        <ChevronDownIcon
          className={`${open && "rotate-180"} w-4 h-4 duration-200`}
        ></ChevronDownIcon>
      </div>
      <div
        className={`${
          !open ? "max-h-0 hidden" : "max-h-64"
        } duration-200 absolute bg-white w-fit text-slate-900 mt-12 px-2 ${
          !search && "py-2"
        } pb-2 rounded-lg border border-slate-300 overflow-y-auto`}
      >
        {/* The search box feature */}
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
              onClick={(e) => e.stopPropagation()}
              // when clicked we're searching by the state(onchange)
              onChange={(e) => {
                setInputValue(e.target.value.toLowerCase());
              }}
              className={` pl-2 p-1 ring-1 bg-white duration-200 ring-slate-500 block w-full rounded-md active:ring-2 active:ring-slate-500  focus:ring-slate-500 focus:bg-white focus:outline-none focus:ring-offset-1 focus:ring-1`}
            ></input>
          </div>
        )}

        <ul className="">
          {options.map((option, index) => (
            <li
              key={index}
              tabIndex={0}
              className={`flex-auto w-full hover:bg-slate-200 cursor-pointer p-2 rounded-md
              ${String(option).toLowerCase().match(inputValue) ? "block" : "hidden"} ${
               String(selected).toLowerCase().localeCompare(String(option).toLowerCase()) ==
                  0 && "bg-blue-200"
              }
              `}
              onClick={(e) => {
                e.stopPropagation();
                setSelected(option);
                onSelect && onSelect(option);
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
