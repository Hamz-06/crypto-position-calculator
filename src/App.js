
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import React, { useEffect, useState, useMemo } from 'react';
import './Components/Calc/MainTab.css';

import { CalculatorTab } from './Components/Calc/CalculatorTab';
import { ChartTab } from './Components/Calc/ChartTab.tsx';
import {Footer} from './Components/Footer/Footer.tsx'

function App() {

  // var num =1.21;
  // num = num.toFixed(3);
  // console.log(num); 

  const [calcData, getCalcData] = useState([])
  const [toggle, getToggle] = useState()



  const fetchData = (data) => { //fetch data from calc and pass to chart
    getCalcData(data)  //set data and pass to chart 
  }


  //get toggle information, returns true or false (display chart)
  const FetchChartToggle = (rettog) => {

    getToggle(rettog)
  }


  //display chart using the toggle, also passes information from calculator
  const ShowChart = () => {

    return (

      <div className="outerBox" style={toggle ? { display: 'none' } : { display: '' }}>
        <ChartTab reload={calcData} />
      </div>
    )

  }



  return (
    <div className="App">


      <Navbar onc={FetchChartToggle} />


      <div className="container">

        <div className="outerBox">
          <React.StrictMode>
            <CalculatorTab onCalculate={fetchData} />
          </React.StrictMode>

        </div>

        {

          ShowChart()

        }

      </div>

      <Footer />



    </div>
  );
}

export default App;
