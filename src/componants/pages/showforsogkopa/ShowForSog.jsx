import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
//import {stringToFormtMMYYYY,numberWithCommas} from '../../redux/globalFunc'
import { SelectDate } from '../../helper/SelectDate'
import {subClassList} from './subList'
//import { ShowTable } from './ShowTable'

export const ShowForSog = () => {
//  const [fundId, setfundId] = useState([])
  const [fDate, setFdate] = useState(new Date())
  const [uDate, setUdate] = useState(new Date())
  const [data, setdata] = useState([])
  const [group, setgroup] = useState([])
  const [dataWithTsua, setDataWithTsua] = useState([])
  const [dataForLastMonth,setDataForLastMonth]=useState([])
  const [classSification, setClssSification] = useState('')
  const [subClassSification, setSubClssSification] = useState('')
//  const [filter, setFilter] =useState([])
  const url = useSelector(state => state.gemel.gemelUrl)
//  const short = useSelector(state => state.gemel.short)

 const sifictionList =[
  'תגמולים ואישית לפיצויים',
  'מרכזית לפיצויים',
 'קרנות השתלמות',
  'מטרה אחרת',
  'קופת גמל להשקעה',
  'קופת גמל להשקעה - חסכון לילד'
 ]


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

  //read data from api data gov-------------------------------
  useEffect(() => { 
    let result = []
    url.map(async(url)=>{
    await  axios.get(url.add).then(res => {
      const afickData = res.data.result.records.filter((rec)=>{ 
        return   rec.REPORT_PERIOD >= formtDate(fDate) && rec.REPORT_PERIOD <= formtDate(uDate) } )
     result= [...result,...afickData]
     setdata(result) 
      }) 
    })
  }, [url,fDate,uDate])
//-------------------------------------------------------------
// group data per koupaId
useEffect(() => {
  // let group by fund_id
let group = data.reduce((r, a) => {
//console.log("a", a);
// console.log('r', r);
 r[a.FUND_ID] = [...r[a.FUND_ID] || [], a];
 return r;
}, {});
setgroup(group);  
}, [data])
  
//-------group data per afick and cala tshua ----------------

useEffect(() => {
  let newData = []
  let tsua = 0
  for (let [key, value] of Object.entries(group)) {
 //   console.log(value)
    value.map((rec,i)=>{
      if(i===0){
        tsua=parseFloat(rec.MONTHLY_YIELD/100)
        newData.push({...rec,tsua})
      }else{
       tsua=parseFloat((tsua+1)*(rec.MONTHLY_YIELD/100+1)-1)
       newData.push({...rec,tsua})
    }
    return key
    })
   setDataWithTsua(newData)
  }
}, [group])
//let temp = []
//let res=[]
useEffect(() => {
  let res=[]
  function compare( a, b ) {
    if ( a.tsua < b.tsua ){
      return 1; // מיון בסדר יורד
    }
    if ( a.tsua > b.tsua ){
      return -1; // למיון בסדר עולה יש להחליף ולרשום שלילי בתנאי הראשון
    }
    return 0;
  }

 const classS = classSification
   const subClass = subClassSification
   if(classS !=='' && subClass!== ''){
     const xxx = dataWithTsua.filter((rec)=>{
       return rec.REPORT_PERIOD===formtDate(uDate) && rec.FUND_CLASSIFICATION===classS && rec.SUB_SPECIALIZATION === subClass
     })
   // console.log(xxx)
    res = xxx.sort(compare)
   // setDataForLastMonth(xxx)
   

   }
   setDataForLastMonth(res)

   }, [classSification,subClassSification,dataWithTsua,uDate])


   
  return (
    <div className="">
     <nav className="navbar navbar-expand-lg navbar-dark bg-dark mt-2 border-radius">
     <form className="d-flex">
      
      <div className="navbar-brand">
      <SelectDate 
      date={fDate}
      setDate={setFdate}
       className="form-select form-select-sm"  be-2  type="search" placeholder="מתאריך"/>
      </div>
    <div className="navbar-brand">
      <SelectDate
      date={uDate}
      setDate={setUdate}
      className="select-css me-2" type="search" placeholder="עד תאריך"/>
    </div>
       
       <div className="navbar-brand">
       <select className="select-css" 
       onChange={(e)=>setClssSification(e.target.value)}
       >  
      <option>סוג קופה</option>
      {sifictionList.map((list)=><option key={list} value={list} >{list}</option>)}
      </select>
      </div>
      <div className="navbar-brand">
       <select className="select-css" 
       onChange={(e)=>setSubClssSification(e.target.value)}
       >  
      <option>התמחות...</option>
      {subClassList.map((list)=><option key={list} value={list} >{list}</option>)}
      </select>
      </div>
       </form>
          
       </nav>
       <div className="container mt-3">
        {data.length>0 ? (
          <div className="col-md-12">
        <table className="table table-striped table-dark">
         <thead >
           <tr>
             <th scope="col">מספר אפיק</th>
             <th scope="col">שם אפיק</th> 
             <th scope="col">סך נכסים</th>
             <th scope="col">תשואה מצטברת</th>
           </tr>
         </thead>
         <tbody>
           {dataForLastMonth && dataForLastMonth.map((r,i)=>
           <tr key={r._id}>
           <td>{r.FUND_ID}</td>
           <td>{r.FUND_NAME}</td>
           <td>{r.TOTAL_ASSETS}</td>
           <td>{(r.tsua*100).toFixed(2)}%</td>

           
          
           </tr>
           )}           
         </tbody>
         </table>
       </div>
        ):null}
       </div>
     </div>
  )
}
