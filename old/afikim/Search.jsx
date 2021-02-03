import React from 'react'
import './search.css'

export const Search = ({onsetValue,value}) => {
  return (
    <div className="row search">
        <div className="input-field col s12">
          <input id="search" type="search" className="search"
          placeholder="חפש לפי שם או מספר קופה"
          defaultValue={value}
        onChange={(e)=>onsetValue(e.target.value)}
          />
          
        </div>
      </div>
  )
}


/*
<input 
        className="input-search"
        id="search" type="search"
        placeholder="חפש לפי שם או מספר קופה"
        defaultValue={value}
        onChange={(e)=>onsetValue(e.target.value)}
        />

*/