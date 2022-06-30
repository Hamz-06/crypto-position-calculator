import { CalculatorTab } from '../Calc/CalculatorTab.jsx';
import { ChartTab } from '../Calc/ChartTab.jsx';
import React, { useEffect, useState, useMemo } from 'react';
import './HomePage.css';
export function Homepage() {
  const [calcData, getCalcData] = useState([])
  const fetchData = (data) => { //fetch data from calc and pass to chart
    getCalcData(data)  //set data and pass to chart 
  }

  return (
    <>
      <div className="container">
        <React.StrictMode>
          <CalculatorTab onCalculate={fetchData} />
        </React.StrictMode>
        <ChartTab reload={calcData} />
      </div>

    </>
  )

}
