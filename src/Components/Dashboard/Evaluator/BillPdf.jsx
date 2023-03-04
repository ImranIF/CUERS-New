import React from 'react'
import Spin from '../../UI/Spin';
import { PDFViewer } from "@react-pdf/renderer";
import { StyleSheet } from '@react-pdf/renderer';
import { Page } from '@react-pdf/renderer';
import { View } from '@react-pdf/renderer';
import { Text } from '@react-pdf/renderer';
const tableCols = [
	{
		col: "activity_type_id",
	},
	{
		col: "category",
	},
	{
		col: "course_id",
	},
	{
		col: "factor",
	},
	{
		col: "quantity",
	},

	];
const styles = StyleSheet.create({
  text: {
    lineHeight: "1.5",
  },
  pageCol: {
    flexDirection: "col",
    padding: "40px 40px 40px 40px",
    fontFamily: "Helvetica",
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
    height: "70px",
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
	let {billData} = prop;

	if(billData ===  null || billData === undefined|| billData.length == 0 ){
		return <Spin text="hang on!"></Spin>
	}
	else{
    let keys = Object.keys(billData[0]);
    keys.sort();
    return (
	<div>
		<div className='table w-full'>
      <div className='table-header-group top-0 sticky bg-slate-300'>
			{
        <div className='table-row'>{

				keys.map((key) => (
          <div className=' table-cell p-2 border border-slate-900'>{key}</div>
        ))
        }
        </div>
			}
      </div>
          {
  billData &&
    billData.map((item) => (
      <div className='table-row'>
        {keys.map((key) => (
          <div className='table-cell border p-2'>
            <div>{item[key]}</div>
          </div>
        ))}
      </div>
    ))}
	</div>
  </div>
);}}

export default BillPdf;
