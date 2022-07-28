import './ChartTab.css'
import React, { useState, useEffect, useTransition } from 'react';
import { GetCandles, GetLiveCandle } from '../ApiReq/PriceData';

import { createChart, CrosshairMode, LineStyle } from 'lightweight-charts';
import { useRef } from 'react';
import { useCallback } from 'react';


import { GetCryptoInfo } from '../ApiReq/PriceData'
import { setExtraInfo } from '../Storage/ExtraInfoFromChart'
import { setParamClick } from '../Storage/ParamClickChart'
import { useDispatch, useSelector } from 'react-redux';

//https://rmolinamir.github.io/typescript-cheatsheet/

export const ChartTab = () => {


    const [currentTimeFrame, updateTimeFrame] = useState('30m')
    const timeFrames = ['30m', '1h', '4h']
    const getLivePrice = useRef(null);


    var dispatch = useDispatch()
    var chart = useRef(null);
    var newSeries = useRef(null);
    const chartContainerRef = useRef();
    const purchasePrice = useRef(null);
    const stopLossPrice = useRef(null);
    const takeProfPrice = useRef(null);
    const calcTabInfo = useSelector(state => state.calcInfo.value)
    const cryptoCoin = useSelector(state => state.cryptoCoin.value.cryptoCoin)
    const allTrades = useSelector((state) => state.allTrades.value)
    const [isPending, startTransition] = useTransition()

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

            //create chart at chartContainerRef with rhose options 
            chart.current = createChart(chartContainerRef.current, chartOptions);
            chart.current.timeScale().fitContent();
            //FETCH OLD AND LIVE CANDLES 
            newSeries.current = chart.current.addCandlestickSeries()

            function myClickHandler(param) {
                if (!param.point) {
                    return;
                }
                const price = newSeries.current.coordinateToPrice(param.point.y).toFixed(2)
                var time = (param.time) * 1000
                time = (Number.isNaN(time)) ? '' : time
                // console.log(time)
                dispatch(setParamClick({
                    price: price,
                    time: time
                }))

                // console.log(`Click at ${param.point.x}, ${param.point.y}. The time is ${param.time}.`);
            }

            chart.current.subscribeClick(myClickHandler);

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

        const conn = new WebSocket(GetLiveCandle(currentTimeFrame, cryptoCoin));
        //taken fron priceData.js
        startTransition(()=>{
        

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
            GetCandles(currentTimeFrame, cryptoCoin)
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
                
            })
            

        return () => {
            conn.close()
        }
    }, [currentTimeFrame, cryptoCoin])


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
    const updatePriceChart = (priceLocal, stopLossLocal, takeProfitLocal, positionType, checkBox) => {

        var priceLines = purchasePrice.current === null && stopLossPrice.current === null && takeProfPrice.current === null
        //if price line exists 
        if (priceLines) {
            //create price lines (current price) - subject to change
            purchasePrice.current = newSeries.current.createPriceLine({
                title: 'entry @',
                color: '#b0c4de',
                lineWidth: 1,
                lineStyle: null,
                axisLabelVisible: true,
                lineVisible: true,
            });
            //create stop loss price
            stopLossPrice.current = newSeries.current.createPriceLine({
                title: 'StopLoss @',
                color: 'red',
                lineWidth: 2,
                lineStyle: null,
                axisLabelVisible: true,
                lineVisible: true
            })

            //create take profit
            takeProfPrice.current = newSeries.current.createPriceLine({
                title: 'TakeProfit @',
                color: 'green',
                lineWidth: 2,
                lineStyle: null,
                axisLabelVisible: true,
                lineVisible: true
            })
        }
        
        var takeProfitUsd = updatePosPriceChart(parseFloat(priceLocal), positionType, 'takeProfit', takeProfitLocal)
        var stopLossUsd = updatePosPriceChart(parseFloat(priceLocal), positionType, 'stopLoss', stopLossLocal)

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
            price: parseFloat(priceLocal).toFixed(2),
            stopLoss: stopLossUsd.toFixed(2),
            takeProfit: takeProfitUsd.toFixed(2)
        }))

    }


    //used to detect if values are changed 
    useEffect(() => {


        if (calcTabInfo === null) {
            //as there is not data coming from calc, we reset and send null data back 
            dispatch(setExtraInfo(null))
            //make sure to remove price lines 
            deletePriceChart()
            return;
        }
        var orderType = calcTabInfo.orderType;
        var stopLoss = calcTabInfo.stopLoss;
        var takeProfit = calcTabInfo.takeProfit;
        var takeProfit = calcTabInfo.takeProfit;
        var price = calcTabInfo.price;
        var positionType = calcTabInfo.positionType;
        var checkBox = calcTabInfo.checkBox;

        if (orderType === 'marketOrder') {
            updatePriceChart(getLivePrice.current, stopLoss, takeProfit, positionType, checkBox)
            return
        } else if (orderType === 'limitOrder') {
            updatePriceChart(price, stopLoss, takeProfit, positionType, checkBox)

        }


    }, [calcTabInfo])

    //display all trades
    useEffect(() => {

        if (allTrades === null) return
        var markers = [];
        allTrades.map((trade) => {
            // console.log(typeof(trade.date))
            // console.log(trade.date)
            if (trade.cryptoCoin !== cryptoCoin) return;
            markers.push({
                time: trade.date / 1000,
                position: (trade.posType === 'short') ? 'aboveBar' : 'belowBar',
                color: (trade.posType === 'short') ? '#e91e63' : '#008000',
                shape: (trade.posType === 'short') ? 'arrowDown' : 'arrowUp',
                text: (trade.posType === 'short') ? 'Sell' : 'Buy'
            })
        })
        newSeries.current.setMarkers(markers);

    }, [allTrades, cryptoCoin])

    const TopInfoContainer = useCallback(() => {

        const [cryptoInfo, updateCryptoInfo] = useState([])
        useEffect(() => {

            //Set extra info
            function setTimerInfo() {
                //pass coin info to api
                GetCryptoInfo(cryptoCoin).then(resp => {
                    var priceChangePercent = parseFloat(resp.data.priceChangePercent).toFixed(2)
                    var lowPrice = parseFloat(resp.data.lowPrice).toFixed(2)
                    var openPrice = parseFloat(resp.data.openPrice).toFixed(2)

                    const cryptoInfoLocal = [priceChangePercent, lowPrice, openPrice]
                    updateCryptoInfo(cryptoInfoLocal)


                })
            }
            //run once on load 
            setTimerInfo()
            //stat timer 
            var getInfoInterval = setInterval(setTimerInfo, 2000)
            return () => {
                clearInterval(getInfoInterval)
            }
        }, [cryptoCoin])

        return (
            <>
                <div>
                    24h Percent Change<br />
                    <p style={cryptoInfo[0] > 0 ? { color: 'green' } : { color: 'red' }}>{cryptoInfo[0]}</p>

                </div>
                <div>

                    24h Low<br />
                    {cryptoInfo[1]}
                </div>
            </>
        )
    }, [cryptoCoin])
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
                <TopInfoContainer />


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

