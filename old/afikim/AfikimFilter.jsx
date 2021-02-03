import React from 'react'
import {useSelector} from 'react-redux'
import './grid.css'
export const AfikimFilter = ({afikim}) => {
 // const afikim = useSelector(state => state.gemel.short)

  return (
    <div>
   <div className="grid-container">
     {afikim ?(
       afikim.map((rec)=>
       <ul key={rec.FUND_ID}>
       <span><li>{rec.FUND_ID}</li></span>
       <span><li>{rec.FUND_NAME}</li></span>
       </ul>
       
       
         )
     ):null}
  
</div>
    </div>
  )
}
