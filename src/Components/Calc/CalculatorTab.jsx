import React, { useRef } from "react"
import { useState } from 'react';
import './CalculatorTab.css'
import { cryptoCoins } from "../ApiReq/PriceData";
import { useDispatch, useSelector } from "react-redux";
import { setNewTrade } from '../Storage/NewTrade'
import { useCallback } from "react";
import { extraInfo } from "../Storage/ExtraInfo";
import { elementAcceptingRef } from "@mui/utils";

export const CalculatorTab = () => {

    const dispatch = useDispatch();
    
    const [stopLoss, updateStopLoss] = useState('')
    const [takeProfit, updateTakeProfit] = useState('')
    const [limitPrice, updateLimitPrice] = useState('')
    const [positionType, setPosType] = useState('long')
    const [orderType, updateOrderType] = useState('marketOrder')

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

                <div className="calc_inputBox" style={orderType === 'marketOrder' ? { display: 'none' } : { display: 'block' }}>
                    <label className="calc_inputLabel" style={{ color: limitPrice === '' ? 'transparent' : 'black' }} >Limit price</label>
                    <input type="number" onChange={(event) => { updateLimitPrice(event.target.value) }} className='calc_input' id="LimitPrice" value={limitPrice} placeholder='Limit Price' />
                </div>

                <div className="calc_inputBox" >
                    <label className="calc_inputLabel" style={{ color: stopLoss === '' ? 'transparent' : 'black' }} >stop loss</label>
                    <input type="number" onChange={(event) => { updateStopLoss(event.target.value) }} className='calc_input' id="stopLossPercent" value={stopLoss} placeholder='Stop Loss In Percent' />
                </div>


                <div className="calc_inputBox" >
                    <label className="calc_inputLabel" style={{ color: takeProfit === '' ? 'transparent' : 'black' }}>take profit</label>
                    {/* <label style={takeProfPercent.current===''?{display:'none'}:{display:'block'}}>take profit</label> */}
                    <input type="number" className='calc_input' onChange={(event) => { updateTakeProfit(event.target.value) }} id='takeProfPercent' value={takeProfit} placeholder='Take Profit In Percent' />
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

    // const CalcExtraInfo = () => {
    //     const extraInfo = useSelector((state) => state.extraInfo.value)

    //     return (
    //         <div className="calc_inputBox_info" >
    //             <p>Price: {(extraInfo !== null ? extraInfo.price : '')}</p>
    //             <p>StopLoss: {(extraInfo !== null ? extraInfo.takeProfit : '')}</p>
    //             <p>TakeProfit: {(extraInfo !== null ? extraInfo.stopLoss : '')}</p>
    //         </div>
    //     )
    // }
    
    const ButtonAddToPortfolio = () => {

        const extraInfo = useSelector((state) => state.extraInfo.value)
    
        const handleAddToPortfolio = () => {
            var current = new Date()
            var date = current.toLocaleDateString();
            var time = current.toLocaleTimeString();
           
            if (!extraInfo) return;
            dispatch(setNewTrade({
                posType: positionType,
                entryPrice: extraInfo.price,
                takeProfit:extraInfo.takeProfit,
                stopLoss:extraInfo.stopLoss,
                date: date,
                time:time,
                cryptoCoin:cryptoCoins[0].cryptoName
    
            }))
        }
    
        return <button className="calc_output_button" onClick={handleAddToPortfolio} >Add Trade To Portfolio</button>
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
                        <ButtonAddToPortfolio/>
                    }


                </div>

            </div>
        </>
    )


};

