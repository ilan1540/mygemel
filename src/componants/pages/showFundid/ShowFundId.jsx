import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import {stringToFormtMMYYYY} from '../../redux/globalFunc'
import { SelectDate } from '../../helper/SelectDate'
//import { PopChart } from './PopChart'
import { Chartjs } from './Chartjs'


export const ShowFundId = () => {
  const [fundId, setfundId] = useState('')
  const [fDate, setFdate] = useState(new Date())
  const [uDate, setUdate] = useState(new Date())
  const [data, setdata] = useState([])
  const [filter, setFilter] =useState([])
  const [aficTesua, setAfickTesua] =useState([])
  const [afickMonth, setAfickMonth] =useState([])

  const url = useSelector(state => state.gemel.gemelUrl)
  const short = useSelector(state => state.gemel.short)

 

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
      //  console.log(afickData)
      }) 
    })
  }, [url,fundId,fDate,uDate])

  const onChangeFilter =(param)=>{
    if(param!=null){
      setFilter(
        short.filter((rec)=>{  
        return  `${rec.FUND_ID}  ${rec.FUND_NAME}`.includes(param)} )
      )
    }
    if(param===""){
      setFilter([])
      setdata([])
    }
  }
  
useEffect(() => {
  const temp=[]
  const month =[]
data &&  data.map((r)=>{
    temp.push((r.tsua*100).toFixed(2))
    month.push(stringToFormtMMYYYY(r.REPORT_PERIOD))
    setAfickTesua(temp)
    setAfickMonth(month)
    return null
  })

}, [data])




  return (
    <div className="">
     <nav className="navbar navbar-expand-lg navbar-dark bg-dark mt-2 border-radius">
     <form className="d-flex">
     <ul className="navbar-nav me-auto mb-2 mb-lg-0"> 
      <li className="form-control">
      <input type="text" className="form-control" 
      value={fundId}
    onChange={(e)=>
      {onChangeFilter(e.target.value)
      setfundId(e.target.value)}}
      onFocus={()=>setfundId('')}
    placeholder=" אפיק"/>
      </li>
      <li className="form-control mx-1">
      <SelectDate
      date={fDate}
      setDate={setFdate}
       className="form-control be-2 "  placeholder="מתאריך"/>
      </li>
    <li className="form-control ">
      <SelectDate
      date={uDate}
      setDate={setUdate}
      className=" me-2"  placeholder="עד תאריך"/>
    </li>
       </ul>
       
       </form>
          
       </nav>
       <div className="row">
         <div className="col-md-2">
         <ul className="list-group">
    {filter && filter.map((rec)=>
     <li key={rec.FUND_ID} className="list-group-item" style={{cursor: 'pointer'}}
     
     onClick={()=>
      {setfundId(rec.FUND_ID)
      setFilter([])}
    }
     >
        {rec.FUND_ID}-{rec.FUND_NAME}</li>)}
        </ul>
        </div>
        
        
        {data.length>0 ? (
 
       <div className="col-md-9 bg-white mt-3">
           <div className="navbar-brand">
          {data && data[0] ?(<h4 style={{color:'black'}}>{ data[0].FUND_ID}-{ data[0].FUND_NAME}</h4>):null}
          </div>
        <Chartjs
        data={aficTesua}
        xlable={afickMonth}
        teor={`תשואה ראלית לקופה ${fundId}`}

        />
       </div>
        ):null}



       </div>
     </div>
  )
}
