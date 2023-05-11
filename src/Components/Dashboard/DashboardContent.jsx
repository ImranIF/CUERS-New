import React, { useState, useContext, createContext } from 'react';
import { DashboardContext } from '../UI/DashboardContext.jsx';

export const DashboardContent = (prop) => {
  const { children } = prop;
  const [overFlow, setOverflow] = useState(true);
  return (
    <DashboardContext.Provider value={{ setOverflow }}>
      <div
        className={`flex-1 h-full justify-center items-center min-w-min text-center ${
          !overFlow && 'overflow-hidden'
        }`}
      >
        <div className="p-2 my-4 h-full">{children}</div>
      </div>
    </DashboardContext.Provider>
  );
};
