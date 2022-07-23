import { CalculatorTab } from '../Calc/CalculatorTab.jsx';
import { ChartTab } from '../chart/ChartTab.jsx';
import React, { } from 'react';
import Navbar from '../Navbar/Navbar'
import { Footer } from '../Footer/Footer.jsx';
import './HomePage.css';
import { useSelector } from 'react-redux'
import { TradeTracker } from '../tradetracker/TradeTrackerPrev.jsx'
import { useSpring, animated, useTransition } from 'react-spring'
import { display, style } from '@mui/system';
export function Homepage() {

  const chartClicked = useSelector((state) => state.chartClicked.value)


  const chartRemoveAnim = useTransition(chartClicked, {

    from: {
      x: 0, y: -300, opacity: 0,
    },
    enter: {
      x: 0, y: 0, opacity: 1,
    },

  })
  const chartRemoveDefaultAnim = (x) => {
    return (x) ? { display: 'block' } : { display: 'none' }
  }

  const calculatorAnim = useSpring({ to: { opacity: 1, y: 0 }, from: { opacity: 0, y: 300 } })
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


          {chartRemoveAnim((style, item) =>
            <animated.div className="homePage_second_tab" style={{
              ...style,
              ...chartRemoveDefaultAnim(item)
            }}>
              <div className="homePage_second_tab_chart">
                <ChartTab />
              </div>
              <div className="homePage_second_tab_tracker">
                <TradeTracker />
              </div>
            </animated.div>
          )}

        </div>

      </div>
      <Footer />


    </>
  )

}
