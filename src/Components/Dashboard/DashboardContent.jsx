import React, { useState, useContext, createContext } from 'react';
import { DashboardContext } from '../UI/DashboardContext.jsx';
import { DropdownOptionsProvider } from '../DropdownOptionsContext';

export const DashboardContent = (prop) => {
  const { children } = prop;
  const [createdOp, setCreatedOp] = useState(false);
  return (
    <div
      className={`flex-1 h-full justify-center items-center min-w-min text-center`}
    >
      <div className="p-2 my-4 h-full">{children}</div>
    </div>
  );
};
