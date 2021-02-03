import React from 'react'
import { useDispatch } from 'react-redux';
import {setExcelJson } from '../redux/actionReducer';
import {Link} from 'react-router-dom'
import {excelToJson} from '../redux/globalFunc';

export const InputFile = () => {
  const dispatch = useDispatch();

  const onGetExcelFilel =(e)=>{
    if (e.target.files[0]) {
        let fileObj = e.target.files[0]
       excelToJson(fileObj, (err,resp)=>{
        if(err){
          console.log(err);            
        }
        else{
          dispatch(setExcelJson(resp));
        } 
       })
  }
  }

 
  return (
 <form className="wrapper"> 
<div>
  <input
   type="file"
    id="file" 
    accept=".xlsx,.xls, .csv "
    onChange={onGetExcelFilel}
  />
  <label htmlFor="file"className=" btn-block">בחר קובץ נתונים</label>
  </div>
  
  <Link to="/showFile" className="btn btn-primary  btn-block">Show data</Link>
  <Link to="/apidata" className="btn btn-primary  btn-block">Show From Api</Link>
  <Link to="/apinext" className="btn btn-primary  btn-block">Show Next From Api</Link>
  <Link to="/showafikim" className="btn btn-primary  btn-block">Show afikm list</Link>
  <Link to="/showTheBest" className="btn btn-primary  btn-block">Show the Best</Link>
   </form>
  )
}
