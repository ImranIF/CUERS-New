import React, { createContext, useState } from 'react';

const DropdownOptionsContext = createContext();

const DropdownOptionsProvider = ({ children }) => {
  const [dropdownOptions, setDropdownOptions] = useState({});

  const updateDropdownOptions = (options) => {
    console.log('Options are', options);
    setDropdownOptions(options);
  };

  return (
    <DropdownOptionsContext.Provider
      value={{ dropdownOptions, updateDropdownOptions }}
    >
      {children}
    </DropdownOptionsContext.Provider>
  );
};

export { DropdownOptionsContext, DropdownOptionsProvider };
