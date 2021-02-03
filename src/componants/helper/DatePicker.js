import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import he from 'date-fns/locale/he';
//import { useDispatch } from 'react-redux';
//import { getDate } from '../../redux/actionHelper';
//import { formtDate } from '../globalFunc';
//import { textToDateFormat } from '../globalFunc';

registerLocale('he', he);

export const SelectDate = () => {
  const [date, setDate] = useState(new Date());
  setDefaultLocale('he');

 // const dispatch = useDispatch();

  useEffect(() => {
  //  dispatch(getDate(formtDate(date)));
  console.log(date)
  }, [date]);

  // console.log(props);
  return (
    <DatePicker
      className="form-control"
      selected={date}
      onChange={(date) => setDate(date)}
      dateFormat="dd-MM-yyyy"
      todayButton="To Day"
      showYearDropdown
      dropdownMode="select"
      // peekNextMonth
      // showMonthDropdown
      // showYearDropdown
      //  dropdownMode="scroll"
    />
  );
};

export const EditDate = (props) => {
  const [date, setDate] = useState();
  setDefaultLocale('he');

 // const dispatch = useDispatch();
  useEffect(() => {
   // console.log(textToDateFormat(props.value));
    if (props.date) {
      console.log(props.value);
     // setDate(new Date(textToDateFormat(props.value)));
    }
  }, [props, date]);

  return (
    <DatePicker
      className="form-control"
      selected={date}
      onChange={(date) => {
        setDate(date);
     //   dispatch(getDate(formtDate(date)));
      }}
      dateFormat="dd-MM-yyyy"
      todayButton="To Day"
      showYearDropdown
      dropdownMode="select"
      // peekNextMonth
      // showMonthDropdown
      // showYearDropdown
      //  dropdownMode="scroll"
    />
  );
};

/*
help website
https://reactdatepicker.com/
// mor props fof use
      //midDate(new Dtte())
      //maxDate(new Dtte())
      // filterDate={date => date.getDay() != 0 && date.getDate() != 6}
      //isClearable
      //inline
*/
