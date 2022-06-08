import './ChartTab.css'

import { GetCandles } from './PriceData';
import { useEffect, useState } from 'react';
import { createChart, CrosshairMode, LineStyle } from 'lightweight-charts';
import { useRef } from 'react';


//https://rmolinamir.github.io/typescript-cheatsheet/

export const ChartTab = props => {

    
    
    
    const chartContainerRef = useRef();
    var newSeries = useRef(null);
    const purchasePrice = useRef(null);
    const stopLossPrice = useRef(null);
    const getLivePrice = useRef(null);
    



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

            newSeries.current = chart.addCandlestickSeries()
            //FETCH OLD AND LIVE CANDLES 
            fetchCandle();

            
            //addMarkers(newSeries);


            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };

        }, []);


        useEffect(()=>{

            //run and load if data is present and priceLine does not exist
            if (props.reload.length!==0 && purchasePrice.current===null &&stopLossPrice.current===null){
                
                //create price lines (current price) - subject to change
                purchasePrice.current = newSeries.current.createPriceLine({
                    lineWidth: 2,
                    lineStyle: null,
                    axisLabelVisible: false,
                    lineVisible: true
                });
                //create stop loss price
                stopLossPrice.current = newSeries.current.createPriceLine({
                    lineWidth: 2,
                    lineStyle: null,
                    axisLabelVisible: false,
                    lineVisible: true
                })

            //remove if data is zero and price line exists 
            }else if(props.reload.length===0 && purchasePrice.current!==null && stopLossPrice.current!==null){
                
                newSeries.current.removePriceLine(purchasePrice.current)
                purchasePrice.current =null

                newSeries.current.removePriceLine(stopLossPrice.current)
                stopLossPrice.current=null
                
            }
            //update price and stop loss if new data is fetched( first checks if data is not null)
            if (purchasePrice.current!=null &&stopLossPrice.current!=null){
        
                
                purchasePrice.current.applyOptions({
                    color:'pink',
                    price: getLivePrice.current
                })

                stopLossPrice.current.applyOptions({
                    color:'pink',
                    price: createStopLoss(getLivePrice.current)
                })
                
            }

            

        },[props.reload])


        function createStopLoss(currentPrice ){
            
            return 32000

        }






    function fetchCandle() {
        //taken fron priceData.js 
        GetCandles()
            .then(Resp => {
                const candles = Resp.data.map((d) => ({

                    'time': d[0] / 1000,
                    'open': d[1],
                    'high': d[2],
                    'low': d[3],
                    'close': d[4]

                }))
                newSeries.current.setData(candles)
            })

        //taken fron priceData.js
        const conn = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@kline_30m");
        conn.onmessage = function (event) {
            var liveData = JSON.parse(event.data)

            var editLiveData = {
                time: liveData.k.t / 1000,
                open: liveData.k.o,
                high: liveData.k.h,
                low: liveData.k.l,
                close: liveData.k.c

            }
            getLivePrice.current=editLiveData.close;
            
            newSeries.current.update(editLiveData)
            return;
        }
    }


    const size = {

        width: '90%',
        height: '70%'
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

