
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import React, { useEffect, useState, useMemo } from 'react';
import './Components/Calc/MainTab.css';

import { CalculatorTab } from './Components/Calc/CalculatorTab';
import { ChartTab } from './Components/Calc/ChartTab.jsx';
import {Footer} from './Components/Footer/Footer.jsx'


function App() {

  // var num =1.21;
  // num = num.toFixed(3);
  // console.log(num); 

  const [calcData, getCalcData] = useState([])
  


  const fetchData = (data) => { //fetch data from calc and pass to chart
    getCalcData(data)  //set data and pass to chart 
  }


  


  return (
    <>

      <Navbar/>
      
      <div className="container">
            
        <React.StrictMode>
          <CalculatorTab onCalculate={fetchData} />
        </React.StrictMode>
          <ChartTab reload={calcData} />

      </div>

      <Footer />



    </>
  );
}

export default App;
