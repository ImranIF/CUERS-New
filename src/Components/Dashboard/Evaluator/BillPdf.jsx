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
import { fetchData } from "../../fetchModule";
import { useEffect } from "react";
import { useState } from "react";
import Spin from "../../UI/Spin";
import "../../../Styles/fonts.css";
import HindSiliguriRegular from "../../../assets/Fonts/HindSiliguri/HindSiliguri-Regular.ttf";
import HindSiliguriBold from "../../../assets/Fonts/HindSiliguri/HindSiliguri-Bold.ttf";
import HindSiliguriSemi from "../../../assets/Fonts/HindSiliguri/HindSiliguri-SemiBold.ttf";
import HindSiliguriMed from "../../../assets/Fonts/HindSiliguri/HindSiliguri-Medium.ttf";
import { toBanglaNumber } from "../../../Modules/toBanglaNumber";
import activityList from "../../Resources/Data/ActivityList";

Font.registerHyphenationCallback((word) => {
  // Return entire word as unique part
  return [word];
});
Font.register({
  family: "HindSiliguriRegular",
  src: HindSiliguriRegular,
});
Font.register({
  family: "HindSiliguriBold",
  src: HindSiliguriBold,
});
Font.register({
  family: "HindSiliguriMed",
  src: HindSiliguriMed,
});
Font.register({
  family: "HindSiliguriSemi",
  src: HindSiliguriSemi,
});
const styles = StyleSheet.create({
  text: {
    lineHeight: "1.5",
  },
  pageCol: {
    flexDirection: "col",
    padding: "20px 20px 20px 20px",
    fontFamily: "HindSiliguriRegular",
    fontSize: "6px",
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
    fontFamily: "HindSiliguriRegular",
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#000000",
    borderWidth: 0.5,
    fontSize: "5px",
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
    borderWidth: 0.5,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.5px",
  },
  leftAligned: {
    textAlign: "left",
  },
  rightAligned: {
    textAlign: "right",
  },
  topPart: {
    display: "flex",
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
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
    width: "30px",
    height: "45px",
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
});

const BillPdf = (prop) => {
  const keys = [
    ["ক্রমিক নং ", "8%"],
    ["কাজের নাম ", "20%"],
    ["কোর্স নং ", "12%"],
    ["খাতা/ছাত্রের সংখ্যা ", "12%"],
    ["কত ঘণ্টার পরীক্ষা ", "12%"],
    ["মোট দিন/সদস্য সংখ্যা ", "12%"],
    ["অর্ধ/পূর্ণ পত্র ", "12%"],
    ["টাকার পরিমাণ ", "12%"],
  ];
  const billData = JSON.parse(sessionStorage.getItem("billItem"));
  console.log(billData);
  const evaluator = JSON.parse(sessionStorage.getItem("evaluatorInfo"));
  return (
    <div className="w-full border border-slate-900 h-full">
      <PDFViewer className="w-full min-h-full">
        <Document>
          <Page size="A5" style={styles.pageCol}>
            <View style={[styles.topPart, { marginBottom: "10px" }]}>
              // for image
              <View>
                <Image
                  style={styles.logo}
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/8/86/University_of_Chittagong_logo.svg/225px-University_of_Chittagong_logo.svg.png"
                ></Image>
              </View>
              <View
                style={{
                  position: "absolute",
                  right: "1px",
                  width: "100%",
                  textAlign: "right",
                  margin: "auto",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Text style={[styles.text]}>
                  রেজিস্টারের পৃষ্ঠা নংঃ {"\n"}
                  পরীক্ষকের ক্রমিক নংঃ {toBanglaNumber(evaluator.evaluator_id)}
                </Text>
              </View>
            </View>
            <View style={{}}>
              <Text
                style={{
                  fontSize: "12px",
                  fontFamily: "HindSiliguriSemi",
                  textAlign: "center",
                }}
              >
                পরীক্ষা সংক্রান্ত কাজের পারিতোষিক বিল ফরম{" "}
              </Text>
              <Text style={{ fontSize: "6px" }}>
                (বিল সংশ্লিষ্ট পরীক্ষা কমিটির চেয়ারম্যানের মাধ্যমে পরীক্ষা
                অনুষ্ঠিত হওয়ার এক বছরের মধ্যে পরীক্ষা নিয়ন্ত্রণ দপ্তরে দাখিল
                করতে হবে। প্রতি পরীক্ষার জন্য পৃথক পৃথকভাবে বিল দাখিল করতে হবে।)
              </Text>
            </View>
            <View>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCol, { width: "50%" }]}>
                    <Text style={styles.tableCell}>
                      পরীক্ষকের নাম(বাংলায়) : {`${evaluator.evaluator_name} `}
                    </Text>
                  </View>
                  <View style={[styles.tableCol, { width: "50%" }]}>
                    <Text style={styles.tableCell}>বিষয় : {` `}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCol, { width: "50%" }]}>
                    <Text style={styles.tableCell}>
                      ইংরেজি(বড় অক্ষরে) : {`${evaluator.evaluator_name} `}
                    </Text>
                  </View>
                  <View style={[styles.tableCol, { width: "50%" }]}>
                    <Text style={styles.tableCell}>পরীক্ষার নাম : {` `}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCol, { width: "50%" }]}>
                    <Text style={[styles.tableCell, {}]}>
                      পদবী, পূর্ণ ঠিকানা ও মোবাইল নম্বর :{" "}
                      {`${
                        evaluator.designation +
                        ", " +
                        evaluator.dept_name +
                        ", " +
                        evaluator.university_name +
                        ", " +
                        evaluator.phone_no
                      } `}
                    </Text>
                  </View>
                  <View style={[styles.tableCol, { width: "50%" }]}>
                    <View style={styles.tableRow}>
                      <View
                        style={[
                          styles.tableCol,
                          {
                            width: "100%",
                            border: "none",
                            borderBottom: "0.5px",
                          },
                        ]}
                      >
                        <Text style={styles.tableCell}>
                          পরীক্ষার বৎসর : {` `}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View
                        style={[
                          styles.tableCol,
                          { width: "100%", border: "none" },
                        ]}
                      >
                        <Text style={styles.tableCell}>
                          পরীক্ষা অনুষ্ঠানের তারিখ : {` `}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            /// activity table
            <View style={[styles.table, { marginTop: "5px" }]}>
              // table headers
              <View style={styles.tableRow}>
                {keys.map((item, index) => (
                  <View style={[styles.tableCol, { width: item[1] }]}>
                    <Text style={styles.tableCell}>{item[0]}</Text>
                  </View>
                ))}
              </View>
              // table body
              {activityList.map((item) => {
                const matchedBill = billData.filter(
                  (bill) => bill.front === item.no
                )[0];
                // const {
                //   "কোর্স নং": courseNo,
                //   "খাতা/ছাত্রের সংখ্যা": nks,
                //   "কত ঘণ্টার পরীক্ষা": nh,
                // } = matchedBill[0];
                // const reduced = { courseNo, nks, nh };
                //              const keys = [
                //   ["ক্রমিক নং ", "8%"],
                //   ["কাজের নাম ", "20%"],
                //   ["কোর্স নং", "12%"],
                //   ["খাতা/ছাত্রের সংখ্যা", "12%"],
                //   ["কত ঘণ্টার পরীক্ষা", "12%"],
                //   ["মোট দিন/সদস্য সংখ্যা", "12%"],
                //   ["অর্ধ/পূর্ণ পত্র", "12%"],
                //   ["টাকার পরিমাণ", "12%"],
                // ];
                if (item.noEntry) {
                  return (
                    <View style={styles.tableRow}>
                      <View style={[styles.tableCol, { width: "8%" }]}>
                        <Text style={styles.tableCell}>
                          {new RegExp("^\\d+\\.\\d$").test(item.no)
                            ? ""
                            : toBanglaNumber(item.no)}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.tableCol,
                          { width: item.noEntry ? "92%" : "20%" },
                        ]}
                      >
                        <Text
                          style={[
                            styles.tableCell,
                            {
                              paddingLeft:
                                new RegExp("^\\d+\\.\\d$").test(item.no) &&
                                "12px",
                            },
                          ]}
                        >{`${item.row} `}</Text>
                      </View>
                    </View>
                  );
                } else {
                  return (
                    <View style={styles.tableRow}>
                      <View style={[styles.tableCol, { width: "8%" }]}>
                        <Text style={styles.tableCell}>
                          {new RegExp("^\\d+\\.\\d$").test(item.no)
                            ? ""
                            : toBanglaNumber(item.no)}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, { width: "20%" }]}>
                        <Text
                          style={[
                            styles.tableCell,
                            {
                              paddingLeft:
                                new RegExp("^\\d+\\.\\d$").test(item.no) &&
                                "12px",
                            },
                          ]}
                        >{`${item.row} `}</Text>
                      </View>
                      <View style={[styles.tableCol, { width: "12%" }]}>
                        <Text style={styles.tableCell}>
                          {matchedBill && matchedBill["Course no"]
                            ? matchedBill["Course no"]
                            : ""}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, { width: "12%" }]}>
                        <Text style={styles.tableCell}>
                          {matchedBill &&
                          matchedBill["খাতা/ছাত্রের সংখ্যা/পৃষ্ঠার সংখ্যা"]
                            ? matchedBill["খাতা/ছাত্রের সংখ্যা/পৃষ্ঠার সংখ্যা"]
                            : ""}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, { width: "12%" }]}>
                        <Text style={styles.tableCell}>
                          {matchedBill && matchedBill["কত ঘণ্টার পরীক্ষা"]
                            ? matchedBill["কত ঘণ্টার পরীক্ষা"]
                            : ""}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, { width: "12%" }]}>
                        <Text style={styles.tableCell}>
                          {matchedBill &&
                          matchedBill["মোট দিন/সদস্য সংখ্যা/পরীক্ষার সংখ্যা"]
                            ? matchedBill[
                                "মোট দিন/সদস্য সংখ্যা/পরীক্ষার সংখ্যা"
                              ]
                            : ""}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, { width: "12%" }]}>
                        <Text style={styles.tableCell}>
                          {matchedBill && matchedBill["অর্ধ/পূর্ণ পত্র"]
                            ? matchedBill["অর্ধ/পূর্ণ পত্র"]
                            : ""}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, { width: "12%" }]}>
                        <Text style={styles.tableCell}>
                          {matchedBill && matchedBill["টাকার পরিমাণ"]
                            ? matchedBill["টাকার পরিমাণ"]
                            : ""}
                        </Text>
                      </View>
                    </View>
                  );
                }
              })}
              <View style={styles.tableRow}>
                <View
                  style={[
                    styles.tableCol,
                    {
                      width: "88%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    },
                  ]}
                >
                  <Text style={styles.tableCell}>মোট টাকা কথায় =  </Text>
                  <Text>মোট টাকা =  </Text>
                </View>
                <View style={[styles.tableCol, { width: "12%" }]}>
                  <Text style={styles.tableCell}> </Text>
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};
export default BillPdf;
