import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { Table } from '../showTable/Table'

export const ShowTheBest = () => {
  const [repoerPeriod , setReportPeriod]=useState()
  const [lastData , setLastData]=useState([])
  const [lastFive , setLastFive]=useState([])

  const Header = useSelector(state => state.gemel.Header)


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
        return  rec.REPORT_PERIOD ==repoerPeriod} )
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
    // ביצוע מיון ושמירת 5 הראשונים
   const sort = lastData.sort( compare ).slice(0,5);

    console.log(sort)
    setLastFive(sort)
  }, [lastData])


  const formatRowData =[
    {
      col1: 'תשואה בשנה אחרונה',
      col2: 'rec.YEAR_TO_DATE_YIELD',
    },
    {
      col1: 'יתרת נכסים',
      col2: 'rec.TOTAL_ASSETS',
    },
  ]



  const Card = ({rec}) => {
    return (
      <div className="card small">
       <div className="card-content">
       <span className="card-title">{rec.FUND_ID}-{rec.FUND_NAME} </span>
       <h5>תשואה החודש <span>{rec.MONTHLY_YIELD}%</span></h5>
       <table>
       <tbody>
         <tr>
           <td>יתרת נכסים</td>
           <td>{rec.TOTAL_ASSETS}</td>
         </tr>
         <tr>
           <td>דמי ניהול שנתיים ממוצעים</td>
           <td>{rec.AVG_ANNUAL_MANAGEMENT_FEE}</td>
         </tr>
         <tr>
           <td>דמי הפקדה ממוצעים</td>
           <td>{rec.AVG_DEPOSIT_FEE}</td>
         </tr>
         <tr>
           <td>תשואה בשנה אחרונה</td>
           <td>{rec.YEAR_TO_DATE_YIELD}</td>
         </tr>
         <tr>
           <td>תשואה בשלוש שנים</td>
           <td>{rec.YIELD_TRAILING_3_YRS}</td>
         </tr>
         <tr>
           <td>אחוז נכסים נזילים</td>
           <td>{rec.AVG_ANNUAL_MANAGEMENT_FEE}</td>
         </tr>
         <tr>
           <td>דמי ניהול שנתיים ממוצעים</td>
           <td>{rec.LIQUID_ASSETS_PERCENT}%</td>
         </tr>

       </tbody>
       </table>
       
      
      <p>${rec.FUND_NAME}</p>
      <ul>
        <li> <strong>תשואה החודש</strong></li>
        <li>{rec.YEAR_TO_DATE_YIELD} <strong>מתחילת השנה</strong></li>
        <li>{rec.YIELD_TRAILING_3_YRS} <strong>שלוש שנים</strong></li>
      </ul>
       </div>
       <Table rec={rec} col={Header} />
      </div>
    )
  }

  
  

  return (
    <div>
      {lastFive && lastFive.map((rec)=>
      <Card key={rec.FUND_ID} rec={rec} />
      )}
     
    </div>
  )
}
