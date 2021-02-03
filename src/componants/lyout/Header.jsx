import React from 'react'
import {useSelector  } from 'react-redux';
//import {Link} from 'react-router-dom'
//import './style.css'
export const Header = () => {
const isLogin = useSelector(state => state.gemel.isLogin)

const fromYear = useSelector(state =>state.gemel.gemelUrl[0]&& state.gemel.gemelUrl[0].year)
const untilYear = useSelector(state =>state.gemel.gemelUrl[0]&& state.gemel.gemelUrl[state.gemel.gemelUrl.length-1].year)



  return (
<div className="sticky-top">
<nav className="navbar  header">
  <div className="container-fluid">
    <a href="/" className="navbar-brand"
    >מערכת תיחקור קופות גמל</a>
    {isLogin ?(<p className="navbar-brand">לשנים {fromYear}-{untilYear}</p>):null}
  </div>
</nav>
</div>
  )
}
