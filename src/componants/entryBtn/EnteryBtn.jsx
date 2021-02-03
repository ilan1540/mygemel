import React from 'react'
import  './style.css'
import {Link} from 'react-router-dom'
import { isLogin } from '../redux/actionReducer';
import { useDispatch } from 'react-redux';

export const EnteryBtn = () => {
  const dispatch = useDispatch()
  return (
    <div>
      <div className="entry">
       <Link to="/bestformonth" className="circel-btn" >
       <button className="btn circel-btn waves-effect waves-light" type="submit" 
       onClick={()=>dispatch(isLogin())}
       name="action">עשרת הגדולים
         <i className="material-icons left m-2">leaderboard</i>
      </button>
       </Link>
       <Link to="/showfundid" className="circel-btn" >
       <button className="btn circel-btn waves-effect waves-light" type="submit" 
       onClick={()=>dispatch(isLogin())}
       name="action">אפיקים
         <i className="material-icons left m-2">leaderboard</i>
      </button>
       </Link>
       <Link to="/showforsog" className="circel-btn" >
       <button className="btn circel-btn waves-effect waves-light" type="submit" 
       onClick={()=>dispatch(isLogin())}
       name="action">השוואה לפי סוג קופה
         <i className="material-icons left m-2">leaderboard</i>
      </button>
       </Link>
      </div>
    </div>
  )
}
