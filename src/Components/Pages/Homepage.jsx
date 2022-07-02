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

      <div className="homePage_outer">

        <div className="homePage_logo">
          <h1>
            Bitcoin position size calculator
          </h1>
        </div>

        <div className="homePage_row">
          <div className="homePage_cal_tab">
            <React.StrictMode>
              <CalculatorTab onCalculate={fetchData} />
            </React.StrictMode>

          </div>
          <div className="homePage_chart_tab">
         
            <ChartTab reload={calcData} />
          </div>
        </div>
      </div>


    </>
  )

}
