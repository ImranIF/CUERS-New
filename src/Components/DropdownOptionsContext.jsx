import React, { createContext, useState } from 'react';

const DropdownOptionsContext = createContext();

const DropdownOptionsProvider = ({ children }) => {
    const [dropdownOptions, setDropdownOptions] = useState({});
    const [createdNew, setCreatedNew] = useState(true);

    /*
     * This function is used to update the dropdown options. It is called when a
     * new page is loaded that contains table with cols(filter on).
     */
    const updateDropdownOptions = (options) => {
        console.log('Passed optins to update: ', options);
        if (options) {
            setDropdownOptions({ ...options });
        }
    };

    const addNewOption = (name, newOption) => {
        if (name && newOption) {
            fetch('http://localhost:3000/users/processDropDownData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: {
                        params: {
                            operation: 'write',
                            storageLabel: name,
                            value: newOption,
                        },
                    },
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Updaed option; ', data);
                    setCreatedNew(!createdNew);
                    setDropdownOptions(data);
                })
                .catch((error) => {
                    console.error(error);
                });
            console.log('After adding: ', dropdownOptions[name]);
        }
    };

    return (
        <DropdownOptionsContext.Provider
            value={{
                dropdownOptions,
                updateDropdownOptions,
                addNewOption,
                createdNew,
                setCreatedNew,
            }}
        >
            {children}
        </DropdownOptionsContext.Provider>
    );
};

export { DropdownOptionsContext, DropdownOptionsProvider };
