import React from 'react'
import  './style.css'
import {Link} from 'react-router-dom'
import { isLogin } from '../redux/actionReducer';
import { useDispatch } from 'react-redux';

export const EnteryBtn = () => {
  const dispatch = useDispatch()
  return (
    <div className="row">
      <div className="col-md-7">
      <div className="row m-2">
        <div className="col-md-2">
        <Link to="/bestformonth" className="circel-btn" >
           <button className="btn circel-btn waves-effect waves-light" type="submit" 
           onClick={()=>dispatch(isLogin())}
           name="action">מצטיינים החודש
           <i className="material-icons left m-2">leaderboard</i>
        </button>
       </Link>
        </div>
        <div className="col-md-4">
        <div className="lbl-msg" >גרף שמציג את הקופות הטובות ביותר בחודש האחרון שפורסם
        </div >
        </div>
      </div>
      <div className="row m-2">
        <div className="col-md-2">
        <Link to="/showfundid" className="circel-btn" >
       <button className="btn circel-btn waves-effect waves-light" type="submit" 
       onClick={()=>dispatch(isLogin())}
       name="action">אפיקים
         <i className="material-icons left m-2">leaderboard</i>
      </button>
       </Link>
        </div>
        <div className="col-md-4">
        <div className="lbl-msg" >גרף שמציג תשואה ראלית מצטברת לקופה לתקופה נבחרת
        </div >
        </div>
      </div>
      <div className="row m-2">
        <div className="col-md-2">
        <Link to="/showforsog" className="circel-btn" >
       <button className="btn circel-btn waves-effect waves-light" type="submit" 
       onClick={()=>dispatch(isLogin())}
       name="action">השוואה לפי סוג קופה
         <i className="material-icons left m-2">leaderboard</i>
      </button>
       </Link>
        </div>
        <div className="col-md-4">
       <div className="lbl-msg" >טבלה המציגה נתונים נבחרים עבור קופות בהתאם לסוג 
        קופה והתמחות קופה מיון בהתאם לתשואה המצטברת לתקופה בסדר יורד
        </div >
       </div>
      </div> 
      </div>
      <div className="col-md-3 about">
        המערכת לבדיקת התשואות בקופות גמל הנתונים נלקחים ממאגר הנתונים הממשלתיים data.gov
        בהתאם לדיווחים של חברות הניהול הנשלחים עד ל20 לחודש העוקב עבור החודש הקודם
        תקופת הדיווח לשנים 2019 עד 2021
        נכתב על ידי אילן בר לב ilanbarlev@gmail.com
      </div>
    </div>
  )
}
