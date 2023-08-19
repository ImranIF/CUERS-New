import React, { createContext, useState } from 'react';

const FilterContext = createContext();

const FilterContextProvider = ({ children }) => {
    const [filterFields, setFilterFields] = useState([]);
    // filterValues will contain the filter values applied in a object
    // e.g. colName: value
    const [filterValues, setFilterValues] = useState({});

    // updateFilterFields is used to update the fields of the Filter component
    // When a new page(tables) loads, this function is called to update the
    // Filter Component
    const updateFilterFields = (options) => {
        if (options) {
            setFilterFields([...options]);
            setFilterValues({});
        }
    };

    /*
     * This method is used to update the already applied filter or add new
     * filter, also delete a existing applied filter. Passed col of the table, type
     */
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
