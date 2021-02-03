import React,{useEffect,useState,useMemo} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import {fullHeader as col} from './tableHeader'
import {useTable} from 'react-table'
import {stringToFormtMMYYYY as fDate} from '../../redux/globalFunc'
// not in use
export const ShowTheBest = () => {
  const [repoerPeriod , setReportPeriod]=useState()
  const [lastData , setLastData]=useState([])
  const [lastFive , setLastFive]=useState([])

 // const Header = useSelector(state => state.gemel.Header)
 console.log(lastFive)


 const url= "https://data.gov.il/api/3/action/datastore_search?resource_id=a30dcbea-a1d2-482c-ae29-8f781f5025fb&limit=10000"

 // נתוני גמל לשנה לפי איטם אחרון מחלצים את חודש הדיווח
  useEffect(() => {
   axios.get(url).then(res => {
    const date = res.data;
    setReportPeriod(date.result.records[date.result.records.length-1].REPORT_PERIOD)
// סינון רשומות של החודש האחרון
    if(repoerPeriod !=null){
      setLastData(
        date.result.records.filter((rec)=>{ 
        return  rec.REPORT_PERIOD ==repoerPeriod} )
      )
    }   
  })    
  }, [repoerPeriod])

  useEffect(() => {
// כדי למיין מהגדול לקטן יש להחליף סימנים
    function compare( a, b ) {
      if ( a.MONTHLY_YIELD < b.MONTHLY_YIELD ){
        return 1; // מיון בסדר יורד
      }
      if ( a.MONTHLY_YIELD > b.MONTHLY_YIELD ){
        return -1; // למיון בסדר עולה יש להחליף ולרשום שלילי בתנאי הראשון
      }
      return 0;
    }
    // ביצוע מיון ושמירת 10 הראשונים
   const sort = lastData.sort( compare ).slice(0,10);

    console.log(sort)
    setLastFive(sort)
  }, [lastData])

  const columns = useMemo(()=> col,[])
  const data = useMemo(()=> lastFive ,[lastFive])
  
  
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
    data})
  
  return (
    <div>
      {lastFive && lastFive[0] ?(
        <div className="card-panel white lighten-2 text-center" style={{padding:'6px'
        }}>
      <h5 style={{margin:'auto'}}>רשימת 10 קופות הגמל עם התשואה הגבוה לחודש <span>{fDate(lastFive[0].REPORT_PERIOD)}</span></h5>
      </div>
      ):null}
      
      
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
  )
}
