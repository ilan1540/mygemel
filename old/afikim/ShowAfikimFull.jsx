import React from 'react'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {useSelector} from 'react-redux'
import {fullheaderName as columns} from '../localDBfiles/gridColumnHeader'


export const ShowAfikimFull = () => {
  const afikimData = useSelector(state => state.gemel.full)
console.log(afikimData)
  const  style= {
     height: 400,
      width: '100%',
      direction: 'rtl'
    } 

  return (
    <div className="ag-theme-alpine" style={style} >
            <AgGridReact
                rowData={afikimData}
                columnDefs={columns}
                >
                
            </AgGridReact>
        </div>
  )
}
