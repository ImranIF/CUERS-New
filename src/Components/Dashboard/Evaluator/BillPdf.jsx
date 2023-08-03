import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import { fetchData } from '../../fetchModule';
import { useEffect } from 'react';
import { useState } from 'react';
import Spin from '../../UI/Spin';
import '../../../Styles/fonts.css';
import Kalpurush from '../../../assets/Fonts/Kalpurush/Kalpurush.ttf';
import { toBanglaNumber } from '../../../Modules/toBanglaNumber';
import { toEnglishNumber } from '../../../Modules/toEnglishNumber';
import activityList from '../../Resources/Data/ActivityList';
import numberToWords from '../../../Modules/numberToWords';
import { Converter, bnBD } from 'any-number-to-words';
// import {translate} from '@vitalets/google-translate-api';
// import createHttpProxyAgent from 'http-proxy-agent';

Font.registerHyphenationCallback((word) => {
  // Return entire word as unique part
  return [word];
});
Font.register({
  family: 'Kalpurush',
  src: Kalpurush,
});
const styles = StyleSheet.create({
  text: {
    lineHeight: '1.5',
  },
  pageCol: {
    flexDirection: 'col',
    padding: '20px 20px 20px 20px',
    fontFamily: 'Kalpurush',
    fontSize: '10px',
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title1: {
    fontSize: '22px',
    fontWeight: 'bold',
    textDecoration: 'underline',
    marginBottom: '9.5px',
  },
  table: {
    fontFamily: 'Kalpurush',
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderColor: '#000000',
    borderWidth: 0.5,
    fontSize: '7.5px',
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableHeader: {
    // borderWidth: 1,
    backgroundColor: '#e2e8f0',
    flexDirection: 'row',
  },
  tableRow: {
    // padding: "5px",
    margin: 'auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderColor: '#000000',
    borderWidth: 0.5,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.5px 0.5px 0.5px 4px',
  },
  leftAligned: {
    textAlign: 'left',
  },
  rightAligned: {
    textAlign: 'right',
  },
  topPart: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  topPart1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: '1px',
    borderBottom: '1px solid black',
    marginBottom: '10px',
    // border: "1px solid gray",
  },
  topPart2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: '50px',
    height: '78px',
  },
  spacer: {
    height: '30px',
    padding: '20px',
    border: '2px solid black',
  },
  applicationBody: {
    lineHeight: 1.5,
    marginTop: '40px',
    marginBottom: '20px',
  },
  aTable: {
    marginBottom: '40px',
  },
  bottomPart: {
    width: '100%',
    paddingTop: '10px',
    fontSize: '7px',
  },
  sign1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  sign2: {
    display: 'flex',
    height: '55px',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  indSign: {},
  writing: {
    paddingTop: '10px',
  },
});

const BillPdf = (prop) => {
  const keys = [
    ['ক্রমিক\nনং ', '6%'],
    ['কাজের নাম ', '21%'],
    ['কোর্স নং ', '12%'],
    ['খাতা/ছাত্রের\n সংখ্যা ', '12%'],
    ['কত ঘণ্টার\n পরীক্ষা ', '12%'],
    ['মোট দিন/\nসদস্য সংখ্যা ', '12%'],
    ['অর্ধ/পূর্ণ পত্র ', '12%'],
    ['টাকার পরিমাণ ', '13%'],
  ];
  const billData = JSON.parse(sessionStorage.getItem('billItem'));
  console.log(billData);
  let totalBill = 0;
  billData.forEach((item) => {
    if (item && item['টাকার পরিমাণ']) {
      totalBill += +toEnglishNumber(item['টাকার পরিমাণ']);
    }
  });
  const converter = new Converter(bnBD);
  const billInBanglaWords = converter.toWords(totalBill);
  totalBill = toBanglaNumber(totalBill);
  console.log(billInBanglaWords);

  const sem_no = sessionStorage.getItem('semester_no');
  const sem_superscript = {sem_no} == 1 ? "st" : (sem_no == 2 ? "nd" : (sem_no == 3 ? "rd" : "th"));
  const evaluator = JSON.parse(sessionStorage.getItem('evaluatorInfo'));
  return (
    <div className="w-full border border-slate-900 h-full">
      <PDFViewer className="w-full min-h-full">
        <Document title = {`${sem_no}${sem_superscript} Semester Bill Form of ${evaluator.evaluator_english_name}`} fileName = 'bill-form.pdf'>
          <Page size={{ width: 612, height: 1008 }} style={styles.pageCol}>
            <View style={[styles.topPart, { marginBottom: '0px' }]}>
              <View>
                <Image
                  style={styles.logo}
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/8/86/University_of_Chittagong_logo.svg/225px-University_of_Chittagong_logo.svg.png"
                ></Image>
              </View>
              <View
                style={{
                  position: 'absolute',
                  right: '1px',
                  width: '100%',
                  textAlign: 'right',
                  margin: 'auto',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Text style={[styles.text, {textAlign: 'right'}]}>
                  রেজিস্টারের পৃষ্ঠা নংঃ.......................... {'\n'}
                  পরীক্ষকের ক্রমিক নংঃ {`${toBanglaNumber(evaluator.evaluator_id)}`}{' '.repeat(13 - evaluator.evaluator_id.toString().length)}{' '}
                </Text>
              </View>
            </View>
            <View style={{}}>
              <Text
                style={{
                  fontSize: '22px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                পরীক্ষা সংক্রান্ত কাজের পারিতোষিক বিল ফরম{' '}
              </Text>
              <Text style={{ fontSize: '9.3px' }}>
                (বিল সংশ্লিষ্ট পরীক্ষা কমিটির চেয়ারম্যানের মাধ্যমে পরীক্ষা
                অনুষ্ঠিত হওয়ার এক বছরের মধ্যে পরীক্ষা নিয়ন্ত্রণ দপ্তরে দাখিল
                করতে হবে। প্রতি পরীক্ষার জন্য পৃথক পৃথকভাবে বিল দাখিল করতে হবে।)
              </Text>
            </View>
            <View>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCol, { width: '65%' }]}>
                    <Text style={styles.tableCell}>
                      পরীক্ষকের নাম (বাংলায়) : {`${evaluator.evaluator_name} `}
                    </Text>
                  </View>
                  <View style={[styles.tableCol, { width: '35%' }]}>
                    <Text style={styles.tableCell}>
                      বিষয় : কম্পিউটার সায়েন্স এন্ড ইঞ্জিনিয়ারিং
                    </Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCol, { width: '65%' }]}>
                    <Text style={styles.tableCell}>
                      ইংরেজি (বড় অক্ষরে)    :{' '}
                      {`${evaluator.evaluator_english_name.toUpperCase()} `}
                    </Text>
                  </View>
                  <View style={[styles.tableCol, { width: '35%' }]}>
                    <Text
                      style={styles.tableCell}
                    >{`পরীক্ষার নাম : ${toBanglaNumber(
                      JSON.parse(sessionStorage.getItem('semester_no'))
                    )}${toBanglaNumber(
                      ['ম', 'য়', 'য়', 'র্থ', 'ম', 'ষ্ঠ ', 'ম', 'ম'][
                        parseInt(
                          JSON.parse(sessionStorage.getItem('semester_no'))
                        ) - 1
                      ]
                    )} সেমিস্টার বি.এস.সি ইঞ্জিনিয়ারিং পরীক্ষা`}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCol, { width: '65%' }]}>
                    <Text style={[styles.tableCell, {}]}>
                      পদবী, পূর্ণ ঠিকানা ও {'   '}:{' '}{`${
                        evaluator.designation +
                        ', ' +
                        evaluator.dept_name +
                        ', ' +
                        evaluator.university_name +
                        ', '} `} {'\n'} মোবাইল নম্বর{'            '}
                      {`${
                        evaluator.phone_no
                      } `}
                    </Text>
                  </View>
                  <View style={[styles.tableCol, { width: '35%' }]}>
                    <View style={styles.tableRow}>
                      <View
                        style={[
                          styles.tableCol,
                          {
                            width: '100%',
                            border: 'none',
                            borderBottom: '0.5px',
                          },
                        ]}
                      >
                        <Text style={styles.tableCell}>
                          পরীক্ষার বৎসর : {`${toBanglaNumber('2021')}`}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View
                        style={[
                          styles.tableCol,
                          { width: '100%', border: 'none' },
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
            <View style={[styles.table, { marginTop: '5px' }]}>
              // table headers
              <View style={styles.tableRow}>
                {keys.map((item, index) => (
                  <View style={[styles.tableCol, { width: item[1] }]}>
                    <Text style={[styles.tableCell, { fontWeight: 'bold', textAlign: 'center' }]}>
                      {item[0]}
                    </Text>
                  </View>
                ))}
              </View>
              // table body
              {activityList.map((item) => {
                const matchedBill = billData.filter(
                  (bill) => bill.front === item.no
                )[0];
                if (item.noEntry) {
                  return (
                    <View style={styles.tableRow}>
                      <View style={[styles.tableCol, { width: '6%', paddingLeft: '7.5px'}]}>
                        <Text style={styles.tableCell}>
                          {`${toBanglaNumber(item.no)}.`}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.tableCol,
                          { width: item.noEntry ? '94%' : '24%', fontWeight: 'bold' },
                        ]}
                      >
                        <Text
                          style={[
                            styles.tableCell,
                            {
                              paddingLeft:
                                new RegExp('^\\d+\\.\\d$').test(item.no) &&
                                '12px',
                                // opacity: item.no === `8.1` || item.no === `8.2` || item.no === `8.3` || item.no === `8.4` || item.no === `8.5` ? 0 : 1,
                            },
                          ]}
                        >{`${item.row}: `}</Text>
                      </View>
                    </View>
                  );
                } else {
                  return (
                    <View style={styles.tableRow}>
                      <View style={[styles.tableCol, { width: '6%', paddingLeft: '7.5px'}]}>
                        <Text style={[styles.tableCell, {}]}>
                          { item.no.includes(`.`) ? null : `${toBanglaNumber(item.no)}.`}
                        </Text>
                      </View>
                      // কাজের নাম
                      <View style={[styles.tableCol, { width: '21%' }]}>
                        <Text
                          style={[
                            styles.tableCell,
                            {
                              paddingLeft: item.no.includes(`8.`) ? (
                                new RegExp('^\\d+\\.\\d$').test(item.no) &&
                                '4px' ): (new RegExp('^\\d+\\.\\d$').test(item.no) && '26px'),
                            },
                          ]}
                        >{item.no === `3` ? `${item.row}: ` : `${item.row} `}</Text>
                      </View>
                      <View style={[styles.tableCol, { width: '12%', textAlign: 'center', fontSize: '6.5px' }]}>
                        <Text style={styles.tableCell}>
                          {matchedBill && matchedBill['Course no']
                            ? matchedBill['Course no'].length > 22
                              ? matchedBill['Course no'].slice(0, 21) +
                                '...'
                              : matchedBill['Course no']
                            : ''}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, { width: '12%', textAlign: 'center' }]}>
                        <Text style={styles.tableCell}>
                          {matchedBill &&
                          matchedBill['খাতা/ছাত্রের সংখ্যা/পৃষ্ঠার সংখ্যা']
                            ? matchedBill['খাতা/ছাত্রের সংখ্যা/পৃষ্ঠার সংখ্যা']
                            : ''}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, { width: '12%', textAlign: 'center' }]}>
                        <Text style={styles.tableCell}>
                          {matchedBill && matchedBill['কত ঘণ্টার পরীক্ষা']
                            ? matchedBill['কত ঘণ্টার পরীক্ষা']
                            : ''}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, { width: '12%', textAlign: 'center' }]}>
                        <Text style={styles.tableCell}>
                          {matchedBill &&
                          matchedBill['মোট দিন/সদস্য সংখ্যা/পরীক্ষার সংখ্যা']
                            ? matchedBill[
                                'মোট দিন/সদস্য সংখ্যা/পরীক্ষার সংখ্যা'
                              ]
                            : ''}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, { width: '12%', textAlign: 'center' }]}>
                        <Text style={styles.tableCell}>
                          {matchedBill && matchedBill['অর্ধ/পূর্ণ পত্র']
                            ? matchedBill['অর্ধ/পূর্ণ পত্র']
                            : ''}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, { width: '13%', textAlign: 'center' }]}>
                        <Text style={styles.tableCell}>
                          {matchedBill && matchedBill['টাকার পরিমাণ']
                            ? matchedBill['টাকার পরিমাণ']
                            : ''}
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
                      width: '87%',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    },
                  ]}
                >
                  <Text style={styles.tableCell}>
                    মোট টাকা কথায় = {billInBanglaWords}{' '}
                  </Text>
                  <Text>মোট টাকা ={' '}</Text>
                </View>
                <View style={[styles.tableCol, { width: '13%', textAlign: 'center' }]}>
                  <Text style={styles.tableCell}> {`${totalBill}`} </Text>
                </View>
              </View>
            </View>
            <View style={styles.bottomPart}>
              <View style={styles.sign1}>
                <Text style={styles.indSign}>
                  .......................................................
                  {'\n'}
                  প্রতি স্বাক্ষর, সভাপতি, পরীক্ষা কমিটি
                </Text>
                <Text style={styles.indSign}>
                  .......................... {'\n'}
                  পরীক্ষকের স্বাক্ষর
                </Text>
              </View>
              <View style={styles.sign1}>
                <Text
                  style={[
                    styles.indSign,
                    {
                      marginLeft: '-130px',
                    },
                  ]}
                >
                  (সীলমোহর))
                </Text>
              </View>
              <View>
                <Text style={styles.writing}>
                  বিষয়.......................................................................................................................{' '}
                  {'\n'}
                  পরীক্ষা................................................................................................................................................................{' '}
                  {'\n'}
                  প্রফেসর/ড./জনাব......................................................................................................................................................................................................................কে
                  মোট =
                  ...........................................................
                  টাকা{' '}
                </Text>
                <Text style={[styles.indSign, { marginLeft: '40px' }]}>
                  (কথায়)......................................................................................................................................................................................................................................................................মাত্র
                  প্রদান করুন।
                </Text>
                <Text>বিল সংশ্লিষ্ট চেক বুঝে পেলাম।</Text>
              </View>
              <View
                style={[
                  styles.sign1,
                  {
                    marginTop: '10px',
                  },
                ]}
              >
                <Text style={styles.indSign}>
                  ........................................... {'\n'}
                  তারিখসহ গ্রহণকারীর স্বাক্ষর{' '}
                </Text>
                <Text style={styles.indSign}>
                  ...................{'\n'}
                  বিল সহকারী{' '}
                </Text>
                <Text style={styles.indSign}>
                  .......................... {'\n'}
                  সেকশন অফিসার
                </Text>

                <Text style={styles.indSign}>
                  ...................................... {'\n'}
                  উপ-পরীক্ষা নিয়ন্ত্রক, চ.বি.{' '}
                </Text>
              </View>
              <View>
                <Text>
                  .....................................................................................................................................................................................................................................................................................................................................
                </Text>
              </View>
              <View
                style={[
                  styles.sign1,
                  {
                    marginTop: '5px',
                  },
                ]}
              >
                <Text>পরীক্ষার পারিতোষিক বিল প্রাপ্তি স্বীকার </Text>
              </View>
              <View>
                <Text style={styles.writing}>
                  বিষয়...........................................................................................................................................................................পরীক্ষা.....................................................................................................................................................
                </Text>
                <Text>
                  প্রফেসর/ড./জনাব.....................................................................................................................................................................................................................................................................................................................কে
                </Text>
                <Text>
                  মোট=...................................................................................টাকা(কথায়.................................................................................................................................................................................................)
                  প্রদান করা হল।{' '}
                </Text>{' '}
              </View>
              <View style={styles.sign2}>
                <Text>
                  .....................................................
                  {'\n'}
                  হিসাব নিয়ামক/উপ-হিসাব নিয়ামক
                </Text>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};
export default BillPdf;
