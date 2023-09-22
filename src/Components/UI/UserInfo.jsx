import React, { useEffect, useState } from "react";
const UserInfo = () => {
  const evaluatorInfo = JSON.parse(sessionStorage.getItem("evaluatorInfo"));
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [isBlob, setBlob] = useState(false);
  let role = sessionStorage.getItem("role");
  useEffect(() => {
    if (evaluatorInfo && role && !isBlob) {
      console.log(evaluatorInfo);
      const { evaluator_name } = evaluatorInfo;
      console.log("Evaluator is: ", evaluator_name);
      fetch("http://localhost:3000/users/profiledata", {
        method: "POST",
        body: JSON.stringify({ evaluator_name: evaluator_name }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log("Image Data:", response);
          if (!response.ok) {
            throw new Error("Failed to load image");
          }
          return response.arrayBuffer();
        })
        .then((arrayBuffer) => {
          const blob = new Blob([arrayBuffer]);
          const imageUrl = URL.createObjectURL(blob);
          setProfilePicUrl(imageUrl);
          setBlob(true);
        });
    }
  }, [evaluatorInfo, role]);
  if (evaluatorInfo && role) {
    const { evaluator_name, designation, dept_name, university_name } =
      evaluatorInfo;
    if (role.localeCompare("Chairman of Exam Committee") == 0) {
      const year = sessionStorage.getItem("year");
      const sem_no = parseInt(sessionStorage.getItem("semester_no"));
      const suffix = ["st", "nd", "rd", "th"][sem_no < 4 ? sem_no - 1 : 3];
      role = role + ", " + sem_no + suffix + " semester examination " + year;
    }
    return (
      <div className="bg-slate-300 rounded-lg w-full h-min px-3 py-2">
        <div className="flex-col">
          <div className="w-20 h-20 rounded-full overflow-hidden object-cover mx-auto my-5">
            <img
              src={profilePicUrl}
              alt={`Profile picture of ${evaluator_name}`}
            />
          </div>
          <div className="flex-row pb-2 w-full">
            <div className="bg-slate-600  w-fit px-2 py-1 rounded-md text-slate-100">
              {role}
            </div>
          </div>
          <div>{evaluator_name}</div>
          <div>{`${designation}` + `, ` + `${dept_name}`}</div>
          <div>{university_name}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="animate-pulse bg-slate-300 rounded-lg w-full h-44"></div>
    );
  }
};

export default UserInfo;
