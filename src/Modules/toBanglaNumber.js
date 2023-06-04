export function toBanglaNumber(englishInteger) {
  // if (
  //   new RegExp('^\\d+(\\.\\d+)?$').test(
  //     englishInteger && englishInteger.toString()
  //   )
  // ) {
  //
  //
  // console.log('converting to bangal: ', englishInteger);
  const banglaInteger = englishInteger
    .toString()
    .replace(/0|1|2|3|4|5|6|7|8|9/g, (match) => {
      return '০১২৩৪৫৬৭৮৯'[match];
    });
  return banglaInteger;
  // }
}
