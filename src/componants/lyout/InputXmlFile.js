import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import xmlConvert from 'xml-to-json-promise'




export const InputXmlFile = () => {
  const [fileName, setFileName] = useState();

const onGetXmlFile =(e)=>{
  xmlConvert.xmlFileToJSON(kupot).then(json => {
    console.log(json);
}
  )}

  

  


  return (
    <form className="wrapper"> 
<div>
  <input
   type="file"
    id="file" 
    accept=".xml "
    onChange={onGetXmlFile}
  />
  <label htmlFor="file"className=" btn-block">בחר קובץ XML</label>
  </div>
  
  <Link to="/showFile" className="btn btn-primary  btn-block">Go somewhere</Link>
   </form>
  )
}
