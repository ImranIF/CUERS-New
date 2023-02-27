import React from "react";

export const DashboardContent = (prop) => {
  const { children } = prop;
  return (
    <div className="flex-1 h-full justify-center items-center min-w-min text-center">
      <form action="" className="p-2 my-4">
        {children}
      </form>
    </div>
  );
};
