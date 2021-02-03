import React from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
//import { registerLocale, setDefaultLocale } from 'react-datepicker';
//import he from 'date-fns/locale/he';
//import './style.css'


export const SelectDate = ({date,setDate}) =>{ 
 


  return (
    <>
      <DatePicker className="select-css"
        selected={date}
        onChange={date => setDate(date)}
        date={date}
        dateFormat="MM/yyyy"
        showMonthYearPicker
      />
      
    </>
  );
};