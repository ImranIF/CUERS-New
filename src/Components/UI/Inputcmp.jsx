import {
  ArrowDownIcon,
  ChevronDownIcon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
let list1 = [
  'text',
  'email',
  'number',
  'url',
  'password',
  'date',
  'datetime-local',
  'month',
  'search',
  'tel',
  'time',
  'week',
  'textarea',
];
const Inputcmp = (prop) => {
  const inputRef = useRef(null);
  let inputBlock;
  let {
    label,
    variant,
    type,
    name,
    id,
    placeholder,
    autocomplete,
    onChange,
    required,
    toClearFilter,
  } = prop;
  const [inputValue, setInputValue] = useState('');
  let inputStyle;
  if (variant && variant == 'filter') {
    inputStyle =
      'duration-200 border-0 ring-0 ring-transparent block w-full rounded-md bg-slate-50 active:ring-2 active:ring-slate-500  focus:ring-slate-500 focus:outline-none focus:ring-offset-1 focus:ring-1 ';
  } else {
    inputStyle =
      'duration-200 mt-1 border-0 ring-0 ring-transparent block w-full rounded-md bg-slate-200 active:ring-2 active:ring-slate-500  focus:ring-slate-500 focus:bg-white focus:outline-none focus:ring-offset-1 focus:ring-1';
  }
  useEffect(() => {
    if (variant == 'filter') {
      inputRef.current.value = '';
    }
  }, [toClearFilter]);
  if (list1.includes(type)) {
    inputBlock = (
      <input
        ref={inputRef}
        type={type}
        name={name}
        id={id}
        autoComplete={autocomplete}
        placeholder={placeholder}
        className={`${inputStyle}`}
        required={required}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) =>
          variant == 'filter' && onChange && onChange(e, 'text', id, false)
        }
      />
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
