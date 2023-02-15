import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import React from "react";
import Buttoncmp from "../UI/Buttoncmp";
import Dropdown from "../UI/Dropdown";
import Inputcmp from "../UI/Inputcmp";

export const Login = (prop) => {

  const { onLogin } = prop;
  const options = ["Chairman", "Evaluator", "Chairman of Exam Committee"];
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="block h-min rounded-2xl  border bg-slate-50 border-slate-300  p-10 max-w-lg mx-8">
        <form
          className="grid sm:grid-cols-2 gap-x-8 gap-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            // console.log(e);
            onLogin(e);
          }}
        >
          <div className="col-span-2 flex  mb-8">
            <span className="text-2xl font-medium text-cyan-700">
              User Login
            </span>
          </div>
          <Dropdown
            label="Choose role"
            type="select"
            name="role"
            id="role"
            search={false}
            options={options}
            required={true}
          ></Dropdown>
          <Inputcmp
            label="Enter EvaluatorID"
            type="text"
            name="evaluatorid"
            id="evaluatorid"
            placeholder="e.g. 123"
            required={true}
          ></Inputcmp>
          <div className="col-span-2">
            <Inputcmp
              label="Password"
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              required={true}
            ></Inputcmp>
          </div>
          <div className="mt-4">
            <Buttoncmp type="submit" label="Login" variant="stpr" size="min">
              <ArrowRightOnRectangleIcon></ArrowRightOnRectangleIcon>
            </Buttoncmp>
          </div>
        </form>
      </div>
    </div>
  );
};
