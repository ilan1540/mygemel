import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import {getDataFromApi} from '../redux/actionReducer'
import { AfikimFilter } from '../afikim/AfikimFilter'
import { Search } from '../afikim/Search'
import { AgGrid } from '../agGrid/AgGrid'
import { ShowAfikimFull } from '../afikim/ShowAfikimFull'

export const ApiNext = () => {
  const [valueToSearch, setValueToSearch] =useState()
  const [filter, setFilter] =useState([])
  const dispatch = useDispatch()
  const url = useSelector(state => state.gemel.gemelUrl)
  const afikim = useSelector(state => state.gemel.short)

  /*
  useEffect(() => { 
    url.map(async(url)=>{
    await  axios.get(url.add).then(res => {
      dispatch(getDataFromApi(res.data.result.records))
      }) 
    })
  }, [dispatch,url])
*/
  const data = useSelector(state => state.gemel.apidata)

  
  useEffect(() => {
    if(valueToSearch!=null){
      setFilter(
        data.filter((rec)=>{
        return  rec.FUND_ID.includes(valueToSearch)} )
      )
     // const filter = data.filter((rec)=>rec.//FUND_ID == valueToSearch )
    //  console.log(filter)
    //  setFilter(filter)
    }
   
  }, [valueToSearch])
  
  
 
//console.log(data)
  return (
    <div>
    {data ?(
      <div>
        <h5>מספר רשומות <span>{data.length}</span></h5>
        <Search
         value={valueToSearch}
         onsetValue={setValueToSearch}
         />
       
      <ShowAfikimFull />
      </div>
    ):(
      <div>
      <h5>שגיאה קלט נתונים</h5>
      </div>
    )}
    </div>
  )
}

