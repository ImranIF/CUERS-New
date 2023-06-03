import { React, useContext } from 'react';
import {
  ArrowDownIcon,
  ChevronDownIcon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import {
  DropdownOptionsContext,
  DropdownOptionsProvider,
} from '../DropdownOptionsContext';
// import { DashboardContext } from '../UI/DashboardContext.jsx';

const Dropdown = (prop) => {
  const { dropdownOptions, updateDropdownOptions } = useContext(
    DropdownOptionsContext
  );
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

  // const { createdOp, setCreatedOp } = useContext(DashboardContext);
  // useRefs
  // This for inputBox
  const inputRef = useRef(null);
  // This for dropdown's parent div
  const dropdownRef = useRef(null);
  // This for the optionList div
  const optionsRef = useRef(null);
  // This for the last option of the list, this helps to scroll the view
  const lastOptionRef = useRef(null);

  // input stylte two variant of dropdown, general(used at forms) and table(used at tables)
  let inputStyle;
  if (variant && variant != 'table') {
    inputStyle =
      'duration-200 mt-1 border-0 ring-0 ring-transparent block w-full rounded-md bg-slate-200 active:ring-2 active:ring-slate-500  focus:ring-slate-500 focus:bg-white focus:outline-none focus:ring-offset-1 focus:ring-1 ';
  } else if (variant && variant == 'table') {
    inputStyle =
      'duration-200 mt-1 border-0 ring-0 ring-transparent block w-full rounded-md bg-transparent active:ring-2 active:ring-slate-500  focus:ring-slate-500 focus:bg-white focus:outline-none focus:ring-offset-1 focus:ring-1';
  }
  // to track the input value while user types
  const [inputValue, setInputValue] = useState('');

  // to track if the input value is matched with the any option
  const [matched, setMatched] = useState(null);

  // state for options
  const [open, setOpen] = useState(opened);

  console.log('Options passed?:', name, ': ', options);

  // state for selected option, initially the preSelect value will be set if passed
  const [selected, setSelected] = useState(
    !preSelect ? 'Select ' + name : preSelect
  );

  // state for all options
  const [availOptions, setAvailOptions] = useState([]);

  useEffect(() => {
    const fillData = () => {
      if (options) {
        setAvailOptions([...options]);
      } else if (dropdownOptions && dropdownOptions[name]) {
        setAvailOptions([...dropdownOptions[name]]);
      }
    };
    if (availOptions.length == 0) {
      fillData();
    }
  }, [sessionStorage.getItem(name), dropdownOptions[name], options]);
  // state for filtered options
  const [filtered, setFiltered] = useState([...availOptions]);

  // state for remembering creation of option
  const [created, setCreated] = useState(false);

  // while options are open, clicking outside will close the option list
  // Showing dropdown options at top at the bottom portion of the page
  useEffect(() => {
    const closeDropdown = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.body.addEventListener('click', closeDropdown);
    return () => document.body.removeEventListener('click', closeDropdown);
  }, []);

  // This will scroll the dropdown into view when any dropdown is selected from the bottom of the page ~ QOL
  useEffect(() => {
    if (dropdownRef.current) {
      const optionDiv = optionsRef.current;
      const distanceFromBottom =
        window.innerHeight - optionDiv.getBoundingClientRect().bottom;
      const spaceBottom = distanceFromBottom - 10;
      const optionList = dropdownRef.current.querySelectorAll('option');
      if (spaceBottom < 0) {
        optionsRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }
    }
  }, [open]);

  // This is used to filter the options from given inputValue
  useEffect(() => {
    const filteredList = availOptions.filter((option) =>
      String(option).toLowerCase().match(inputValue.toLowerCase())
    );
    setFiltered([...filteredList]);
  }, [inputValue, availOptions]);

  //   useEffect(() => {
  //     console.log('Changed after: ', [...doptions[name]]);
  //     setAvailOptions([...doptions[name]]);
  //   }, [createdOp]);

  let inputBlock = (
    // It's the parent div that contains the currently selected option or the value from the div
    // and option list(hidden primarily)
    <div
      onClick={(e) => {
        e.preventDefault();
      }}
      className={`mt-1 relative flex w-40 duration-200 ${open && 'z-10'}`}
      ref={dropdownRef}
      // if clicked, option list will display
    >
      {/* Div that holds the currently selected value: contains an input and an icon*/}
      <div
        id={id}
        onClick={(e) => {
          //e.stopPropagation();
          e.preventDefault();
          setOpen(!open);
          /* if (variant == 'table' && !open) {
            setOverflow(false);
          } else {
            setOverflow(true);
          }
          console.log('ouch! here at dropdwon'); */
        }}
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
        {variant != 'table' && (
          <ChevronDownIcon
            className={`${open && 'rotate-180'} w-4 h-4 duration-200`}
          ></ChevronDownIcon>
        )}
      </div>
      {/*The parent div that contains the option list*/}
      <div
        className={`${
          !open ? 'max-h-0 hidden' : 'max-h-64'
        } duration-200 absolute bg-white min-w-max text-slate-900 mt-12 px-2 ${
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
                setInputValue(e.target.value);
              }}
              className={` pl-2 p-1 ring-1 bg-white duration-200 ring-slate-500 block w-full rounded-md active:ring-2 active:ring-slate-500  focus:ring-slate-500 focus:bg-white focus:outline-none focus:ring-offset-1 focus:ring-1`}
            ></input>
          </div>
        )}

        {/* The option list*/}
        <ul className="">
          {filtered.map((option, index) => {
            return (
              // Here matching the state saved at inputValue from the searchbox to generate result(hidden or show)
              <li
                ref={lastOptionRef}
                key={index}
                className={`flex-auto text-left content-start w-full hover:bg-slate-200 cursor-pointer p-2 rounded-md
               ${
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
                  e.preventDefault();
                  setSelected(option);
                  onSelect && onSelect(option);
                  setInputValue('');
                  setOpen(!open);
                }}
              >
                {/* Each option from the option list*/}
                {option}
              </li>
            );
          })}
        </ul>

        {/* The create new button , only at table*/}
        {variant == 'table' && filtered.length == 0 && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (!availOptions.includes(inputValue)) {
                // setAvailOptions([...availOptions, inputValue]);
                addOptionToDropdown(name, inputValue);
                setCreatedOp(!createdOp);
              }
              // setFiltered([...filtered, inputValue]);
            }}
            className={`mt-1 duration-100 focus:outline-none focus:ring-offset-1 active:ring-1 flex-auto content-start w-full hover:bg-slate-200 focus:ring focus:ring-black-800 cursor-pointer p-2 rounded-md 
          `}
          >
            Create{' '}
            <span className="ml-1 px-2 py-1 bg-blue-200 rounded-md">{`${inputValue}`}</span>
          </div>
        )}
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
