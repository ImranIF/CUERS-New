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
import { useState } from "react";
import { useEffect } from "react";
const CourseActivityTable = (prop) => {
  const { activity, styles } = prop;
  const [activityData, setActivityData] = useState([]);
  const numCols = Object.keys(activity && activity.data[0]).length;
  const colWidth = `${100 / numCols}%`;
  return (
    <View style={styles.aTable}>
      <View style={styles.titleContainer}>
        <Text style={styles.title1}>
          {activity.structure.activity_name} -{" "}
          {activity.structure.sector_or_program}
        </Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          {activity &&
            Object.keys(activity.data[0]).map((key) => (
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{key}</Text>
              </View>
            ))}
        </View>
        {activity &&
          activity.data.map((item) => (
            <View style={styles.tableRow}>
              {Object.values(item).map((value) => (
                <View style={[styles.tableCol, { width: colWidth }]}>
                  <Text style={styles.tableCell}>{value}</Text>
                </View>
              ))}
            </View>
          ))}
      </View>
    </View>
  );
};

export default CourseActivityTable;
