import './ChartTab.css'
import './MainTab.css'
import { priceData } from './PriceData';
import { useEffect } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import { useRef } from 'react';

//https://rmolinamir.github.io/typescript-cheatsheet/

export const ChartTab = () => {

    const chartContainerRef = useRef();
   
    useEffect(() => {
        
       
        const chartOptions = {
            handleScale: {
                axisPressedMouseMove:true
            },
            layout: {
                backgroundColor: '#253248',
                textColor: 'rgba(255, 255, 255, 0.9)',
            },
            grid: {
                vertLines: {
                    color: '#334158',
                },
                horzLines: {
                    color: '#334158',
                },
            },
            crosshair: {
                mode: CrosshairMode.Normal,
            },
                priceScale: {
                borderColor: '#485c7b',
            },
                timeScale: {
                borderColor: '#485c7b',
            },
            width: 400,
            height: 400
        };
        const chart = createChart(document.getElementById('as'), chartOptions as any);

        
        const candleSeries = chart.addCandlestickSeries();

        candleSeries.setData(
            priceData
        
        )

    })

    const size ={
        height: '450px',
        width: '450px'
    }
 


    return (
         <div className='chartBorder' style={size}>

            <div id='as'>

            </div>
        </div>
    )
}

