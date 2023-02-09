import {
  ArrowDownIcon,
  ChevronDownIcon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import { useState } from "react";
const inputStyle =
  "duration-200 mt-1 border-0 ring-0 ring-transparent block w-full rounded-md bg-slate-200 active:ring-2 active:ring-slate-500  focus:ring-slate-500 focus:bg-white focus:outline-none focus:ring-offset-1 focus:ring-1 ";
let list1 = [
  "text",
  "email",
  "number",
  "url",
  "password",
  "date",
  "datetime-local",
  "month",
  "search",
  "tel",
  "time",
  "week",
  "textarea",
];
const Inputcmp = (prop) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("Select");

  let inputBlock;
  let {
    label,
    type,
    name,
    id,
    placeholder,
    autocomplete,
    options,
    onChange,
    required,
  } = prop;
  if (list1.includes(type)) {
    inputBlock = (
      <input
        type={type}
        name={name}
        id={id}
        autoComplete={autocomplete}
        placeholder={placeholder}
        className={`${inputStyle}`}
        required={required}
      />
    );
  } else if (type.localeCompare("select") == 0) {
    inputBlock = (
      <select id={id} className={`${inputStyle}`}>
        {options
          ? options.map((option) => (
              <option value={option} className="">
                {option}
              </option>
            ))
          : null}
      </select>
    );
  } else if (type.localeCompare("dropdown") == 0) {
    inputBlock = (
      <div className="relative flex w-full duration-200">
        <div
          onClick={() => {setOpen(!open);} }
          className={`${inputStyle} ${
            open && "bg-white ring-1 ring-offset-1 ring-slate-500"
          } flex justify-between cursor-pointer p-2 pl-3 pr-3 h-full items-center
          duration-200 border-0 ring-0 ring-transparent w-full rounded-md bg-slate-200`}
        >
          {selected}
          <ChevronDownIcon
            className={`${open && "rotate-180"} w-4 h-4 duration-200`}
          ></ChevronDownIcon>
        </div>
        <div
          className={`${
            !open ? "max-h-0 hidden" : "max-h-64"
          } duration-200 absolute bg-white text-slate-900 mt-12 w-full px-2 pb-2 rounded-md z-10 border border-slate-300 overflow-y-auto`}
        >
          <div
            className={`p-2 rounded-md flex justify-between items-center gap-2 sticky top-0 bg-white`}
          >
            <MagnifyingGlassIcon className="w-6 h-6"></MagnifyingGlassIcon>
            <input id="searchbox"
            value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value.toLowerCase());
              }}
              className={`pl-2 p-1 ring-1 bg-white duration-200 ring-slate-500 block w-full rounded-md active:ring-2 active:ring-slate-500  focus:ring-slate-500 focus:bg-white focus:outline-none focus:ring-offset-1 focus:ring-1`}
            ></input>
          </div>
          <ul>
            {options.map((option) => (
              <li
                className={`hover:bg-slate-200 cursor-pointer p-2 rounded-md
              ${option.toLowerCase().match(inputValue) ? "block" : "hidden"}
              `}
              onClick={()=>{setSelected(option); setInputValue(""); setOpen(!open)}}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  return (
    <label htmlFor={id} className="block text-base">
      <span className="flex min-w-fit">{label}</span>
      {inputBlock}
    </label>
  );
};

export default Inputcmp;
