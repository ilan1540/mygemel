import React,{useEffect,useState} from 'react'
import axios from 'axios'
//import {useSelector} from 'react-redux'

import {stringToFormtMMYYYY as fDate} from '../../redux/globalFunc'
import './style.css'
import { BestChart } from './BestChart'

export const BestForMonth = () => {
  const [repoerPeriod , setReportPeriod]=useState()
  const [lastData , setLastData]=useState([])
  const [lastFive , setLastFive]=useState([])
  const [showChart , setShowCart]=useState(false)
  const [fromSlice , setFromSlice]=useState(0)
  const [untilSlice , setUntilSlice]=useState(50)



 const url= "https://data.gov.il/api/3/action/datastore_search?resource_id=a30dcbea-a1d2-482c-ae29-8f781f5025fb&limit=10000"

 // נתוני גמל לשנה לפי איטם אחרון מחלצים את חודש הדיווח
  useEffect(() => {
   axios.get(url).then(res => {
    const date = res.data;
    setReportPeriod(date.result.records[date.result.records.length-1].REPORT_PERIOD)
// סינון רשומות של החודש האחרון
    if(repoerPeriod !=null){
      setLastData(
        date.result.records.filter((rec)=>{ 
        return  rec.REPORT_PERIOD ===repoerPeriod} )
      )
    }   
  })    
  }, [repoerPeriod])

  useEffect(() => {
// כדי למיין מהגדול לקטן יש להחליף סימנים
    function compare( a, b ) {
      if ( a.MONTHLY_YIELD < b.MONTHLY_YIELD ){
        return 1; // מיון בסדר יורד
      }
      if ( a.MONTHLY_YIELD > b.MONTHLY_YIELD ){
        return -1; // למיון בסדר עולה יש להחליף ולרשום שלילי בתנאי הראשון
      }
      return 0;
    }
    // ביצוע מיון ושמירת 10 הראשונים
   const sort = lastData.sort( compare ).slice(`${fromSlice}`,`${untilSlice}`);

   // console.log(sort)
    setLastFive(sort)
  }, [lastData,fromSlice,untilSlice])

const navHeandel= (name)=>{
  switch (name){
    case 'begin':
    setFromSlice(0)
    setUntilSlice(50)
    break
    case 'forword':
   setFromSlice(fromSlice+50)
   setUntilSlice(untilSlice+50)
    break
    case 'back':
      setFromSlice(fromSlice-50)
      setUntilSlice(untilSlice-50)
    break
    case 'end':
      setFromSlice(lastData.length-49)
      setUntilSlice(lastData.length-1)
    break
   default:
    break




  }
}
  

  return (
    <div>
      {lastFive && lastFive[0] ?(
        <div className="bg-secondary text-white text-center" style={{padding:'6px'
        }}>
      <h1 style={{margin:'auto'}}> המובילות לחודש <span>{fDate(lastFive[0].REPORT_PERIOD)}</span></h1>
      </div>
      ):null}
     
    <div className="container">
    <nav className="nav pr-1" style={{padding:'0px',backgroundColor:'#ffffff'}}>
      <button type="button" className="btn btn-primary btn-sm " 
      name="begin"
      onClick={(e)=>navHeandel(e.target.name)}
      >התחלה</button>
      <button type="button" className="btn btn-primary btn-sm"
      name="forword"
      onClick={(e)=>navHeandel(e.target.name)}
      >50 קדימה</button>
      <button type="button" className="btn btn-primary btn-sm"
      name="back"
      onClick={(e)=>navHeandel(e.target.name)}
      >50 אחורה</button>
      <button type="button" className="btn btn-primary btn-sm" 
      name="end"
      onClick={(e)=>navHeandel(e.target.name)}
      >סוף</button>
</nav>
    </div>
        <div className="container">
        <BestChart
        data1={lastFive}
        />
      </div>

      
      <div className="d-flex justify-content-center ">
       
          <button 
      type="button"
       className="btn btn-success"
       onClick={()=>setShowCart(!showChart)}
       >תצוגת כרטיסיות</button>
      

      </div>
     
    </div>
  )
}
