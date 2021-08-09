import React from 'react'
import axios from 'axios';
//import yahooStockPrices from 'yahoo-stock-prices'

export const ShowFromYahoo = () => {

// mot work
  const onClickBtn = async () => {
    var options = {
      method: 'GET',
      url: 'https://community-open-weather-map.p.rapidapi.com/find',
      params: {
        q: 'london',
        cnt: '0',
        mode: 'null',
        lon: '0',
        type: 'link, accurate',
        lat: '0',
        units: 'imperial, metric'
      },
      headers: {
        'x-rapidapi-key': 'c7d2a3e6ccmshf3fa36280508ab2p1f01bfjsn9108b3b874dd',
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });

    /*
    const data = await yahooStockPrices.getCurrentData('AAPL');
    console.log(data); // { currency: 'USD', price: 132.05 }

    */


  }




  return (
    <div>
      <button type="button" className="btn btn-primary"
        onClick={onClickBtn}
      >get stock</button>
    </div>
  )
}
