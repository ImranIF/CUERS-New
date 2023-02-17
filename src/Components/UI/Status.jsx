import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";

const Status = (prop) => {
  const { variant, children, onClick } = prop;
  return (
    <div
      className={`duration-200 pl-2 py-2 px-6 flex justify-start items-center gap-2 ${
        variant == "s" && "bg-cyan-800 text-cyan-200"
      } ${variant == "d" && "bg-red-800 text-red-200"} rounded-full`}
    >
      <div>
        <XMarkIcon
          onClick={(e) => onClick()}
          className={`duration-200 h-7 w-7 cursor-pointer bg:transparent rounded-full p-1 active:ring-1 ${
            variant == "s" && "hover:bg-cyan-700  active:ring-cyan-200"
          } ${variant == "d" && "hover:bg-red-700 active:ring-red-200"}`}
        ></XMarkIcon>
      </div>
      <div>{children}</div>
    </div>
  );
};
export default Status;
