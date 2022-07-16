import React, { useRef } from "react"
import { useState } from 'react';
import './CalculatorTab.css'
import { cryptoCoins } from "../ApiReq/PriceData";
import { useDispatch } from "react-redux";
import {setNewTrade} from '../Storage/NewTrade'
export const CalculatorTab = () => {

    const dispatch = useDispatch();
    const [positionType, setPosType] = useState('long')
    const [orderType, updateOrderType] = useState('marketOrder')
    const [stopLoss, updateStopLoss] = useState('')
    const [takeProfit, updateTakeProfit] = useState('')


    const [limitPrice, updateLimitPrice] = useState('')



    //limit order or market
    const handleOrderType = (event) => {

        updateOrderType(event.target.id)

    }

    //long or short 
    const handlePosition = (event) => {

        setPosType((event.target.value));

    };

    const handleAddToPortfolio = () => {
        
        
        dispatch(setNewTrade({
            posType: positionType,
            entryPrice: 22000,
            
        }))
    }

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

                    <button className="calc_output_button" onClick={handleAddToPortfolio} >Add Trade To Portfolio</button>


                </div>




            </div>
        </>
    )


};
