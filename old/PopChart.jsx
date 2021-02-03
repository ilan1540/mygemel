import Chart from 'react-apexcharts'

export const PopChart = ({data,xaxis}) => {
   
  const options ={
    chart: {
      background: "#f4f4f4",
      foreColor: "#333"
    },
    xaxis: {
      categories: [...xaxis] 
    },
    plotOptions: {
      bar: {
        horizontal: false
      },
      fill: {
        colors: ["#F44336"]
      },
      dataLabels: {
        enabled: false
      },
      
      title: {
        display:true,
        text: "Largest US Cities By Population",
        margin:20,
        offsetY:20,
        style:{
          fontSize: '25px'
        }
        
        }
    },
   
  }
  
  const series=[{
    name: 'תשואה מצטברת ב%  ',
    data:[...data] 
  }]



  return (
    <div>
      {options ?(
        <Chart
        options={options}
        series={series}
        type="line"
        width="800"
        height="450" />
      ):null}
       
    </div>
  )
}


//export default PopChart

/*
//[
        "01-2020",
 "02-2020",
 "03-2020",
 "04-2020",
 "05-2020",
 "06-2020",
 "07-2020",
 "08-2020",
 "09-2020",
 "10-2020",
 "11-2020",
 "12-2020",
      ]

*/