import React from 'react'
// לא בשימוש מיועד להצגת הכרטיסיות
export const Card = ({rec}) => {
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

// לא בשימוש מיועד להצגת הכרטיסיות
/*
 <div className="grid">
      {!showChart && lastFive && lastFive.map((rec)=>
       <Card key={rec.FUND_ID} rec={rec} />)}
      </div>

*/