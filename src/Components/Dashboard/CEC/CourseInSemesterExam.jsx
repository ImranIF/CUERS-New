import React from "react";
import Dropdown from "../../UI/Dropdown";
import Tablenew from "../../UI/Tablenew";

const CourseInSemesterExam = () => {
  return (
    <div>
      <div className="mb-8 mt-8">
        <span className="text-xl sm:text-2xl block text-center">
          Course in Semester Exam
        </span>
      </div>
      <Tablenew
        tableCols={tableCols}
        tableName="Course_in_Semester_Exam"
      ></Tablenew>
    </div>
  );
};
export default CourseInSemesterExam;
