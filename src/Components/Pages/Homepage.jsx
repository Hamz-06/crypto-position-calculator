import { CalculatorTab } from '../Calc/CalculatorTab.jsx';
import { ChartTab } from '../chart/ChartTab.jsx';
import React, { } from 'react';
import Navbar from '../Navbar/Navbar'
import { Footer } from '../Footer/Footer.jsx';
import './HomePage.css';
import { useSelector } from 'react-redux'
import {TradeTracker} from '../tradetracker/TradeTrackerPrev.jsx'
export function Homepage() {
  const chartClicked = useSelector((state) => state.chartClicked.value)




  
  return (
    <>
      <Navbar />
      <div className="homePage_outer">
        <div className="homePage_row">
          <div className="homePage_cal_tab">
            <CalculatorTab />
          </div>
          <div className="homePage_chart_tab" style={chartClicked ? { display: 'block' } : { display: 'none' }}>
            <ChartTab />
            
          </div>
        </div>
      </div>
      <Footer />


    </>
  )

}
