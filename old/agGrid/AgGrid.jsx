import React, { useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


export const AgGrid = ({data}) => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const [rowData, setRowData] = useState([
        {make: "Toyota", model: "Celica", price: 35000},
        {make: "Ford", model: "Mondeo", price: 32000},
        {make: "Porsche", model: "Boxter", price: 72000}
    ]);

    const columns = [
      {
      headerName:"afik No",
      field:'FUND_ID',
      sortable:true
    },
    {
      headerName:"afik name",
      field:'FUND_NAME',
      sortable:true
    },
  ]

    return (
        <div className="ag-theme-alpine" style={ { height: 400, width: 600 } }>
            <AgGridReact
                rowData={data}
                columnDefs={columns}
                >
                
            </AgGridReact>
        </div>
    );
};
