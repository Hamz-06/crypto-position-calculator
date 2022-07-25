import React, { useRef } from "react"
import { useState } from 'react';
import './CalculatorTab.css'
import { cryptoCoins, getCryptoImage } from "../ApiReq/PriceData";
import { useDispatch, useSelector } from "react-redux";
import { setNewTrade } from '../Storage/NewTrade'
import { useEffect } from "react";
import { setCalcInfo } from '../Storage/ExtraInfroFromCalc'


export const CalculatorTab = () => {

    const dispatch = useDispatch();

    const [stopLoss, updateStopLoss] = useState('')
    const [takeProfit, updateTakeProfit] = useState('')
    const [limitPrice, updateLimitPrice] = useState('')
    const [positionType, setPosType] = useState('long')
    const [orderType, updateOrderType] = useState('marketOrder')
    const [filled, updateFill] = useState(false)
    var paramChartClicked = useSelector(state => state.paramClick.value)
    

    //limit order or market
    const handleOrderType = (event) => {

        updateOrderType(event.target.id)

    }
    //long or short 
    const handlePosition = (event) => {

        setPosType((event.target.value));

    };


  
    //send data to chart tab
    useEffect(() => {
        var limitPriceEmpty = (limitPrice === '' || stopLoss === '' || takeProfit === '')
        var marketOrderEmpty = (stopLoss === '' || takeProfit === '')
        var addTradeEmpty = (stopLoss === '' || takeProfit === '')

        if (limitPriceEmpty && orderType === 'limitOrder') {
            dispatch(setCalcInfo(null));
            return;
        } else if (marketOrderEmpty && orderType === 'marketOrder') {
            dispatch(setCalcInfo(null));
            return;
        } else if (addTradeEmpty && orderType === 'addTrade') {
            dispatch(setCalcInfo(null));
            return;
        }
        if (orderType === 'limitOrder' || orderType === 'marketOrder') {

            dispatch(setCalcInfo({
                orderType: orderType,
                stopLoss: stopLoss,
                takeProfit: takeProfit,
                price: limitPrice,
                positionType: positionType,

            }))
        } else if (orderType === 'addTrade' && paramChartClicked !== null) {

            dispatch(setCalcInfo({
                orderType: orderType,
                stopLoss: stopLoss,
                takeProfit: takeProfit,
                price: paramChartClicked.price,
                positionType: positionType,
            }))
        }
    }, [stopLoss, takeProfit, limitPrice, positionType, orderType, paramChartClicked])



    const MarketOrderDiv = () => {
        return (
            <div className="calc_inputField_outer">
                {(orderType === 'addTrade') ?
                    (<div className="calc_inputField_addTrade_help">
                        Click the chart at where you would like to place the trade!
                    </div>) : ''
                }
                <div className="calc_inputField">
                    <div className="calc_inputBox" style={{ display: (orderType === 'limitOrder') ? 'block' : 'none' }}>
                        <label className="calc_inputLabel" style={{ color: limitPrice === '' ? 'transparent' : 'black' }} >Limit price</label>
                        <input type="number" onChange={(event) => { updateLimitPrice(event.target.value) }} className='calc_input' id="LimitPrice" value={limitPrice} placeholder='Limit Price'
                            style={(filled && stopLoss === '') ? { border: '1px solid red' } : { color: '1px solid black' }} />
                    </div>

                    <div className="calc_inputBox" >
                        <label className="calc_inputLabel" style={{ color: stopLoss === '' ? 'transparent' : 'black' }} >stop loss</label>
                        <input type="number" onChange={(event) => { updateStopLoss(event.target.value) }} className='calc_input' id="stopLossPercent" value={stopLoss} placeholder='Stop Loss In Percent'
                            style={(filled && stopLoss === '') ? { border: '1px solid red' } : { color: '1px solid black' }} />
                    </div>


                    <div className="calc_inputBox" >
                        <label className="calc_inputLabel" style={{ color: takeProfit === '' ? 'transparent' : 'black' }}>take profit</label>
                        {/* <label style={takeProfPercent.current===''?{display:'none'}:{display:'block'}}>take profit</label> */}
                        <input type="number" className='calc_input' onChange={(event) => { updateTakeProfit(event.target.value) }} id='takeProfPercent' value={takeProfit} placeholder='Take Profit In Percent'
                            style={(filled && stopLoss === '') ? { border: '1px solid red' } : { color: '1px solid black' }} />
                    </div>

                    <div className="calc_inputBox">

                        <div className="calc_radio">
                            <label>
                                <a>Long </a>
                                <input type="radio" value="long" className="calc_radio_check" checked={positionType === 'long'} onChange={handlePosition} />
                            </label>
                        </div>
                        <div className="calc_radio">
                            <label>
                                <a>Short </a>
                                <input type="radio" value="short" className="calc_radio_check" checked={positionType === 'short'} onChange={handlePosition} />
                            </label>
                        </div>
                    </div>

                </div>
            </div>


        )
    }


    const ButtonAddToPortfolio = () => {

        //requires validation
        const infoChartTab = useSelector((state) => state.extraInfo.value)
        const userEmail = useSelector((state) => state.userData.value)
        const [confirmAdd, updateConfirmAdd] = useState(false)
        const [displayNotLogged, updateDisplayNotLogged] = useState(false)


        //used when confirm is pressed on pop up 
        const addNewTrade = () => {

            const date = new Date().getTime()

            //dispatch if data is received from chart tab
            if (infoChartTab && orderType !== 'addTrade') {
                dispatch(setNewTrade({
                    posType: positionType,
                    entryPrice: infoChartTab.price,
                    takeProfit: infoChartTab.takeProfit,
                    stopLoss: infoChartTab.stopLoss,
                    date: date,
                    cryptoCoin: cryptoCoins[0].cryptoName,
                    cryptoImage: getCryptoImage(cryptoCoins[0].cryptoName)
                }))
            }
            else if (infoChartTab && orderType === 'addTrade') {
                dispatch(setNewTrade({
                    posType: positionType,
                    entryPrice: infoChartTab.price,
                    takeProfit: infoChartTab.takeProfit,
                    stopLoss: infoChartTab.stopLoss,
                    date: paramChartClicked.time,
                    cryptoCoin: cryptoCoins[0].cryptoName,
                    cryptoImage: getCryptoImage(cryptoCoins[0].cryptoName)
                }))
            }
            updateConfirmAdd(false)
            updateStopLoss('')
            updateTakeProfit('')
            updateTakeProfit('')
            updateFill(false)
        }
        //used when add to portfolio button is pressed
        const handleAddToPortfolio = () => {
            var limitPriceEmpty = (limitPrice === '' && stopLoss === '' && takeProfit === '')
            var marketOrderEmpty = (stopLoss === '' && takeProfit === '')
            var addTradeEmpty = (stopLoss === '' && takeProfit === '')
            //check if there is a value 
            if (marketOrderEmpty && orderType === 'marketOrder') {
                console.log('Plase Fill Market Info')
                updateFill(true)
                return
            } else if (limitPriceEmpty && orderType === 'limitOrder') {
                console.log('Please Fill Limit Info')
                updateFill(true)
                return
            } else if (addTradeEmpty && orderType === 'addTrade' || paramChartClicked === null) {
                console.log('please fill')
                updateFill(true)
                return;
            }
            //All of the values are filled and now confirmation button appears 

            updateConfirmAdd(true)
        }

        return (
            <>

                {(confirmAdd) ?
                    (<div
                        className='calc_output_button_confirm'>
                        <button className="calc_output_button_confirm_cancel" onClick={() => updateConfirmAdd(false)}>Cancel</button>
                        <button className='calc_output_button_confirm_confirm' onClick={() => addNewTrade()}>Confirm!</button>

                    </div>) : ''
                }

                <button
                    className={(userEmail !== null) ? 'calc_output_button' : 'calc_output_button_false'}
                    onClick={() => (userEmail !== null) ? handleAddToPortfolio() : updateDisplayNotLogged(true)}>
                    <p>Add Trade To Portfolio</p>
                    <i style={(userEmail !== null) ? { display: 'none' } : {}} className="fa-solid fa-lock fa-2x"></i>
                </button>

                {(displayNotLogged) ?
                    (<div
                        className="calc_output_button_notSignedIn">
                        <i onClick={() => updateDisplayNotLogged(false)} className="fa-solid fa-location-crosshairs fa-2x"></i>

                        <p>You need to sign in !</p>
                        <p>• Sign in to track trades</p>
                        <p>• View and track portfolio(coming soon)</p>
                        <p>• View trades on chart(coming soon)</p>
                    </div>) : ''
                }
            </>
        )
    }

    return (
        <>
            <div className="calc_outer" >

                <div className="calc_infoBox">
                    <img src={cryptoCoins[0].cryptoImage} alt="alternatetext"></img>
                    <p>{cryptoCoins[0].cryptoName}</p>

                </div>
                <div className="calc_Pos_Button">

                    <div className="calc_btn-group">
                        <button id="marketOrder" onClick={handleOrderType} className='orderType'>Market Order</button>
                        <button id="limitOrder" onClick={handleOrderType} className='orderType'>Limit Order</button>
                    </div>

                    <div className="calc_btn-group">
                        <button id="addTrade" onClick={handleOrderType} className='orderType'>Add Trade</button>

                    </div>

                </div>
                {
                    MarketOrderDiv()
                }
                <div className="calc_output">

                    {
                        <ButtonAddToPortfolio />
                    }

                </div>
            </div>
        </>
    )


};

