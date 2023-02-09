import React from "react";
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
  let { label, type, name, id, placeholder, autocomplete, options, onChange, required, readonly} = prop;
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
        readOnly={readonly}
      />
    );
  } else if (type == "select") {
    inputBlock = (
      <select id = {id} className={`${inputStyle}`} readOnly={readonly}>
        {options
          ? options.map((option) => (
              <option value={option} className="">
                {option}
              </option>
            ))
          : null}
      </select>
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
