import React from 'react';
import './MainTab.css'
import {CalculatorTab} from './CalculatorTab'
import {ChartTab} from './ChartTab.tsx'

function MainTab(){


    return (
       
      
        <div className="container">
             
            <div className="outerBox">
            <React.StrictMode>
                <CalculatorTab />
            </React.StrictMode>
                
            </div>

            <div className="outerBox">
               
                <ChartTab />
            

            </div> 
        </div>
       


    );
}
export default MainTab;