import './ChartTab.css'
import React from 'react';
import { GetCandles } from './PriceData';
import { useEffect, useState } from 'react';
import { createChart, CrosshairMode, LineStyle } from 'lightweight-charts';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'

//https://rmolinamir.github.io/typescript-cheatsheet/

export const ChartTab = props => {

    
    
    
    const chartContainerRef = useRef();
    var newSeries = useRef(null);
    const purchasePrice = useRef(null);
    const stopLossPrice = useRef(null);
    const takeProfPrice = useRef(null);
    const getLivePrice = useRef(null);
    const chartClicked = useSelector((state) => state.counter.value)



    useEffect(
        () => {
            const handleResize = () => {
                chart.applyOptions(
                    {
                        width: (chartContainerRef).current.clientWidth,
                        height: (chartContainerRef.current).clientHeight,
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
                width: (chartContainerRef ).current.clientWidth,
                height: (chartContainerRef.current).clientHeight,
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
                    color:'white',
                    lineWidth: 2,
                    lineStyle: null,
                    axisLabelVisible: false,
                    lineVisible: true
                });
                //create stop loss price
                stopLossPrice.current = newSeries.current.createPriceLine({
                    color:'red',
                    lineWidth: 2,
                    lineStyle: null,
                    axisLabelVisible: true,
                    lineVisible: true
                })

                //create take profit
                takeProfPrice.current = newSeries.current.createPriceLine({
                    color:'green',
                    lineWidth: 2,
                    lineStyle: null,
                    axisLabelVisible: true,
                    lineVisible: true
                })

            //remove if data is zero and price line exists 
            }else if(props.reload.length===0 && purchasePrice.current!==null && stopLossPrice.current!==null && takeProfPrice.current!==null){
                
                newSeries.current.removePriceLine(purchasePrice.current)
                purchasePrice.current =null

                newSeries.current.removePriceLine(stopLossPrice.current)
                stopLossPrice.current=null

                newSeries.current.removePriceLine(takeProfPrice.current)
                takeProfPrice.current=null
                
            }
            //update price and stop loss if new data is fetched( first checks if data is not null)
            if (purchasePrice.current!=null && stopLossPrice.current!=null && takeProfPrice.current!=null){
        
                
                purchasePrice.current.applyOptions({
                    
                    price: getLivePrice.current
                })
                
                stopLossPrice.current.applyOptions({
                    
                    price: createStopLoss(props.reload[0], parseInt(getLivePrice.current))
                })

                takeProfPrice.current.applyOptions({
                    price: createTakeProf(props.reload[1],parseInt(getLivePrice.current))
                    
                })
               
            }

        },[props.reload])

        function createTakeProf(takeProfPercent, currentPrice){
   
            var getTakePrice = currentPrice+((takeProfPercent/100)*currentPrice)
            return getTakePrice
        }
        
        
        function createStopLoss(stopLossPercent, currentPrice){
            var getStopPrice = currentPrice - ((stopLossPercent/100)*currentPrice)
            // console.log(getStopPrice + "  --sl-")
            return getStopPrice
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
        <div className="outerBox" style={chartClicked ? { display: '' } : { display: 'none' }}>
            <div className='extraInfoBox'>
                <h1>BTC Chart</h1>
                <p>(add to portfolio and Long/short feature coming soon v3 soon)</p>
         
            </div>

            <div className="chartBorder" style={size}>

                <div ref={chartContainerRef} style={{
                    'width': '100%',
                    'height': '100%'
                }}>
                </div>

            </div>

        </div>

      

        </>
    )
}

