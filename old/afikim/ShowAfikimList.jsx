import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Card} from './Card'
import './grid.css'
import { Search } from './Search'
import {Link} from 'react-router-dom'

export const ShowAfikimList = () => {
  const [valueToSearch, setValueToSearch] =useState()
  const [filter, setFilter] =useState([])
  const [selectAfick , setSelectAfick] = useState([])
  const afikimSort = useSelector(state => state.gemel.short)
  
  useEffect(() => {
    if(valueToSearch!=null){
      setFilter(
        afikimSort.filter((rec)=>{  
        return  `${rec.FUND_ID}  ${rec.FUND_NAME}`.includes(valueToSearch)} )
      )
    }
    if(valueToSearch===""){
      setFilter([])
    }
   
  }, [valueToSearch,afikimSort])
  
 
  return (
    <div className="container">
      <Search
      value={valueToSearch}
      onsetValue={setValueToSearch}
      />
      {selectAfick.map((rec)=>{
        <div className="chip">
      {rec}
    <i className="close material-icons">close</i>
  </div>
      })}
      <div className="chip">
      rec
    <i className="close material-icons">close</i>
  </div>
     
  <Link to={`/showResult/${selectAfick}`}>{selectAfick}</Link>
      
      {filter && filter[0] ?(
         <div className="grid-container">
          { filter.map((rec)=><Card
          key={rec.FUND_ID}
          rec={rec}
          add={setSelectAfick}
          selected={selectAfick}
          />)}
         </div>  
         
      ):null}
    
            
    </div>
  )
}
