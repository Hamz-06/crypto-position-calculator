import React, { useEffect, useRef, useState } from 'react';
import './MainTab.css';
import {CalculatorTab} from './CalculatorTab';
import {ChartTab} from './ChartTab.tsx';



function MainTab(){
    
    
    
    const [data, getData]= useState([])
    
    const fetchData=(data)=>{ 
        getData(data)

    }


    return (
       
        <div className="container">
             
            <div className="outerBox">
            <React.StrictMode> 
                <CalculatorTab onCalculate={fetchData}/>
            </React.StrictMode> 
                
            </div>

            <div className="outerBox">
                         
                <ChartTab reload = {data}/>

            
            </div> 
        </div>
       


    );
}
export default MainTab;