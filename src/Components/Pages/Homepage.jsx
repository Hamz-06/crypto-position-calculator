import { CalculatorTab } from '../Calc/CalculatorTab.jsx';
import { ChartTab } from '../chart/ChartTab.jsx';
import React, { } from 'react';
import Navbar from '../Navbar/Navbar'
import { Footer } from '../Footer/Footer.jsx';
import './HomePage.css';
import { useSelector } from 'react-redux'
import { TradeTracker } from '../tradetracker/TradeTrackerPrev.jsx'
import { useSpring, animated } from 'react-spring'
export function Homepage() {
  const chartClicked = useSelector((state) => state.chartClicked.value)


  const props = useSpring({
    
    to: { x: 0 },
    from: { x: -200 },
  })

  return (
    <>
      <Navbar />
      {/* entire screen outer */}
      <animated.div className="homePage_outer">
        {/* home page row splits into two with a aspect ratio of 1 to 2  */}
        <div className="homePage_row">

          <animated.div className="homePage_cal_tab" style={props} >
            <CalculatorTab />
          </animated.div>

          <div className="homePage_second_tab" style={chartClicked ? { display: 'block' } : { display: 'none' }}>
            <div className="homePage_second_tab_chart">
              <ChartTab />
            </div>
            <div className="homePage_second_tab_tracker">
              <TradeTracker />

            </div>

          </div>
        </div>
      </animated.div>
      <Footer />


    </>
  )

}
