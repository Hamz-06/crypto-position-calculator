import React, { useRef } from "react"
import { useState } from 'react';
import './CalculatorTab.css'
export const CalculatorTab = (props) => {


    var marginUsd = useRef('');
    var riskSizeUsd = useRef('');
    var stopLossPercent = useRef('');
    var takeProfPercent = useRef('')
    
    const [contract, setContract] = useState('');
    const [leverage, setLeverage] = useState('');
    const [button, setButton] = useState(true);

    

    function updatePortfolio(event){
        
        

        switch(event.target.className) {
            case 'inputPort':
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
        
        }
 


        //if margin percent and takeProfPercent is not empty we will make margin usd
        if (takeProfPercent.current==="" || marginUsd.current==="" || riskSizeUsd.current==="" || stopLossPercent.current===""){
            // console.log("empty")
            


            setButton(true)
            props.onCalculate([])
           
            return;
            
        }
        
        
        var setContractCalc = riskSizeUsd.current/(stopLossPercent.current/100)
        setContractCalc = setContractCalc.toFixed(2)
        setContract(setContractCalc)



        //calculate leverage and pass data back into mainTab (has to be timer to load data)
        
        if(setContractCalc===""){
            setButton(true);
        }else{
            setButton(false)
        }

        
        var setLevCalc = Math.ceil(setContractCalc/marginUsd.current)
        setLeverage(setLevCalc)

        props.onCalculate([stopLossPercent.current,takeProfPercent.current])
        
  
    }
    



    return(
        
        <>       
        
            <div className="logoBox">
                <h1>Position Size Calculator For Crypto <i className="fa-solid fa-bitcoin-sign"></i></h1>
    
            </div>



            <div className="inputBox">
                <p>Margin Size In USD <i className="fa-solid fa-dollar-sign"></i></p>
                <input type="number"  onChange={updatePortfolio} className="marginUsd" value={marginUsd.current}/>
            </div>

            <div className="inputBox">
                <p>Risk Size In USD <i className="fa-solid fa-dollar-sign"></i></p>
                <input type="number" onChange={updatePortfolio} className='riskSizeUsd' value={riskSizeUsd.current}/>
            </div>

            <div className="inputBox">
                <p>Stop Loss In Percent <i className="fa-solid fa-percent"></i></p>
                <input type="number" onChange={updatePortfolio} className='stopLossPercent' value={stopLossPercent.current}/>
            </div>
            
            <div className="inputBox">
                <p>Take Profit In Percent <i className="fa-solid fa-percent"></i></p>
                <input type="number" className='inputPort' onChange={updatePortfolio} value= {takeProfPercent.current}/>                
            </div>

            <div className="outputBox">
                
                <div>
                    

                    <p>Contract <i className="fa-solid fa-copy"></i></p>
                    {/* <button type='button' hidden ={false}><h1>{contract}1</h1></button> */}
                    
                    <button hidden={button} onClick={() => {navigator.clipboard.writeText(contract)}}><p className='placeHolderOutput'>{contract}</p></button>
                    
                </div>
                


                <div >
                    <p>leverage <i className="fa-solid fa-rocket"></i></p>
                    <p className='placeHolderOutput'>{leverage}</p>
                </div>
                                    
            </div>
        </>
        )
};
        