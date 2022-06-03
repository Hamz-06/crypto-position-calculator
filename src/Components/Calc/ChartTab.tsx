import './ChartTab.css'
import './MainTab.css'
import { priceData } from './PriceData';
import { useEffect } from 'react';
import { createChart, CrosshairMode, ColorType } from 'lightweight-charts';
import { useRef } from 'react';

//https://rmolinamir.github.io/typescript-cheatsheet/

export const ChartTab = () => {

    const chartContainerRef = useRef();
   
    useEffect(() => {
        
        const handleResize =()=>{
            chart.applyOptions({width: chartContainerRef.current.clientwidth});
        }

        const chart = createChart(chartContainerRef.current, {
        
            width: chartContainerRef.current.clientWidth,
            height: 300,
        });

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
            width: 550,
            height: 400
        };
        

        
        const candleSeries = chart.addCandlestickSeries();

        candleSeries.setData(
            priceData
        
        )

    })

    const size ={
        height: '450px',
        width: '600px'
    }
 


    return (
        <>

            <div ref={chartContainerRef}>

                
            </div>
        
        </>
    )
}

