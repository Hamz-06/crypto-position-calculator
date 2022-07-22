import React, { useRef } from "react"
import { useState } from 'react';
import './CalculatorTab.css'
import { cryptoCoins, getCryptoImage } from "../ApiReq/PriceData";
import { useDispatch, useSelector } from "react-redux";
import { setNewTrade } from '../Storage/NewTrade'
import { useCallback } from "react";
import { extraInfo } from "../Storage/ExtraInfo";
import { elementAcceptingRef } from "@mui/utils";
import { display } from "@mui/system";


export const CalculatorTab = () => {

    const dispatch = useDispatch();

    const [stopLoss, updateStopLoss] = useState('')
    const [takeProfit, updateTakeProfit] = useState('')
    const [limitPrice, updateLimitPrice] = useState('')
    const [positionType, setPosType] = useState('long')
    const [orderType, updateOrderType] = useState('marketOrder')
    const [filled, updateFill] = useState(false)

    //limit order or market
    const handleOrderType = (event) => {

        updateOrderType(event.target.id)

    }
    //long or short 
    const handlePosition = (event) => {

        setPosType((event.target.value));

    };



    const MarketOrderDiv = () => {
        return (
            <>

                <div className="calc_inputBox" style={{ display: (orderType === 'marketOrder') ? 'none' : 'block'}}>
                    <label className="calc_inputLabel" style={{ color: limitPrice === '' ? 'transparent' : 'black' }} >Limit price</label>
                    <input type="number" onChange={(event) => { updateLimitPrice(event.target.value) }} className='calc_input' id="LimitPrice" value={limitPrice} placeholder='Limit Price' 
                        style={(filled && stopLoss==='')?{border:'1px solid red'}:{color:'1px solid black'}}/>
                </div>

                <div className="calc_inputBox" >
                    <label className="calc_inputLabel" style={{ color: stopLoss === '' ? 'transparent' : 'black'}} >stop loss</label>
                    <input type="number" onChange={(event) => { updateStopLoss(event.target.value) }} className='calc_input' id="stopLossPercent" value={stopLoss} placeholder='Stop Loss In Percent'
                        style={(filled && stopLoss==='')?{border:'1px solid red'}:{color:'1px solid black'}} />
                </div>


                <div className="calc_inputBox" >
                    <label className="calc_inputLabel" style={{ color: takeProfit === '' ? 'transparent' : 'black' }}>take profit</label>
                    {/* <label style={takeProfPercent.current===''?{display:'none'}:{display:'block'}}>take profit</label> */}
                    <input type="number" className='calc_input' onChange={(event) => { updateTakeProfit(event.target.value) }} id='takeProfPercent' value={takeProfit} placeholder='Take Profit In Percent' 
                        style={(filled && stopLoss==='')?{border:'1px solid red'}:{color:'1px solid black'}}/>
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


            </>
        )
    }




    const ButtonAddToPortfolio = () => {

        //requires validation
        const extraInfo = useSelector((state) => state.extraInfo.value)
        const userEmail = useSelector((state) => state.userData.value)
        const [confirmAdd, updateConfirmAdd] = useState(false)
        const [displayNotLogged, updateDisplayNotLogged] = useState(false)
        var limitPriceEmpty = (limitPrice === '' && stopLoss === '' && takeProfit === '')
        var marketOrderEmpty = (stopLoss === '' && takeProfit === '')


        const addToPortfolioValidation = () => {
            
            const date = new Date().getTime()
            console.log('clicked add data')
            //dispatch if data is received from chart tab
            if (extraInfo) {
            dispatch(setNewTrade({
                posType: positionType,
                entryPrice: extraInfo.price,
                takeProfit: extraInfo.takeProfit,
                stopLoss: extraInfo.stopLoss,
                date: date,
                cryptoCoin: cryptoCoins[0].cryptoName,
                cryptoImage: getCryptoImage(cryptoCoins[0].cryptoName)
            }))
            }

            updateConfirmAdd(false)

        }

        const handleAddToPortfolio = () => {

            //check if there is a value 
            if (marketOrderEmpty && orderType === 'marketOrder') {
                console.log('Plase Fill Market Info')
                updateFill(true)
                return
            } else if (limitPriceEmpty && orderType === 'limitOrder') {
                console.log('Please Fill Limit Info')
                updateFill(true)
                return
            }
            //All of the values are filled and now confirmation button appears 
            
            updateConfirmAdd(true)

        
        }

        return (
            <>

                <div
                    style={(confirmAdd) ? { visibility: 'visible' } : { visibility: 'hidden' }}
                    className='calc_output_button_confirm'>
                    <button className="calc_output_button_confirm_cancel" onClick={() => updateConfirmAdd(false)}>Cancel</button>
                    <button className='calc_output_button_confirm_confirm' onClick={() => addToPortfolioValidation()}>Confirm!</button>

                </div>

                <button
                    className={(userEmail !== null) ? 'calc_output_button' : 'calc_output_button_false'}
                    onClick={() => (userEmail !== null) ? handleAddToPortfolio() : updateDisplayNotLogged(true)}>
                    <p>Add Trade To Portfolio</p>
                    <i style={(userEmail !== null) ? { display: 'none' } : {}} className="fa-solid fa-lock fa-2x"></i>
                </button>


                <div

                    style={(displayNotLogged) ? { display: 'block' } : { display: 'none' }}
                    className="calc_output_button_notSignedIn">

                    <i onClick={() => updateDisplayNotLogged(false)} className="fa-solid fa-location-crosshairs fa-2x"></i>

                    <p>You need to sign in !</p>
                    <p>• Sign in to track trades</p>
                    <p>• View and track portfolio(coming soon)</p>
                    <p>• View trades on chart(coming soon)</p>
                </div>


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
                </div>

                <div className="calc_inputField">
                    {
                        MarketOrderDiv()
                    }

                </div>

                <div className="calc_output">

                    {
                        <ButtonAddToPortfolio />
                    }


                </div>

            </div>
        </>
    )


};

