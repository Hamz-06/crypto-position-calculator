import './ChartTab.css'
import React, { useState, useEffect } from 'react';
import { GetCandles, GetLiveCandle } from '../ApiReq/PriceData';

import { createChart, CrosshairMode, LineStyle } from 'lightweight-charts';
import { useRef } from 'react';
import { useCallback } from 'react';
import { ChartTabTopContainer } from './ChartTabTopCont'

import { GetCryptoInfo } from '../ApiReq/PriceData'
import { setExtraInfo } from '../Storage/ExtraInfo'
import { useDispatch, useSelector } from 'react-redux';
import AllTrades from '../Storage/AllTrades';


//https://rmolinamir.github.io/typescript-cheatsheet/

export const ChartTab = () => {


    const [currentTimeFrame, updateTimeFrame] = useState('30m')
    const timeFrames = ['30m', '1h', '4h']
    const getLivePrice = useRef(null);
    const allTrades = useSelector((state) => state.allTrades.value)

    var dispatch = useDispatch()
    var chart = useRef(null);
    var newSeries = useRef(null);
    const chartContainerRef = useRef();
    const purchasePrice = useRef(null);
    const stopLossPrice = useRef(null);
    const takeProfPrice = useRef(null);
    const [positionType, setPosType] = useState('long')  //default should be same as calc
    const [orderType, updateOrderType] = useState('marketOrder') //default shouuld be same as calc
    const [limitPrice, updateLimitPrice] = useState('')
    const [stopLoss, updateStopLoss] = useState('')
    const [takeProfit, updateTakeProfit] = useState('')
    const onClickSubsData = useRef()
    //create chart 
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
                timeScale: {
                    timeVisible: true,
                    secondVisible: false,
                    // borderVisible:false
                }
            };

            chart.current = createChart(chartContainerRef.current, chartOptions);
            chart.current.timeScale().fitContent();
            function myClickHandler(param) {
                if (!param.point) {
                    return;
                }

                console.log(`Click at ${param.point.x}, ${param.point.y}. The time is ${param.time}.`);
            }
            chart.current.subscribeClick(myClickHandler);

            newSeries.current = chart.current.addCandlestickSeries()
            //FETCH OLD AND LIVE CANDLES 

            //used to resize observer
            const resizeO = new ResizeObserver(() => {
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

    //update price chart 
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
                //As web scoket is delayed by 2 seconds, im setting live price to last candle open price 
                const candleLen = candles.length

                getLivePrice.current = candles[candleLen - 1].open
                newSeries.current.setData(candles)
            })
        return () => {
            conn.close()
        }
    }, [currentTimeFrame])

    //used to delete price lines function
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

    //used to add and update stop loss and take profit - used to dispatch price sl and tp to calc 
    const updatePriceChart = (priceLocal, stopLossLocal, takeProfitLocal) => {


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

        var takeProfitUsd = updatePosPriceChart(parseInt(priceLocal), positionType, 'takeProfit', takeProfitLocal, positionType)
        var stopLossUsd = updatePosPriceChart(parseInt(priceLocal), positionType, 'stopLoss', stopLossLocal, positionType)
        purchasePrice.current.applyOptions({

            price: priceLocal
        })

        takeProfPrice.current.applyOptions({
            price: takeProfitUsd
        })

        stopLossPrice.current.applyOptions({
            price: stopLossUsd
        })

        //dispatch to calculator tab
        dispatch(setExtraInfo({
            price: parseInt(priceLocal).toFixed(2),
            stopLoss: stopLossUsd,
            takeProfit: takeProfitUsd
        }))

    }


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

    //used to detect if values are changed 
    useEffect(() => {


        var limitPriceEmpty = (limitPrice !== '' && stopLoss !== '' && takeProfit !== '')
        var marketOrderEmpty = (stopLoss !== '' && takeProfit !== '')

        if (marketOrderEmpty && orderType === 'marketOrder') {
            updatePriceChart(getLivePrice.current, stopLoss, takeProfit)
            return
        } else if (limitPriceEmpty && orderType === 'limitOrder') {
            updatePriceChart(limitPrice, stopLoss, takeProfit)
            return
        }
        dispatch(setExtraInfo(null))
        //make sure to remove 
        deletePriceChart()

    }, [limitPrice, stopLoss, takeProfit, positionType, orderType])

    //display all trades
    useEffect(() => {
        if (allTrades === null) return
        var markers = [];

        console.log(allTrades)
        var markers = [{ time: 1658428948, position: 'aboveBar', color: '#f68410', shape: 'circle', text: 'D' }];

        allTrades.map((trade) => {
            // console.log(typeof(trade.date))
            // console.log(trade.date)
            markers.push({ time: trade.date / 1000, position: (trade.posType === 'short') ? 'aboveBar' : 'belowBar', color: (trade.posType === 'short') ? '#e91e63' : '#008000', shape: (trade.posType === 'short') ? 'arrowDown' : 'arrowUp', text: (trade.posType === 'short') ? 'Sell' : 'Buy' })
        })

        newSeries.current.setMarkers(markers);
    }, [allTrades])


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


                {/* chart tab btc price
                <div className="chartTab_priceChart">
                    lol<br/>
                    <p>{livePrice}</p>
                </div> */}
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
                    <i className="fa-solid fa-angle-up"></i>
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

