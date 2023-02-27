import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { fetchData } from "../../fetchModule";
import { useEffect } from "react";
import { useState } from "react";

Font.registerHyphenationCallback((word) => {
  // Return entire word as unique part
  return [word];
});
const styles = StyleSheet.create({
  pageCol: {
    flexDirection: "col",
    padding: "40px 40px 40px 40px",
    fontFamily: "Helvetica",
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
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#000000",
    borderWidth: 1,
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
});

const queries = [];
const ActivityPDF = () => {
  const semester_no = sessionStorage.getItem("semester_no");
  const year = sessionStorage.getItem("year");
  const [data, setdata] = useState([]);
  useEffect(() => {
    console.log("here");
    const loadData = async () => {
      const data = await fetchData(
        "Exam_Committee",
        "processData",
        undefined,
        [],
        `
select e.evaluator_name as 'Name', e.designation as 'Designation', CONCAT(e.dept_name, ', ', e.university_name ) as 'Address', ex.role as 'Role' from Exam_Committee ex
         join Evaluator e on e.evaluator_id = ex.evaluator_id
         where semester_no = ${semester_no} and year = ${year}
order by Field(Role, 'Chairman', 'Member', 'External member');
`
      );
      setdata(data);
      console.log("Data is", data);
    };
    loadData();
    return () => {};
  }, []);
  return (
    <div className="w-full border border-slate-900 h-full">
      <PDFViewer className="w-full min-h-full">
        <Document>
          <Page size="A4" style={styles.pageCol}>
            <View style={styles.titleContainer}>
              <Text style={styles.title1}>
                {semester_no}th Semester BSc(Engineering) Examination {year}{" "}
                Committee
              </Text>
            </View>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                {data[0] &&
                  Object.keys(data[0]).map((item) => (
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{item}</Text>
                    </View>
                  ))}
              </View>
              {data.map((item) => (
                <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{item.Name}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{item.Designation}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{item.Address}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{item.Role}</Text>
                  </View>
                </View>
              ))}
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default ActivityPDF;
