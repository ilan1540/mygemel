import React from 'react'
import {Line} from 'react-chartjs-2'

export const Chartjs = ({data,xlable,teor}) => {

  const data1 ={
    labels: [...xlable],
    datasets: [{
      label: 'תשואה',
          data: [...data],
          backgroundColor : 'rgba(161,104,115,0.8)',
          borderColor: '#39bb44',
          borderWidth:7
    }],
   } 
   
   const options = {
    maintainAspectRatio: false,
    title:{
      display: true,
      text: teor,
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
    <div>
     <Line
     data={data1}
     options={options}
     width={800}
    height={390}
     />
    </div>
  )
}
