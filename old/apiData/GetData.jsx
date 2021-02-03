import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { ApiTable } from './ApiTable'

export const GetData = () => {
  const [data,setData]=useState()
  useEffect(() => {
    axios.get(`https://data.gov.il/api/3/action/datastore_search?resource_id=a30dcbea-a1d2-482c-ae29-8f781f5025fb`)
    .then(res => {
      const gemelData = res.data;
      setData(gemelData)
    }) 
  }, [data])

 
  return (
    <div>
      {data && data.result ?(
        <ApiTable 
     calcData={data.result.records}
     links={data.result.links}
     />
      ):null}
     
    </div>
  )
}
