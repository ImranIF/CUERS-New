import React from "react";
import Dropdown from "./Dropdown";
import Inputcmp from "./Inputcmp";

const Temptable = (prop) => {
    const {activity_type, activities} = prop;
    return (
      <div className="">
        <div className="flex-col">
        {activities.map((activity, key) => (
            <div id={activity} className="w-full grid grid-cols-9 gap-2 mb-1 p-1">
            <div className="flex justify-center items-center">{activity}</div>
                <div className="w-auto">
                    <Dropdown
                        type="select"
                        options={activity_type.activity_type_id}
                        name={activity_type + "activity_type_id"}
                        id={activity_type + "activity_type_id"}
                    ></Dropdown>
                </div>
                <div className="w-auto">
                    <Dropdown
                        type="select"
                        options={activity_type.sector}
                        name={activity + "sector/program"}
                        id={activity + "sector/program"}
                    ></Dropdown>
                </div>
                <div className="w-auto">
                    <Dropdown
                        type="select"
                        options={activity_type.category}
                        name={activity + "category"}
                        id={activity + "category"}
                    ></Dropdown>
                </div>
                <div className="col-span-3 md:col-span-1">
                    <Inputcmp
                        type="text"
                        name="quantity-initial"
                        id="quantity-initial"
                        placeholder="Intial quantity"
                    ></Inputcmp>
                </div>
                <div className="col-span-3 md:col-span-1">
                    <Inputcmp
                        type="text"
                        name="quantity-final"
                        id="quantity-final"
                        placeholder="Final quantity"
                    ></Inputcmp>
                </div>
                <div className="w-auto">
                    <Dropdown
                        type="select"
                        options={activity_type.factor}
                        name={activity + "factor"}
                        id={activity + "factor"}
                    ></Dropdown>
                </div>
                <div className="col-span-3 md:col-span-1">
                    <Inputcmp
                        type="text"
                        name="min-bill"
                        id="min-bill"
                        placeholder="Min bill"
                    ></Inputcmp>
                </div>
                <div className="col-span-3 md:col-span-1">
                    <Inputcmp
                        type="text"
                        name="bill"
                        id="bill"
                        placeholder="Bill"
                    ></Inputcmp>
                </div>
            </div>
        ))}
    </div>
  </div>
);
};

export default Temptable;