import React from 'react';
import {
  ArrowDownIcon,
  ChevronDownIcon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

const Dropdown = (prop) => {
  const {
    options,
    name,
    id,
    label,
    search,
    onSelect,
    opened,
    preSelect,
    variant,
  } = prop;

  // state for options
  const [open, setOpen] = useState(opened);
  // state for selected option, initially the preSelect value will be set if passed
  const [selected, setSelected] = useState(
    !preSelect ? 'Select ' + name : preSelect
  );
  // while options are open, clicking outside will close the option list
  //
  // Showing dropdown options at top at the bottom portion of the page
  const [atTop, setAtTop] = useState(false);
  useEffect(() => {
    const closeDropdown = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.body.addEventListener('click', closeDropdown);
    return () => document.body.removeEventListener('click', closeDropdown);
  }, []);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const optionsRef = useRef(null);
  const inputStyle =
    'duration-200 mt-1 border-0 ring-0 ring-transparent block w-full rounded-md bg-slate-200 active:ring-2 active:ring-slate-500  focus:ring-slate-500 focus:bg-white focus:outline-none focus:ring-offset-1 focus:ring-1 ';

  const [inputValue, setInputValue] = useState('');

  // To control where to open the list options
  const openDropdown = (e) => {
    const dropdown = dropdownRef.current;
    const options = optionsRef.current;
    const dropdownHeight = dropdown.offsetHeight;
    const optionsHeight = options.offsetHeight;
    console.log(dropdownHeight, optionsHeight);
    const distanceFromBottom =
      window.innerHeight - dropdown.getBoundingClientRect().bottom;
    const spaceBottom = distanceFromBottom - 10;

    if (dropdownHeight > spaceBottom + 100) {
    } else {
    }
  };
  let inputBlock = (
    // It's the parent div that contains the currently selected option or the value from the div
    // and option list(hidden primarily)
    <div
      className={`relative flex w-full duration-200 ${open && 'z-10'}`}
      ref={dropdownRef}
      // if clicked, option list will display
      onClick={(e) => {
        e.stopPropagation();
        openDropdown(e);
        setOpen(!open);
      }}
    >
      {/* Div that holds the currently selected value: contains an input and an icon*/}
      <div
        id={id}
        tabIndex={0}
        className={`${inputStyle} ${
          open && 'bg-white ring-1 ring-offset-1 ring-slate-500'
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
        {/* Icon that shows open or closed state of the option list*/}
        <ChevronDownIcon
          className={`${open && 'rotate-180'} w-4 h-4 duration-200`}
        ></ChevronDownIcon>
      </div>
      {/*The parent div that contains the option list*/}
      <div
        className={`${
          !open ? 'max-h-0 hidden' : 'max-h-64'
        } duration-200 absolute bg-white w-fit text-slate-900 mt-12 px-2 ${
          !search && 'py-2'
        } pb-2 rounded-lg border border-slate-300 overflow-y-auto`}
        ref={optionsRef}
      >
        {/* The search box feature */}
        {search == true && (
          <div
            className={`p-2 pt-3 rounded-md flex justify-between items-center gap-2 sticky top-0 bg-white `}
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
                // It's updating the value of the state letter by letter to display the matched result instantly
                setInputValue(e.target.value.toLowerCase());
              }}
              className={` pl-2 p-1 ring-1 bg-white duration-200 ring-slate-500 block w-full rounded-md active:ring-2 active:ring-slate-500  focus:ring-slate-500 focus:bg-white focus:outline-none focus:ring-offset-1 focus:ring-1`}
            ></input>
          </div>
        )}

        {/* The option list*/}
        <ul className="">
          {options.map((option, index) => (
            // Here matching the state saved at inputValue from the searchbox to generate result(hidden or show)
            <li
              key={index}
              tabIndex={0}
              className={`flex-auto w-full hover:bg-slate-200 cursor-pointer p-2 rounded-md
              ${
                String(option).toLowerCase().match(inputValue)
                  ? 'block'
                  : 'hidden'
              } ${
                String(selected)
                  .toLowerCase()
                  .localeCompare(String(option).toLowerCase()) == 0 &&
                'bg-blue-200'
              }
              `}
              onClick={(e) => {
                // When an option is clicked, the state for current value is modified, and closes the
                // dropdown list and clears the searchbox
                e.stopPropagation();
                setSelected(option);
                onSelect && onSelect(option);
                setInputValue('');
                setOpen(!open);
              }}
            >
              {/* Each option from the option list*/}
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  /*
   * We need another dropdown list with input that has some changes.
   * Now we might just update the existing one with new conditions.
   * For this to work, we need to provide an additional option from the calling component which
   * will differentiate them.
   * */

  return (
    // As we're using this also for general form, we need to have label information for accessability
    <label htmlFor={name} className="block text-base">
      <span className="flex min-w-fit">{label}</span>
      {inputBlock}
    </label>
  );
};

export default Dropdown;
