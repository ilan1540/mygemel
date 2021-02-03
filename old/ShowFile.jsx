import React,{useEffect,useState} from 'react'
import {useSelector} from 'react-redux'
import {stringToFormtMMYYYY} from  '../redux/globalFunc'
import { ShowTable } from '../showTable/ShowTable'

export const ShowFile = () => {
  const [fDate,setFdate] =useState()
  const [uDate,setUdate] =useState()
  const data = useSelector(state => state.gemel.data[0])

  // חילוץ תקופת דיווח מקובץ הנתונים
  useEffect(() => {
    if(data){
      const i = data.sheetData.length
     setFdate(stringToFormtMMYYYY(data.sheetData[0].TKF_DIVUACH))
     setUdate(stringToFormtMMYYYY(data.sheetData[i-1].TKF_DIVUACH))
    }
  }, [data,fDate,uDate])

  return (
    <>
    {data ? (
      <div>
        <div className="row">
          <div className="col s12">
          <div className="card-panel blue darken-1 ">
      <h5 className="white-text center-align">לתקופה {fDate} עד {uDate}</h5>
    </div>
    <ShowTable />
          </div>
          
        </div>
        
    
      </div>
      
    ):null}
      
    </>
  )
}
