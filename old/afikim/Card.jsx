import React from 'react'

export const Card = ({rec,add,selected}) => {
  return (
    <div className="card">          
           <div className="card-content center-align ">
           <h6>
            {rec.FUND_ID} {rec.FUND_NAME}
            </h6>
               </div>
             <div className="card-action">
             <button className="btn-floating halfway-fab waves-effect waves-light red"
             onClick={()=>add([...selected,rec.FUND_ID])}
             ><i className="material-icons">add</i></button>
             </div>
           </div>
  )
}
