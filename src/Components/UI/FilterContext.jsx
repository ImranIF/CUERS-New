import React, { createContext, useState } from 'react';

const FilterContext = createContext();

const FilterContextProvider = ({ children }) => {
  const [filterFields, setFilterFields] = useState([]);
  const [filterValues, setFilterValues] = useState({});

  const updateFilterFields = (options) => {
    console.log('Passed filterFields: ', options);
    if (options) {
      setFilterFields([...options]);
      setFilterValues({});
    }
  };
  const updateFilterValues = (col, type, option, toDelete) => {
    console.log('passed parameters: ', col, option, toDelete);
    setFilterValues((prevValues) => {
      const updatedValues = { ...prevValues };
      if (toDelete) {
        delete updatedValues[col];
      } else {
        updatedValues[col] = [type, option];
      }
      return updatedValues;
    });
  };

  return (
    <FilterContext.Provider
      value={{
        filterFields,
        updateFilterFields,
        filterValues,
        updateFilterValues,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export { FilterContext, FilterContextProvider };
