import { CalculatorTab } from '../Calc/CalculatorTab.jsx';
import { ChartTab } from '../chart/ChartTab.jsx';
import React, { } from 'react';
import Navbar from '../Navbar/Navbar'
import { Footer } from '../Footer/Footer.jsx';
import './HomePage.css';
import { useSelector } from 'react-redux'
import { TradeTracker } from '../tradetracker/TradeTrackerPrev.jsx'
export function Homepage() {
  const chartClicked = useSelector((state) => state.chartClicked.value)





  return (
    <>
      <Navbar />
      {/* entire screen outer */}
      <div className="homePage_outer">
        {/* home page row splits into two with a aspect ratio of 1 to 2  */}
        <div className="homePage_row">

          <div className="homePage_cal_tab">
            <CalculatorTab />
          </div>
          <div className="homePage_second_tab" style={chartClicked ? { display: 'block' } : { display: 'none' }}>
            <div className="homePage_second_tab_chart">
              <ChartTab />
            </div>
            <div className="homePage_second_tab_tracker">
              <TradeTracker />

            </div>

          </div>
        </div>
      </div>
      <Footer />


    </>
  )

}
