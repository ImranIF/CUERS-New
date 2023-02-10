import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import React, {useState} from "react";
import Buttoncmp from "../../UI/Buttoncmp";
// import Inputcmp from "../../Inputcmp";
import Temptable from "../../UI/Temptable";

const activity_type = {
    activity_type_id: [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17" 
    ],
    sector: [
        "Honours/Masters",
        "M.Phil",
        "PhD",
        "BSc, MSc",
        "Terminal",
        "Tutorial",
        "Lab",
        "Scrutiny",
        "MSc (Project/thesis)",
        "Lab notebook",
        "Industrial tour",
        "BSc (1st year to 3rd year)",
        "BSc (4th year)"
    ],
    category: [
        "Course_activity",
        "Semester_activity"
    ],
    factor: [
        "Hours",
        "No of questions",
        "No of members in Exam Committee",
        "No of students",
        "No of exams",
        "Course",
        "Bill for question setting"
    ],
}

const FillActivityBill = () =>{

    const[activities, setActivities] = useState([1, 2]);

    function addactivities(e){
        console.log(e);
        setActivities([...activities, (activities.length + 1)]);
    }
    function removeactivities(e){
        console.log(e);
        let activity = activities.slice(0, -1);
        setActivities([...activity])
    }


    return (
        <div className="flex h-auto w-auto justify-center">
            <form action="" className="w-9/12 min-w-fit max-w-4xl p-2 my-4">
                <hr className="border border-slate-300 mt-12"></hr>
                <div className="mb-8 mt-8">
                    <div>
                        <span className="text-xl sm:text-2xl block">
                            Activity Bill information
                        </span>
                    </div>
                    <div className="mt-8">
                        <Temptable activity_type={activity_type} activities = {activities}></Temptable>
                    </div>
                </div>
                <div className="w-full mb-8 flex gap-4">
                    <Buttoncmp
                        onClick={addactivities}
                        variant="stse"
                        size="min"
                        type="button"
                    >
                        <PlusCircleIcon></PlusCircleIcon>
                    </Buttoncmp>
                    <Buttoncmp
                        onClick={removeactivities}
                        variant="stse"
                        size="min"
                        type="button"
                    >
                        <MinusCircleIcon></MinusCircleIcon>
                    </Buttoncmp>
                </div>
                <Buttoncmp type="submit" label="Save" variant="stpr"></Buttoncmp>
                <hr className="border border-slate-300 mt-12"></hr>
            </form>
            
        </div>
    )
};

export default FillActivityBill;