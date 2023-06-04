import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { fetchData } from "../../../fetchModule";
import { useEffect } from "react";
import { useState } from "react";
import CourseActivityTable from "./CourseActivityTable";
import Spin from "../../../UI/Spin";
import SemesterActivityTable from "./SemesterActivityTable";
import "../../../../Styles/fonts.css";
import HindSiliguri from "../../../../assets/Fonts/HindSiliguri/HindSiliguri-Regular.ttf";
import Kalpurush from "../../../../assets/Fonts/Kalpurush/Kalpurush.ttf";

Font.registerHyphenationCallback((word) => {
  // Return entire word as unique part
  return [word];
});
Font.register({
  family: "Kalpurush",
  src: Kalpurush,
});
const styles = StyleSheet.create({
  text: {
    lineHeight: "1.5",
  },
  pageCol: {
    flexDirection: "col",
    padding: "40px 40px 40px 40px",
    fontFamily: "Kalpurush",
    fontSize: "12px",
  },
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title1: {
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "underline",
    marginBottom: "10px",
  },
  table: {
    fontFamily: "Kalpurush",
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#000000",
    borderWidth: 1,
    fontSize: "10px",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableHeader: {
    // borderWidth: 1,
    backgroundColor: "#e2e8f0",
    flexDirection: "row",
  },
  tableRow: {
    // padding: "5px",
    margin: "auto",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderColor: "#000000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "4px",
    fontSize: 12,
  },
  leftAligned: {
    textAlign: "left",
  },
  rightAligned: {
    textAlign: "right",
  },
  topPart: {
    display: "flex",
    flexDirection: "column",
  },
  topPart1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: "1px",
    borderBottom: "1px solid black",
    marginBottom: "10px",
    // border: "1px solid gray",
  },
  topPart2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: {
    width: "50px",
    height: "65px",
  },
  spacer: {
    height: "30px",
    padding: "20px",
    border: "2px solid black",
  },
  applicationBody: {
    lineHeight: 1.5,
    marginTop: "40px",
    marginBottom: "20px",
  },
  aTable: {
    marginBottom: "40px",
  },
  superscript: {
    fontSize: "smaller",
    verticalAlign: "super",
    lineHeight: 0,
  }
});

const queries = [];
const ActivityPDF = (prop) => {
  const { activities, semester_no } = prop;
  const [loading, setLoading] = useState(true);
  let [isRunning, setIsRunning] = useState(false);
  const year = sessionStorage.getItem("year");
  const [courseData, setCourseData] = useState([]);
  const [semesterData, setSemesterData] = useState([]);
  const [examCommittee, setExamCommittee] = useState([]);
  const currentDate = new Date();
  const options = {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    currentDate
  );
  let semesterSuperscript = {semester_no} == 1 ? "st" : (semester_no == 2 ? "nd" : (semester_no == 3 ? "rd" : "th"));
  useEffect(() => {
    // console.log("here");
    console.log("Activities inside useEffect: ", activities);
    const getExamCommittee = async () => {
      const data = await fetchData(
        "Exam_Committee",
        "processData",
        undefined,
        [],
        `
select e.evaluator_name as 'Name', e.designation as 'Designation', CONCAT(e.dept_name, ', ', e.university_name ) as 'Address', ex.role as 'Role' from Exam_Committee ex
         join Evaluator e on e.evaluator_id = ex.evaluator_id
         where semester_no = ${semester_no} and year = ${year}
order by Field (Role, 'Chairman', 'Member', 'External member');
`
      );
      setExamCommittee(data);
      // console.log("Data is", data);
    };
    getExamCommittee();
    const loadTables = async (activity, to_get) => {
      const options = {
        semester_no: semester_no,
        evaluator_id: undefined,
        to_get: to_get,
        activity_type_id: activity.id,
        sector_or_program: activity.sector_or_program,
      };
      const response = await fetch(
        "http://localhost:3000/users/pdfGeneration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(options),
        }
      );
      const result = await response.json();
      result &&
        result.map((item) => {
          for (const key in item) {
            const englishInteger = item[key];
            if (
              new RegExp("^\\d+(\\.\\d+)?$").test(
                englishInteger && englishInteger.toString()
              )
            ) {
              const banglaInteger = englishInteger
                .toString()
                .replace(/0|1|2|3|4|5|6|7|8|9/g, (match) => {
                  return "০১২৩৪৫৬৭৮৯"[match];
                });
              item[key] = banglaInteger;
            }
          }
        });
      if (to_get === "courseActivities") {
        setCourseData((prevData) => [
          ...prevData,
          { structure: activity, data: result },
        ]);
      } else {
        setSemesterData((prevData) => [
          ...prevData,
          { structure: activity, data: result },
        ]);
      }
      if (courseData.length === activities.courseActivities.length) {
        setLoading(false);
      }
    };
    if (
      activities.courseActivities &&
      activities.courseActivities.length > 0 &&
      isRunning === false
    ) {
      setIsRunning(true);
      activities.courseActivities.forEach((activity) =>
        loadTables(activity, "courseActivities")
      );
      setLoading(false);
    }
    if (
      activities.semesterActivities &&
      activities.semesterActivities.length > 0 &&
      isRunning === false
    ) {
      setIsRunning(true);
      activities.semesterActivities.forEach((activity) =>
        loadTables(activity, "semesterActivities")
      );
      setLoading(false);
    }
  }, [activities]);
  // console.log("Data here", data);
  const evaluatorInfo = JSON.parse(sessionStorage.getItem("evaluatorInfo"));
  // console.log("Activities: ", activities);
  console.log("Course data", courseData);
  console.log("Semester data", semesterData);
  if (loading) {
    return (
      <div>
        <Spin></Spin>
      </div>
    );
  } else {
    return (
      <div className="w-full border border-slate-900 h-full">
        <PDFViewer className="w-full min-h-full">
          <Document>
            {/* Front page */}
            <Page size="A4" style={styles.pageCol}>
              <View style={styles.topPart}>
                <View style={styles.topPart1}>
                  <View style={styles.leftAligned}>
                    <Text style={styles.text}>
                      কম্পিউটার বিজ্ঞান ও প্রকৌশল বিভাগ {"\n"} চট্টগ্রাম
                      বিশ্ববিদ্যালয়, চট্টগ্রাম-৪৩৩১{" \n"}
                      ইমেইল: office.cse@cu.ac.bd {"\n"}
                      ওয়েব : www.cu.ac.bd/cse/
                    </Text>
                  </View>
                  <View>
                    <Image
                      style={styles.logo}
                      src="https://upload.wikimedia.org/wikipedia/en/thumb/8/86/University_of_Chittagong_logo.svg/225px-University_of_Chittagong_logo.svg.png"
                    ></Image>
                  </View>
                  <View style={styles.rightAligned}>
                    <Text style={styles.text}>
                      ফোন: ৮৮(০৩১)৭১৬৫৫২,৭১৬৫৫৮, {"\n"}{" "}
                      ২৬০৬০০১-১০,৭২৬৩১১-৪,২৬০৬০১৫-২৭ {"\n"}
                      এক্সটেনশন: ৪২৯৭(অফিস) {"\n"}
                      ফ্যাক্স: ২৬০৬০১৪,২৬০৬১৪৫
                    </Text>
                  </View>
                </View>
                <View style={styles.topPart2}>
                  <Text style={styles.leftAligned}>
                    স্মারকঃ সিএসই/৪৩০৪৩০/২৬৪/১২৯০/
                  </Text>
                  <Text style={styles.rightAligned}>{formattedDate}</Text>
                </View>
              </View>
              <View style={styles.applicationBody}>
                <Text>
                  বরাবর {"\n"}
                  পরীক্ষা নিয়ন্ত্রক
                  {"\n"}
                  চট্টগ্রাম বিশ্ববিদ্যালয় {"\n"}
                  {"\n"} {"\n"}
                  জনাব,
                  {"\n"} {"\n"}
                  {"\n"} {"\n"}
                  {"\n"} {"\n"}
                  {"\n"} {"\n"}
                  ধন্যবাদান্তে
                  {"\n"} {"\n"}
                  {"\n"} {"\n"}({evaluatorInfo.evaluator_name}) {"\n"}
                  Chairman {"\n"}
                  {sessionStorage.getItem("semester_no")}{semesterSuperscript} Semester BSc
                  Engineering Examination-{sessionStorage.getItem("year")}{" "}
                  committee {"\n"}
                  {evaluatorInfo.dept_name} {"\n"}
                  {evaluatorInfo.university_name} {"\n"}
                  ফোন: {evaluatorInfo.phone_no} {"\n"}
                  {"\n"} {"\n"}
                  {"\n"} {"\n"}
                  সংযুক্তি: {"\n"}
                  ১. পরীক্ষার বিবৃতি
                </Text>
              </View>
            </Page>
            <Page size="A4" style={styles.pageCol}>
              <View style={styles.aTable}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title1}>
                    {semester_no}{semesterSuperscript} Semester BSc(Engineering) Examination {year}{" "}
                    Committee
                  </Text>
                </View>
                <View style={styles.table}>
                  <View style={styles.tableHeader}>
                    {examCommittee[0] &&
                      Object.keys(examCommittee[0]).map((item) => (
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>{item}</Text>
                        </View>
                      ))}
                  </View>
                  {examCommittee.map((item) => (
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{`${item.Name} `}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text
                          style={styles.tableCell}
                        >{`${item.Designation} `}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text
                          style={styles.tableCell}
                        >{`${item.Address} `}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{`${item.Role} `}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>

              {/* Course Activity */}
              {courseData &&
                courseData.map((item) => (
                  <CourseActivityTable
                    styles={styles}
                    activity={item}
                  ></CourseActivityTable>
                ))}

              {/* Semester activity */}
              {semesterData &&
                semesterData.map((item) => (
                  <SemesterActivityTable
                    styles={styles}
                    activity={item}
                  ></SemesterActivityTable>
                ))}
            </Page>
          </Document>
        </PDFViewer>
      </div>
    );
  }
};

export default ActivityPDF;