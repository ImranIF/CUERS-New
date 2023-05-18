import { useState } from 'react';
const initialOptions = {
  designation: ['অধ্যাপক', 'সহযোগী অধ্যাপক', 'সহকারী  অধ্যাপক', 'প্রভাষক'],
  university_name: [
    'কুমিল্লা বিশ্ববিদ্যালয়',
    'চট্টগ্রাম বিশ্ববিদ্যালয়',
    'রাজশাহী বিশ্ববিদ্যালয়',
    'ঢাকা বিশ্ববিদ্যালয়',
    'খুলনা বিশ্ববিদ্যালয়',
    'বরিশাল বিশ্ববিদ্যালয়',
  ],
  dept_name: [
    'কম্পিউটার বিজ্ঞান বিভাগ',
    'পদার্থবিদ্যা বিভাগ',
    'ইংরেজি বিভাগ',
    'ইলেকট্রনিক্স এবং প্রকৌশল বিভাগ',
    'রসায়ন বিভাগ',
    'গণিত বিভাগ',
    'অর্থনীতি বিভাগ',
  ],
  role: ['Chairman', 'Chairman of Exam Committee', 'Evaluator'],
};
const DropdownOptions = () => {
  const [doptions, setOptions] = useState(initialOptions);
  const addOptionToDropdown = (stateKey, newOption) => {
    console.log('Call happens');
    setOptions((prevOptions) => ({
      ...prevOptions,
      [stateKey]: [...prevOptions[stateKey], newOption],
    }));
  };
  return { doptions, addOptionToDropdown };
};

export default DropdownOptions;
