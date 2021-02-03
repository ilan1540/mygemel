import React,{useEffect,useState} from 'react'
import axios from 'axios'
//import {useSelector} from 'react-redux'

import {stringToFormtMMYYYY as fDate} from '../../redux/globalFunc'
import './style.css'

export const BestForMonth = () => {
  const [repoerPeriod , setReportPeriod]=useState()
  const [lastData , setLastData]=useState([])
  const [lastFive , setLastFive]=useState([])


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
   const sort = lastData.sort( compare ).slice(0,10);

  //  console.log(sort)
    setLastFive(sort)
  }, [lastData])


  const Card = ({rec}) => {
    const {FUND_ID,FUND_NAME,MONTHLY_YIELD,FUND_CLASSIFICATION} = rec
   // console.log(rec)
  return(
  <div className="card" >
    <div className="card-body">
    <h5 className="card-title">{FUND_NAME}</h5>
    <h6 className="card-subtitle mb-2 text-muted">  תשואה חודשית  {MONTHLY_YIELD}%</h6>
    <p className="card-text">מספר קופה {FUND_ID} {FUND_CLASSIFICATION}</p>
    </div>
  </div>
    )
  }

  return (
    <div>
      {lastFive && lastFive[0] ?(
        <div className="bg-secondary text-white text-center" style={{padding:'6px'
        }}>
      <h1 style={{margin:'auto'}}> המובילות לחודש <span>{fDate(lastFive[0].REPORT_PERIOD)}</span></h1>
      </div>
      ):null}
      <div className="grid">
      {lastFive && lastFive.map((rec)=>
       <Card key={rec.FUND_ID} rec={rec} />)}
      </div>
    </div>
  )
}
