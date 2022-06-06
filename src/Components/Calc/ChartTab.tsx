import './ChartTab.css'
import './MainTab.css'
import { GetCandles } from './PriceData';
import { useEffect, useState } from 'react';
import { createChart, CrosshairMode, LineStyle } from 'lightweight-charts';
import { useRef } from 'react';
import date from 'date-and-time';

//https://rmolinamir.github.io/typescript-cheatsheet/

export const ChartTab = props => {

    
    // console.log(props.reload)

   
    const chartContainerRef = useRef();



    useEffect(
        () => {
            const handleResize = () => {
                chart.applyOptions(
                    {
                    width: (chartContainerRef as any).current.clientWidth,
                    height: (chartContainerRef.current as any).clientHeight,
                });
        
            };
            const chartOptions = {
                handleScale: {
                    axisPressedMouseMove: true
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
                width: (chartContainerRef as any).current.clientWidth,
                height: (chartContainerRef.current as any).clientHeight,
            };

            const chart = createChart(chartContainerRef.current, chartOptions);
            chart.timeScale().fitContent();

            const newSeries = chart.addCandlestickSeries()
            //FETCH OLD AND LIVE CANDLES 
            fetchCandle(newSeries);

            addMarkers(newSeries)


            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };

        },

    );

    function addMarkers(newSeries){

        // newSeries.setMarkers([{

        //     time: priceData[priceData.length-1].time,
        //     position: 'belowBar',
        //     color: 'green',
        //     shape: 'arrowUp',
        //     text: 'buy',
        //     id: 'id4',

        // }]);

        const priceLine = newSeries.createPriceLine({ 
            price: 210.0,
            color: 'green',
            lineWidth: 2,
            lineStyle: null,
            axisLabelVisible: true,
            title: 'P/L 500',
            lineVisible:true
        });
    }



    function fetchCandle(newSeries){
       //taken fron priceData.js 
        GetCandles()
            .then(Resp=>{
                const candles=Resp.data.map((d)=>({

                    'time':d[0]/1000,
                    'open':d[1],
                    'high':d[2],
                    'low':d[3],
                    'close':d[4]
                    
                }))
                newSeries.setData(candles)
            })

        //taken fron priceData.js
        const conn = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@kline_30m"); 
        conn.onmessage = function (event){
          var liveData =JSON.parse(event.data)
      
          var editLiveData = {
            time:liveData.k.t/1000,
            open:liveData.k.o,
            high:liveData.k.h,
            low:liveData.k.l,
            close:liveData.k.c
      
          }
          newSeries.update(editLiveData)
          
          return 
          
        }

        

    }


    const size = {

        width: '80%',
        height: '50%'
    }


  

    return (
        <>
            <div className="chartBorder" style={size}>

                <div ref={chartContainerRef} style={{
                    'width': '100%',
                    'height': '100%'
                }}>
                </div>

            </div>

        </>
    )
}

