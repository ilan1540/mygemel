import React,{useMemo} from 'react'
import {useTable ,useGlobalFilter} from 'react-table'
import {useSelector} from 'react-redux'
import axios from 'axios'
export const ApiTable = ({calcData,links}) => {
  const header = useSelector(state => state.gemel.Header)


  const columns = useMemo(()=> header,[header])
  const data = useMemo(()=> calcData ,[calcData])


  
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    preGlobalFilteredRows,
  } = useTable({
    columns,
    data},useGlobalFilter)
  const onNext= ()=>{
    axios.get(`https://data.gov.il/api/3/action/datastore_search?offset=200&resource_id=a30dcbea-a1d2-482c-ae29-8f781f5025fb`)
    .then(res => {
      console.log(res.data)
      const gemelData = res.data;
    //  setData(gemelData)
    }) 
  }

  return (
    <>
   
    {data ?(
      <table className="table" {...getTableProps()} >
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
               >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}  
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>
      ):null}
    </>
  )
}
