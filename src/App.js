import React,{useEffect} from 'react'
//import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
//import store from './componants/redux/store'
import {Header} from './componants/lyout/Header'
import Routes from './componants/routes/Routes';
import {useDispatch} from 'react-redux'
//import {afikimFull} from './componants/localDBfiles/afikimFull'
import {afikimShort} from './componants/localDBfiles/afikimShort'
import {fullHeader} from './componants/localDBfiles/headerColumn'
import {shortHeader} from './componants/localDBfiles/shortHeader'
import {gemelUrl} from './componants/localDBfiles/gemlUrl'


import {getAfikimFull,getAfikimShort,getFullHeader,getShortHeader,getGemelUrl} from './componants/redux/actionReducer'
import './App.css'

 
function App() {
	const dispatch= useDispatch()

	useEffect(() => {
	dispatch(getAfikimShort(afikimShort))
//dispatch(getAfikimFull(afikimFull))
	dispatch(getFullHeader(fullHeader));
	dispatch(getShortHeader(shortHeader))
	dispatch(getGemelUrl(gemelUrl))
	}, [dispatch])
	
	return (
<div>
	<BrowserRouter>
	<Header />
	<Routes />	
	</BrowserRouter>		
</div>					
	)
}

export default App
