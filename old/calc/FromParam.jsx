import React,{useState} from 'react'
import {useSelector} from 'react-redux'
import { SelectDate } from '../../helper/SelectDate'
import './style.css';

export const FromParam = ({fundId,fdate,udate,sfdate,sudate}) => {
  const [filter, setFilter] =useState([])
const short = useSelector(state => state.gemel.short)
//console.log(short)

const onChangeFilter =(param)=>{
  if(param!=null){
    setFilter(
      short.filter((rec)=>{  
      return  `${rec.FUND_ID}  ${rec.FUND_NAME}`.includes(param)} )
    )
  }
  if(param===""){
    setFilter([])
  }
}

  return (
    <div>
    <div className="row">
  <div className="col-md-2">
    <input type="text" className="form-control" 
    onChange={(e)=>onChangeFilter(e.target.value)}
    placeholder="אפיק השקעה" aria-label="First name"/>
    <ul className="list-group">
    {filter && filter.map((rec)=>
     <li key={rec.FUND_ID} className="list-group-item"
     onClick={()=>fundId(rec.FUND_ID)}
     >
       <i className="far fa-check-circle"></i>
        {rec.FUND_ID}-{rec.FUND_NAME}</li>)}
    </ul>
    
  </div>
  <div className="col-md-2 mr-3">
    <SelectDate
    date={fdate}
    setDate={sfdate}
    />
  </div>
  <div className="col-md-2">
  <SelectDate 
  date={udate}
  setDate={sudate}
  />
  </div>
</div>
      
    </div>
  )
}
