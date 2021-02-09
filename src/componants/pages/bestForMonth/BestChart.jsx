import React,{useEffect,useState} from 'react'
import {Bar} from 'react-chartjs-2'

export const BestChart = ({data1}) => {
  const [xlable,setXlable] = useState()
  const [tsua,setTsua] = useState()
  const [name,setName] = useState()

useEffect(() => {
  const id = []
  const tsua =[]
  const name=[]
  data1.map((r)=>{
  id.push(r.FUND_NAME)
  tsua.push(r.MONTHLY_YIELD)
  name.push(r.FUND_NAME)
  return null 
  })
  setXlable(id)
  setTsua(tsua)
  setName(name)
}, [data1])




  const data ={
    labels: xlable,
    datasets: [{
      barPercentage: 0.7,
      barThickness: 10,
      label: 'תשואה%',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: tsua
    }],
   } 
   
   const options = {
    maintainAspectRatio: false,
    title:{
      display: true,
      text: 'הקופות המובילות החודש',
      fontSize:20,
      position:'top'
      
    },
    scales:{
      yAxes:[{
        ticks: {
          beginAtZero: true,
            // Include a % sign in the ticks
            callback: function(value, index, values) {
                return   value +'%' ;
            }
        },
        legend:{
          display:true
        }
    }]
    }
   }


  return (
    <div className="p-2 bg-white">
    <Bar 
     data={data}
     options={options}
     width={800}
    height={400}
     />
    </div>
  )
}
