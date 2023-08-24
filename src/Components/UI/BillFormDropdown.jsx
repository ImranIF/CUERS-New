import React, { useState, useEffect } from "react";
import BillButtonComp from "./BillButtonComp";
import Buttoncmp from "./Buttoncmp";
import { useNavigate } from "react-router";
import Tab from "./Tab";

const BillFormDropdown = (props) => {
  const [options, setOptions] = useState([]);
  const [years, setYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [currentYear, setCurrentYear] = useState("");
  const [currentSem, setCurrentSem] = useState("");
  const { updateSemester, updateYear, billData } = props;
  useEffect(() => {
    let evaluator_id = sessionStorage.getItem("evaluator_id");
    const postData = async () => {
      try {
        const params = {
          evaluator_id: evaluator_id,
          query: `with couse_activity as(select distinct semester_no, year from Evaluates_Course_Activity where evaluator_id=${evaluator_id}),
     semester_activity as(select distinct semester_no, year from Processes_Semester_Activity where evaluator_id=${evaluator_id})
select distinct coalesce(c.semester_no,s.semester_no) as semesters_they_in, coalesce(c.year, s.year) as years_they_in from couse_activity c, semester_activity s;`,
        };
        let response = await fetch(
          "http://localhost:3000/users/process_semester_info",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
          }
        );

        if (response.ok) {
          let data = await response.json();
          let parsedData = JSON.parse(data);
          console.log(
            parsedData[0].semesters_they_in,
            parsedData[0].years_they_in
          );
          // updateDropdownOptions(parsedData);
          setOptions([...parsedData]);
          setYears([...parsedData].map((item) => item.years_they_in));
          console.log([...parsedData]);
        } else {
          throw new Error("Error posting data");
        }
      } catch (error) {
        console.error("Error posting data:", error);
      }
    };

    postData();
  }, []);

  // const handleOptionChange = (event) => {
  //     setSelectedOption(event.target.value);
  // };

  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-row gap-4 mb-8 items-center">
        <Tab
          tabs={years}
          setSelected={(selected) => {
            setCurrentYear(selected);
            updateYear(selected);
          }}
        ></Tab>
      </div>
      <div className="flex flex-row gap-4 mb-8 items-center">
        {options &&
          options.map(
            (item, index) =>
              item.years_they_in == currentYear && (
                <Buttoncmp
                  key={item && item.semesters_they_in + index}
                  type="submit"
                  label={
                    item &&
                    `${item.semesters_they_in}${
                      ["st", "nd", "rd", "th"][
                        parseInt(item.semesters_they_in) < 4
                          ? parseInt(item.semesters_they_in) - 1
                          : 3
                      ] +
                      " " +
                      "semester exam "
                    }
               `
                  }
                  variant="stsi"
                  isActive={currentSem == item.semesters_they_in}
                  size="min"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentSem(item.semesters_they_in);
                    updateSemester(item.semesters_they_in);
                  }}
                ></Buttoncmp>
              )
          )}

        <Buttoncmp
          label="View PDF"
          variant="dase"
          size="min"
          onClick={(e) => {
            e.preventDefault();
            navigate("/dashboard/evaluator/generate-bill-pdf");
          }}
        ></Buttoncmp>
      </div>
    </div>
  );
};

export default BillFormDropdown;
