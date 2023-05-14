import React, { useEffect } from 'react';
const UserInfo = () => {
  const evaluatorInfo = JSON.parse(sessionStorage.getItem('evaluatorInfo'));
  let role = sessionStorage.getItem('role');
  if (evaluatorInfo && role) {
    const { evaluator_name, designation, dept_name, university_name } =
      evaluatorInfo;
    if (role.localeCompare('Chairman of Exam Committee') == 0) {
      const year = sessionStorage.getItem('year');
      const sem_no = parseInt(sessionStorage.getItem('semester_no'));
      const suffix = ['st', 'nd', 'rd', 'th'][sem_no < 4 ? sem_no - 1 : 3];
      role = role + ', ' + sem_no + suffix + ' semester examination ' + year;
    }
    return (
      <div className="bg-slate-300 rounded-lg w-full h-min px-3 py-3">
        <div className="flex-col">
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
