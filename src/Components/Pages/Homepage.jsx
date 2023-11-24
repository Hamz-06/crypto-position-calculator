import { CalculatorTab } from '../Calc/CalculatorTab.jsx';
import { ChartTab } from '../chart/ChartTab.js';
import React, { memo, useCallback, useMemo } from 'react';
import Navbar from '../Navbar/Navbar'
import { Footer } from '../Footer/Footer.jsx';
import './HomePage.css';
import { useSelector } from 'react-redux'
import { TradeTracker } from '../tradetracker/TradeTrackerPrev.jsx'
import { useSpring, animated, useTransition } from 'react-spring'
export function Homepage() {

  const isChart = useSelector((state) => state.chartClicked.value)


  // const chartRemoveAnim = useTransition(chartClicked, {

  //   from: {
  //     x: 0, y: -300, opacity: 0,
  //   },
  //   enter: {
  //     x: 0, y: 0, opacity: 1,
  //   },

  // })
  // const chartRemoveDefaultAnim = (x) => {
  //   return (x) ? { display: 'block' } : { display: 'none' }
  // }

  const calculatorAnim = useSpring({ to: { opacity: 1, y: 0 }, from: { opacity: 0, y: 300 } })
  const Chart = useCallback(() => <ChartTab />, [/* dependencies */]);
  const Tracker = useCallback(() => <TradeTracker />, [/* dependencies */]);

  return (
    <>
      <Navbar />
      {/* entire screen outer */}
      <div className="homePage_outer">
        {/* home page row splits into two with a aspect ratio of 1 to 2  */}
        <div className="homePage_row">

          <animated.div className="homePage_cal_tab" style={calculatorAnim}>
            <CalculatorTab />
          </animated.div>


          {/* {chartRemoveAnim((style, item) => */}
            <div className="homePage_second_tab" 
            style={{
              display: (isChart) ? 'block' : 'none',
              
            }}
            >
              <div className="homePage_second_tab_chart">
                <Chart />
              </div>
              <div className="homePage_second_tab_tracker">
                <Tracker />
              </div>
            </div>
          

        </div>

      </div>
      <Footer />


    </>
  )

}
