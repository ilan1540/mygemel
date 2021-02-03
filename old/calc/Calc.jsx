import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import {stringToFormtMMYYYY,numberWithCommas} from '../../redux/globalFunc'
import { FromParam } from './FromParam'
//import './style.css'

export const Calc = () => {
  const [fundId, setfundId] = useState('')
  const [fDate, setFdate] = useState(new Date())
  const [uDate, setUdate] = useState(new Date())
  const [data, setdata] = useState([])

 
  const url = useSelector(state => state.gemel.gemelUrl)

  useEffect(() => {
    var date = new Date(); 
    date.setDate(date.getDate() -365);
    
    return setFdate(date);    
  }, [])

  const formtDate =(date)=>{
    const year= date.getFullYear()
    let month = date.getMonth()+1
    if(month<10){
      month=`${0}${month}`
    }
    return `${year}${month}`
  }
  

  useEffect(() => { 
    let result = []
    url.map(async(url)=>{
    await  axios.get(url.add).then(res => {
      const afickData = res.data.result.records.filter((rec)=>{ 
        return  rec.FUND_ID ===fundId && rec.REPORT_PERIOD >= formtDate(fDate) && rec.REPORT_PERIOD <= formtDate(uDate) } )
     result= [...result,...afickData]

     // כדי למיין מהגדול לקטן יש להחליף סימנים
    function compare( a, b ) {
      if ( a.REPORT_PERIOD < b.REPORT_PERIOD ){
        return -1; // מיון בסדר עולה
      }
      if ( a.REPORT_PERIOD > b.REPORT_PERIOD ){
        return 1; // למיון בסדר עולה יש להחליף ולרשום שלילי בתנאי הראשון
      }
      return 0;
    }
        result = result.sort(compare)
        let tsua = 0
        let newData = []
      result.map((rec,i)=>{
        if(i===0){
          tsua=parseFloat(rec.MONTHLY_YIELD/100)
         // const xxx ={...result[i],tsua}
          newData.push({...result[i],tsua})
        }else{
         tsua=parseFloat((tsua+1)*(rec.MONTHLY_YIELD/100+1)-1)
       //  const xxx ={...result[i],tsua}
         newData.push({...result[i],tsua})
      }
      return null
      })  
        setdata(newData)
      //  setRes(result)
      }) 
    })
  }, [url,fundId,fDate,uDate])


  return (
    <div className="row" >
    
      <FromParam 
      fundId={setfundId} 
      sfdate={setFdate}
      sudate={setUdate}
      fdate={fDate}
      udate={uDate}

      />
     
     
      {data ?(
    <div className="container">
      {data && data[0] ?(<h2>{ data[0].FUND_NAME}</h2>):null}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">חודש</th>
            <th scope="col">תשואה חודשית</th>
            <th scope="col">תשואה ראלית מצטברת</th> 
            <th scope="col">יתרת נכסים לסוף חודש</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((r,i)=>
          <tr key={r.REPORT_PERIOD}>
          <td>{stringToFormtMMYYYY(r.REPORT_PERIOD)}</td>
          <td>{r.MONTHLY_YIELD}</td>
          <td>{(r.tsua*100).toFixed(2)}%</td>
          <td>{numberWithCommas(r.TOTAL_ASSETS)}</td>
          </tr>
          )}           
        </tbody>
        </table>
        </div>
      ):null}
     

      
      
    </div>
  )
}
