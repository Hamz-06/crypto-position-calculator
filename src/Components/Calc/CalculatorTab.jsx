import React, { memo, useCallback, useRef } from "react"
import { useState } from 'react';
import './CalculatorTab.css'
import { cryptoCoins, getCryptoImage, unixToDate } from "../ApiReq/PriceData";
import { useDispatch, useSelector } from "react-redux";
import { setNewTrade } from '../Storage/NewTrade'
import { useEffect } from "react";
import { setCalcInfo } from '../Storage/ExtraInfroFromCalc'
import { update } from "react-spring";
import { margin, textAlign } from "@mui/system";
import { setCoin } from '../Storage/CryptoCoin'
import { addTradeDatabase } from "../Firebase/Firebase_user_info";


export const CalculatorTab = memo(() => {

    const dispatch = useDispatch();
    const userId = useSelector((state) => state.userId.value)
    const [stopLoss, updateStopLoss] = useState('')
    const [takeProfit, updateTakeProfit] = useState('')
    const [limitPrice, updateLimitPrice] = useState('')
    const [positionType, setPosType] = useState('long')
    const [orderType, updateOrderType] = useState('marketOrder')
    const [filled, updateFill] = useState(false)
    const [checkBox, updateCheckBox] = useState(false)
    const [time, updateTime] = useState(['', ''])

    var paramChartClicked = useSelector(state => state.paramClick.value)
    var currentCoin = useSelector(state => state.cryptoCoin.value)


    //limit order or market
    const handleOrderType = (event) => {

        updateOrderType(event.target.id)

    }
    //long or short 
    const handlePosition = (event) => {

        setPosType((event.target.value));

    };
    //handle checkbox - clear data when pressed
    const handleCheckBox = () => {
        updateCheckBox(!checkBox)
        updateLimitPrice('')
        updateStopLoss('')
        updateTakeProfit('')
        updateTime(['', ''])
    }
    //clear input when another chart is clicked 
    useEffect(() => {
        updateLimitPrice('')
        updateStopLoss('')
        updateTakeProfit('')
        updateTime(['', ''])
    }, [currentCoin])

    //send data to chart tab
    useEffect(() => {
        var limitPriceEmpty = (limitPrice === '' || stopLoss === '' || takeProfit === '')
        var marketOrderEmpty = (stopLoss === '' || takeProfit === '')

        if (limitPriceEmpty && orderType === 'limitOrder') {
            dispatch(setCalcInfo(null));
            return;
        } else if (marketOrderEmpty && orderType === 'marketOrder') {
            dispatch(setCalcInfo(null));
            return;
        }
        if (orderType === 'marketOrder') {

            dispatch(setCalcInfo({
                orderType: orderType,
                stopLoss: stopLoss,
                takeProfit: takeProfit,
                price: null,
                positionType: positionType,
                checkBox: false,

            }))
        } else if (orderType === 'limitOrder') {


            dispatch(setCalcInfo({
                orderType: orderType,
                takeProfit: takeProfit,
                stopLoss: stopLoss,
                price: limitPrice,
                positionType: positionType,
                checkBox: checkBox,
            })

            )
        }
    }, [stopLoss, takeProfit, limitPrice, positionType, orderType, paramChartClicked, checkBox])

    //when clicked on chart update input
    useEffect(() => {
        if (checkBox) {

            updateLimitPrice(paramChartClicked.price)
            var date = unixToDate(paramChartClicked.time)
            updateTime([paramChartClicked.time, date])

        }

    }, [paramChartClicked])
    //change time and limit order style
    const colorStyleTime = (input) => {
        return {

            border: (filled && input === '') ? '1px solid red' : '1px solid black',
            backgroundColor: (checkBox) ? '#9f9f9f' : '#ffffff'
        }
    }

    const MarketOrderDiv = () => {
        return (
            <div className="calc_inputField_outer">


                <div className="calc_inputField">
                    {(checkBox) ? (<div className="calc_inputBox">
                        click on the chart where you would like to placed a trade !!
                    </div>) : ''}


                    {(checkBox) ? (

                        <div className="calc_inputBox" style={{ display: (orderType === 'limitOrder') ? 'block' : 'none' }}>
                            <label className="calc_inputLabel" style={{ color: time[0] === '' ? 'transparent' : 'black' }} >Time</label>
                            <input
                                style={colorStyleTime(time[0])}
                                readOnly={true}

                                className='calc_input'
                                placeholder='Time'
                                value={time[1]} />
                        </div>
                    ) : ''}

                    <div className="calc_inputBox" style={{ display: (orderType === 'limitOrder') ? 'block' : 'none' }}>
                        <label className="calc_inputLabel" style={{ color: limitPrice === '' ? 'transparent' : 'black' }} >Limit price</label>
                        <input
                            readOnly={checkBox}
                            type="number"
                            onChange={(event) => { updateLimitPrice(event.target.value) }}
                            className='calc_input'
                            id="LimitPrice"
                            value={limitPrice}
                            placeholder='Limit Price'
                            style={colorStyleTime(limitPrice)} />
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
                            style={(filled && takeProfit === '') ? { border: '1px solid red' } : { color: '1px solid black' }} />
                    </div>
                    {(orderType === 'limitOrder') ? (

                        <div className="calc_inputBox">
                            <label>Click on the Chart  </label>
                            <input type="checkbox" checked={checkBox} onChange={handleCheckBox} />
                        </div>) : ''
                    }

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


    const ButtonAddToPortfolio = useCallback(() => {
        
        //requires validation
        const infoChartTab = useSelector((state) => state.extraInfo.value)
        const userEmail = useSelector((state) => state.userData.value)
        const [confirmAdd, updateConfirmAdd] = useState(false)
        const [displayNotLogged, updateDisplayNotLogged] = useState(false)
        
        
        //used when confirm is pressed on pop up 
        const addNewTrade = () => {
            
            
            const date = new Date().getTime()

            //dispatch if data is received from chart tab
            if (infoChartTab &&confirmAdd && orderType === 'marketOrder') {
                const newTrade = {
                    posType: positionType,
                    entryPrice: infoChartTab.price,
                    takeProfit: infoChartTab.takeProfit,
                    stopLoss: infoChartTab.stopLoss,
                    date: date,
                    cryptoCoin: currentCoin.cryptoCoin,
                    cryptoImage: getCryptoImage(currentCoin.cryptoCoin)
                }
                dispatch(setNewTrade(newTrade))
                addTradeDatabase(newTrade, userId);
            }
            //fix
            else if (infoChartTab&&confirmAdd && orderType === 'limitOrder') {
                
                const newTrade = {
                    posType: positionType,
                    entryPrice: infoChartTab.price,
                    takeProfit: infoChartTab.takeProfit,
                    stopLoss: infoChartTab.stopLoss,
                    date: (paramChartClicked) ? paramChartClicked.time : date,
                    cryptoCoin: currentCoin.cryptoCoin,
                    cryptoImage: getCryptoImage(currentCoin.cryptoCoin)
                }
                dispatch(setNewTrade(newTrade))
                addTradeDatabase(newTrade, userId);
            }
            updateConfirmAdd(false)
            updateStopLoss('')
            updateTakeProfit('')
            updateLimitPrice('')
            updateTime(['', ''])


            updateFill(false)
        }
        //used when add to portfolio button is pressed
        const handleAddToPortfolio = () => {
            
            var limitPriceEmpty = (limitPrice === '' || stopLoss === '' || takeProfit === '')
            var dateLimitPriceEmpty = (limitPrice === '' || stopLoss === '' || takeProfit === '' || time[0] === '')
            var marketOrderEmpty = (stopLoss === '' || takeProfit === '')

            //check if there is a value 
            if (marketOrderEmpty && orderType === 'marketOrder') {
                console.log('Plase Fill Market Info')
                updateFill(true)
                return
            } else if (limitPriceEmpty && orderType === 'limitOrder' && !checkBox) {
                console.log('Please Fill Limit Info')
                updateFill(true)
                return
            } else if (dateLimitPriceEmpty && orderType == 'limitOrder' && checkBox) {
                console.log('Please Fill Limit Info')
                updateFill(true)
                return

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
                    {
                        (!userEmail) ? (
                            <i className="fa-solid fa-lock fa-2x"></i>
                        ) : ''
                    }
                </button>

                {(displayNotLogged) ?
                    (<div
                        className="calc_output_button_notSignedIn">
                        <i onClick={() => updateDisplayNotLogged(false)} className="fa-solid fa-location-crosshairs fa-2x"></i>

                        <p>You need to sign in !</p>
                        <p>• Sign in to add trades</p>
                        <p>• View trades on chart </p>
                        <p>• View and track portfolio (coming soon)</p>
                    </div>) : ''
                }
         
            </>
        )
    },[stopLoss, takeProfit, limitPrice, positionType, orderType, checkBox])


    return (
        <>
            <div className="calc_outer" >

                <div className="calc_infoBox">

                    <img className="cryptoImage" src={currentCoin.cryptoImage} alt="alternatetext"></img>
                    <p className="cryptoName">{currentCoin.cryptoCoin}</p>
                    <i className="fa-solid fa-angle-up"></i>

                    <div className="calc_infoBox_cryptoDropDown-content">
                        {
                            cryptoCoins.map((coin, index) => {

                                return (
                                    <div
                                        key={index}
                                        className='calc_infoBox_cryptoDropDown-content-div'
                                        onClick={() => dispatch(setCoin({
                                            cryptoCoin: coin.cryptoName,
                                            cryptoImage: coin.cryptoImage
                                        }))}>

                                        <img className="cryptoImage" src={coin.cryptoImage} alt="alternatetext"></img>
                                        <p>{coin.cryptoName}</p>
                                    </div>
                                )
                            })
                        }
                    </div>


                </div>
                <div className="calc_Pos_Button">

                    <div className="calc_btn-group">
                        <button id="marketOrder" onClick={(e)=>handleOrderType(e)} className='orderType'>Market Order</button>
                        <button id="limitOrder" onClick={(e)=>handleOrderType(e)} className='orderType'>Limit Order</button>
                    </div>


                </div>
                {
                    MarketOrderDiv()
                }
                <div className="calc_output">
                    
    
                    <ButtonAddToPortfolio />
                

                </div>
            </div>
        </>
    )


});

