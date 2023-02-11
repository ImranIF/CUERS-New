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
  let inputBlock;
  let { label, type, name, id, placeholder, autocomplete, onChange, required } =
    prop;
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
        onClick={(e)=> e.stopPropagation()}
      />
    );
  }
  // else if (type.localeCompare("select") == 0) {
  //   inputBlock = (
  //     <select id={id} className={`${inputStyle}`}>
  //       {options
  //         ? options.map((option) => (
  //             <option value={option} className="">
  //               {option}
  //             </option>
  //           ))
  //         : null}
  //     </select>
  //   );
  // }
  return (
    <label htmlFor={id} className="block text-base">
      <span className="flex min-w-fit">{label}</span>
      {inputBlock}
    </label>
  );
};

export default Inputcmp;
