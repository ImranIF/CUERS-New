const patterns = {
  bengaliPattern: {
    textWithSpace: "^[\\u0980-\\u09FF]+(\\.?\\s+[\\u0980-\\u09FF]+)+$",
    number: "^[০১২৩৪৫৬৭৮৯]+$",
    phoneNo: "^০১[০-৯]{9}$",
  },
};
export default patterns;
