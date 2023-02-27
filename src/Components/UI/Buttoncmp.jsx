import React from "react";
// Possible combinations:
/*
For each either full / min
  1. standard-primary: stpr
  2. standard-secondary: stse
  3. standard-simple: stsi
  3. dangerous-primary: dapr
  4. dangerous-secondary: dase
  5. dangerous-simple: dasi
*/
const buttonstyle = {
  initial:
    "duration-100 py-2 rounded-md shadow-md focus:outline-none focus:ring-offset-1 active:ring-1 ",
  iconInitial: "w-6 h-6",
  standard: {
    primary: {
      icon: "text-cyan-50",
      default: "bg-cyan-900 text-cyan-50 active:bg-cyan-800",
      hover: "hover:bg-cyan-700",
      focus: "focus:ring focus:ring-cyan-900 ",
      active: "text-cyan-900 bg-slate-300",
    },
    secondary: {
      icon: "text-cyan-700 active:bg-cyan-100",
      default: "border-2 border-cyan-700 text-cyan-700",
      hover: "hover:bg-cyan-50",
      focus: "focus:ring focus:ring-cyan-200",
      active: "text-cyan-900 bg-slate-300",
    },
    simple: {
      icon: "",
      default: "text-cyan-900 shadow-none active:ring-cyan-800",
      hover: "hover:bg-slate-300",
      focus: "focus:bg-cyan-900 focus:text-cyan-100 focus:ring-cyan-900",
      active: "text-cyan-900 bg-slate-300",
    },
  },
  dangerous: {
    primary: {
      icon: "text-red-50",
      default: "bg-red-900 text-red-50 active:bg-red-800",
      hover: "hover:bg-red-700",
      focus: "focus:ring focus:ring-red-900",
      active: "text-cyan-900 bg-slate-300",
    },
    secondary: {
      icon: "text-red-700",
      default: "border-2 border-red-700 text-red-700 active:bg-red-100",
      hover: "hover:bg-red-50",
      focus: "focus:ring focus:ring-red-100",
      active: "text-cyan-900 bg-slate-300",
    },
    simple: {
      icon: "",
      default: "text-red-900 shadow-none active:ring-red-800",
      hover: "hover:bg-red-900 hover:text-red-100",
      focus: "focus:bg-red-900 focus:text-red-100",
      active: "text-cyan-900 bg-slate-300",
    },
  },
};

const Buttoncmp = (prop) => {
  const { label, type, variant, size, onClick, isActive } = prop;
  let buttonVariant =
    buttonstyle.initial +
    " " +
    (size && size.localeCompare("full") == 0 ? "w-full" : "w-fit");
  let iconVariant = buttonstyle.iconInitial + " " + (label ? "mr-1" : "");
  let btv;
  if (variant.localeCompare("stpr") == 0) {
    btv = buttonstyle.standard.primary;
  } else if (variant.localeCompare("stse") == 0) {
    btv = buttonstyle.standard.secondary;
  } else if (variant.localeCompare("dapr") == 0) {
    btv = buttonstyle.dangerous.primary;
  } else if (variant.localeCompare("dase") == 0) {
    btv = buttonstyle.dangerous.secondary;
  } else if (variant.localeCompare("stsi") == 0) {
    btv = buttonstyle.standard.simple;
  } else if (variant.localeCompare("dasi") == 0) {
    btv = buttonstyle.dangerous.simple;
  }
  iconVariant += " " + btv.icon;
  buttonVariant += " " + btv.default + " " + btv.hover + " " + btv.focus;
  if (isActive) {
    buttonVariant += " " + btv.active;
  }

  // console.log(buttonVariant);
  return (
    <div>
      <button
        type={type}
        onClick={(e) => {
          onClick ? onClick(e) : null;
        }}
        className={`${buttonVariant}`}
      >
        <div className="mx-4 flex">
          {prop.children ? (
            <div className={`${iconVariant}`}>{prop.children}</div>
          ) : null}
          <span className="text-md flex text-left">{label}</span>
        </div>
      </button>
    </div>
  );
};

export default Buttoncmp;
