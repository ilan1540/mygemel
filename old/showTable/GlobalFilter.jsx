import React from 'react'
//import styled from 'styled-components'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'


// Define a default UI for filtering
export function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <nav className="green col s3 ">
    <div className="nav-wrapper ">
      <form >
        <div className="input-field">
          <input  
          type="search"
          id="search"
           value={value || ""}
           onChange={e => {
             setValue(e.target.value);
             onChange(e.target.value);
           }}
           placeholder={`${count} records...`} 
          required/>
          <label htmlFor="search" className="label-icon">
            <i className="material-icons">search</i>
          </label>
          <i className="material-icons">close</i>
        </div>
      </form>
    </div>
  </nav>
   
  )
}


/*
<input
      type="search"
       id="search"
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`} 
      />
*/