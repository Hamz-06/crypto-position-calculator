import './ChartTab.css'
import React, { memo } from 'react';
import { GetCandles, GetLiveCandle } from '../ApiReq/PriceData';
import { useEffect, useState } from 'react';
import { createChart, CrosshairMode, LineStyle } from 'lightweight-charts';
import { useRef } from 'react';
import { useCallback } from 'react';
import { ChartTabTopContainer } from './ChartTabTopCont'




//https://rmolinamir.github.io/typescript-cheatsheet/

export const ChartTab = () => {


    var chart = useRef(null);
    const chartContainerRef = useRef();
    var newSeries = useRef(null);
    const purchasePrice = useRef(null);
    const stopLossPrice = useRef(null);
    const takeProfPrice = useRef(null);
    const getLivePrice = useRef(null);
    const [positionType, setPosType] = useState('long')  //default should be same as calc
    const [orderType, updateOrderType] = useState('marketOrder') //default shouuld be same as calc


    const [limitPrice, updateLimitPrice] = useState('')
    const [stopLoss, updateStopLoss] = useState('')
    const [takeProfit, updateTakeProfit] = useState('')
    const [currentTimeFrame, updateTimeFrame] = useState('30m')


    useEffect(
        () => {

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
                width: chartContainerRef.current.clientWidth,
                height: chartContainerRef.current.clientHeight,
            };

            chart.current = createChart(chartContainerRef.current, chartOptions);
            chart.current.timeScale().fitContent();

            newSeries.current = chart.current.addCandlestickSeries()
            //FETCH OLD AND LIVE CANDLES 





            //used to resize observer
            const resizeO = new ResizeObserver((entries) => {
                chart.current.applyOptions(
                    {
                        width: chartContainerRef.current.clientWidth,
                        height: chartContainerRef.current.clientHeight,
                    });
            })

            resizeO.observe(chartContainerRef.current)


            return () => {
                resizeO.disconnect()
            }

        }, []);

    useEffect(() => {

        //taken fron priceData.js
        const conn = new WebSocket(GetLiveCandle(currentTimeFrame));
        conn.onmessage = function (event) {
            var liveData = JSON.parse(event.data)

            var editLiveData = {
                time: liveData.k.t / 1000,
                open: liveData.k.o,
                high: liveData.k.h,
                low: liveData.k.l,
                close: liveData.k.c

            }

            getLivePrice.current = editLiveData.close;

            newSeries.current.update(editLiveData)

        }
        //taken fron priceData.js 
        GetCandles(currentTimeFrame)
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
        return () => {
            conn.close()
        }
    }, [currentTimeFrame])



    //used to delete price lines 
    const deletePriceChart = () => {

        if (purchasePrice.current) {

            newSeries.current.removePriceLine(purchasePrice.current)
            purchasePrice.current = null

            newSeries.current.removePriceLine(stopLossPrice.current)
            stopLossPrice.current = null

            newSeries.current.removePriceLine(takeProfPrice.current)
            takeProfPrice.current = null

        }
    }
    //price passed in, position type(long/short), tp or sl
    const updatePosPriceChart = (price, positionType, stopOrTake, percentChange) => {

        console.log(price, positionType, stopOrTake, percentChange)
        if (stopOrTake === 'takeProfit') {
            //if long add +
            if (positionType === 'long') {
                var getTp = price + ((percentChange / 100) * price)
                //if short take away --
            } else if (positionType === 'short') {
                var getTp = price - ((percentChange / 100) * price)
            }
            return getTp
        }
        //adjust stop loss
        else {
            //if short 
            if (positionType === 'long') {
                var getSl = price - ((percentChange / 100) * price)
                //if long take away --
            } else if (positionType === 'short') {
                var getSl = price + ((percentChange / 100) * price)
            }
            return getSl
        }

    }
    //used to add and update stop loss and take profit 
    const updatePriceChart = (priceLocal, stopLossLocal, takeProfitLocal, positionTypeLocal) => {


        var priceLines = purchasePrice.current === null && stopLossPrice.current === null && takeProfPrice.current === null
        //if price line exists 
        if (priceLines) {
            //create price lines (current price) - subject to change
            purchasePrice.current = newSeries.current.createPriceLine({

                color: 'white',
                lineWidth: 1,
                lineStyle: null,
                axisLabelVisible: false,
                lineVisible: true,
            });
            //create stop loss price
            stopLossPrice.current = newSeries.current.createPriceLine({
                title: 'StopLoss',
                color: 'red',
                lineWidth: 2,
                lineStyle: null,
                axisLabelVisible: true,
                lineVisible: true
            })

            //create take profit
            takeProfPrice.current = newSeries.current.createPriceLine({
                title: 'TakeProfit',
                color: 'green',
                lineWidth: 2,
                lineStyle: null,
                axisLabelVisible: true,
                lineVisible: true
            })
        }

        purchasePrice.current.applyOptions({

            price: priceLocal
        })


        takeProfPrice.current.applyOptions({
            price: updatePosPriceChart(parseInt(priceLocal), positionType, 'takeProfit', takeProfitLocal, positionType)

        })

        stopLossPrice.current.applyOptions({

            price: updatePosPriceChart(parseInt(priceLocal), positionType, 'stopLoss', stopLossLocal, positionType)
        })


    }

    //used to detect if values are changed 
    useEffect(() => {

        var limitPriceEmpty = (limitPrice !== '' && stopLoss !== '' && takeProfit !== '')
        var marketOrderEmpty = (stopLoss !== '' && takeProfit !== '' && limitPrice === '')

        if (marketOrderEmpty && orderType === 'marketOrder') {
            updatePriceChart(getLivePrice.current, stopLoss, takeProfit)
            return
        } else if (limitPriceEmpty && orderType === 'limitOrder') {
            updatePriceChart(limitPrice, stopLoss, takeProfit)
            return
        }

        //make sure to remove 
        deletePriceChart()

    }, [limitPrice, stopLoss, takeProfit, positionType])

    //use effect for event listner - add remove feature
    useEffect(() => {
       
        //stop loss
        const stopLossDom = document.getElementById('stopLossPercent');
        stopLossDom.addEventListener('input', () => {

            const stopLossPercent = document.getElementById('stopLossPercent').value;

            updateStopLoss(stopLossPercent)
        })
        //take profit
        const takeProfPerDom = document.getElementById('takeProfPercent');
        takeProfPerDom.addEventListener('input', () => {

            const takeProfPercent = document.getElementById('takeProfPercent').value;
            updateTakeProfit(takeProfPercent)
        })

        //buttons for long/short 
        var posTypeRadios = document.getElementsByClassName('calc_radio_check');
        for (let radio of posTypeRadios) {
            radio.onclick = (e) => {

                setPosType(e.target.value)

            }
        }
        var orderTypeButtons = document.getElementsByClassName('orderType');
        for (let orderButton of orderTypeButtons) {
            orderButton.onclick = (e) => {

                updateOrderType(e.target.id)
            }
        }

        //limit price 
        const limitPriceDom = document.getElementById('LimitPrice');

        limitPriceDom.addEventListener('input', () => {
            const limitPrice = document.getElementById('LimitPrice').value;
            updateLimitPrice(limitPrice)
        })



    }, [])




    const timeFrames = ['30m', '1h', '4h']
    return (
        <>
            <div className="delete" style={{ position: 'absolute', top: '0' }}>
                {/* {
                timeFrames.map((timeFrame)=>{
                    //console.log(timeFrame)
                })
                } */}

            </div>
            <div className="chartTab_info">

                {/* this is updated every 2 seconds hence its a user defined component  */}
                <ChartTabTopContainer />

                <div>
                    <div className="chartTab_timerDropDown">
                        Time Frame

                        <br />
                        {currentTimeFrame}
                        <div className="chartTab_timerDropDown-content">

                            {
                                timeFrames.map((timeFrame, index) => {
                                    return (<p className='chartTab_timerDropDown-content-button' key={index} >
                                        <button onClick={() => { updateTimeFrame(timeFrame) }}>{timeFrame}</button>
                                        <br />
                                    </p>)

                                })
                            }
                        </div>

                        <i className="fa-solid fa-angle-down"></i>
                    </div>

                </div>
            </div>

            
            <div className="chartTab_outer" >


                <div className="chartTab_container">

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

