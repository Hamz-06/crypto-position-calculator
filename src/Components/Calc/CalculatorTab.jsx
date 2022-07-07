import React, { useRef } from "react"
import { useState } from 'react';
import './CalculatorTab.css'
import { useSelector } from 'react-redux'

export const CalculatorTab = (props) => {


    var marginUsd = useRef('');
    var riskSizeUsd = useRef('');
    var stopLossPercent = useRef('');
    var takeProfPercent = useRef('')
    var limitOrder = useRef('')

    const [contract, setContract] = useState('');
    const [leverage, setLeverage] = useState('');
    const [button, setButton] = useState(true);
    const [positionType, setPosType] = useState('long')  //default
    //edit certain margins when div clicked


    function updatePortfolio(event) {



        switch (event.target.id) {
            case 'inputPort':
                console.log(event.target.id)
                takeProfPercent.current = event.target.value;

                break;
            case 'marginUsd':


                marginUsd.current = event.target.value;

                break;
            case 'riskSizeUsd':

                riskSizeUsd.current = event.target.value;

                break;
            case 'stopLossPercent':

                stopLossPercent.current = event.target.value;
                break;
            case 'limitOrder':
                limitOrder.current = event.target.value;
                break;

        }



        //if margin percent and takeProfPercent is not empty we will make margin usd
        if (takeProfPercent.current === "" || marginUsd.current === "" || riskSizeUsd.current === "" || stopLossPercent.current === "") {
            // console.log("empty")


            setContract('')
            setLeverage('')
            setButton(true)
            props.onCalculate([])

            return;

        }


        var setContractCalc = riskSizeUsd.current / (stopLossPercent.current / 100)
        setContractCalc = setContractCalc.toFixed(2)
        setContract(setContractCalc)



        //calculate leverage and pass data back into mainTab (has to be timer to load data)

        if (setContractCalc === "") {
            setButton(true);
        } else {
            setButton(false)
        }


        var setLevCalc = Math.ceil(setContractCalc / marginUsd.current)
        setLeverage(setLevCalc)

        props.onCalculate([stopLossPercent.current, takeProfPercent.current])


    }
    const handleChange = (event) => {

        setPosType((event.target.value));

    };




    return (

        <>
            <div className="calc_outer" >


              


                <div className="calc_inputBox" >
                    <label style={{ color: marginUsd.current === '' ? 'transparent' : 'black' }}>margin size</label>
                    <input type="number" onChange={updatePortfolio} className="calc_input" id='marginUsd' value={marginUsd.current} placeholder='Margin Size In USD' />
                </div>



                <div className="calc_inputBox" >
                    <label style={{ color: riskSizeUsd.current === '' ? 'transparent' : 'black' }}>risk size</label>
                    <input type="number" onChange={updatePortfolio} className='calc_input' id="riskSizeUsd" value={riskSizeUsd.current} placeholder='Risk Size In USD' />
                </div>


                <div className="calc_inputBox" >
                    <label style={{ color: stopLossPercent.current === '' ? 'transparent' : 'black' }} >stop loss</label>
                    <input type="number" onChange={updatePortfolio} className='calc_input' id="stopLossPercent" value={stopLossPercent.current} placeholder='Stop Loss In Percent' />
                </div>


                <div className="calc_inputBox" >
                    <label style={{ color: takeProfPercent.current === '' ? 'transparent' : 'black' }}>take profit</label>
                    {/* <label style={takeProfPercent.current===''?{display:'none'}:{display:'block'}}>take profit</label> */}
                    <input type="number" className='calc_input' onChange={updatePortfolio} id='inputPort' value={takeProfPercent.current} placeholder='Take Profit In Percent' />
                </div>

                <div className="calc_output" >

                    <div>


                        <p>Contract <i className="fa-solid fa-copy"></i></p>
                        <button className="calc_copyButton" hidden={button} onClick={() => { navigator.clipboard.writeText(contract) }}><p className='placeHolderOutput'>{contract}</p></button>

                    </div>
                    <div className="calc_inputBox">

                        <div className="calc_radio">
                            <label>
                                <b>Long </b>
                                <input type="radio" value="long" className="calc_radio_check" checked={positionType === 'long'} onChange={handleChange} />
                            </label>
                        </div>
                        <div className="calc_radio">
                            <label>
                                <b>Short </b>
                                <input type="radio" value="short" className="calc_radio_check" checked={positionType === 'short'} onChange={handleChange} />
                            </label>
                        </div>
                    </div>


                    <div >
                        <p>leverage <i className="fa-solid fa-rocket"></i></p>
                        <p className='placeHolderOutput'>{leverage}</p>
                    </div>


                </div>
        



            </div>
        </>
    )
};
