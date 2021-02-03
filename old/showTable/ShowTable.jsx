import React,{useMemo,useEffect} from 'react'
import {useTable ,useGlobalFilter} from 'react-table'
import {useSelector,useDispatch} from 'react-redux'
import {setCalcData} from '../redux/actionReducer'
import { GlobalFilter } from './GlobalFilter'
import {groupJsonData} from '../redux/globalFunc'

import  './table.css'

export const ShowTable = () => {
 // const [newData, setNewData]=useState([])
  const dispatch = useDispatch()
  const myData = useSelector(state => state.gemel.data[0].sheetData)
  const header = useSelector(state => state.gemel.shortHeader)
  const short = useSelector(state => state.gemel.short)
  const calcData = useSelector(state => state.gemel.calcData)


 
 useEffect(() => {
   const temp= []
  short.map((key)=>{
  const filter = myData.filter((rec)=>parseInt(rec.ID_KUPA) === parseInt(key.FUND_ID))
  if(filter.length > 0){
    const afickName= key.FUND_NAME
    groupJsonData(filter,afickName,(err,resp)=>{
      if(err){
       console.log(err);            
      }
      else{
        temp.push(resp)
        dispatch(setCalcData(temp))
     // setNewData(temp) 
      } 
     }
     )
  }
  return null
  }) 
 }, [myData,short,dispatch])

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

  
  return (
    <>
    <GlobalFilter
     preGlobalFilteredRows={preGlobalFilteredRows}
     globalFilter={state.globalFilter}
     setGlobalFilter={setGlobalFilter}
     />
    <div className="container mt-5">
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
    </div>
    </>
  )
}

