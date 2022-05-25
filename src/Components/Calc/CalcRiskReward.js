import { useState } from 'react';
import './CalcRiskReward.css'




function CreateRiskReward(){
    const [price, setPrice] = useState('');
    const [marginUsd, setmarginUsd] = useState('');
    const [riskSizeUsd, setriskSizeUsd] = useState('');
    const [stopLossPercent, setStopLossPercent] = useState('');
    const [contract, setContract] = useState('');
    const [portAtRisk, setPortAtRisk] = useState('');
    const [leverage, setLeverage] = useState('');

    

    function updatePortfolioPrice(event){
        
  

        switch(event.target.className) {
            case 'inputPort':
                setPrice(event.target.value);
                
                break;
            case 'marginUsd':
                 
                var getMarginUsd = event.target.value;
                setmarginUsd(getMarginUsd);

                break;
            case 'riskSizeUsd':
                var getRiskSizeUsd = event.target.value;
                setriskSizeUsd(getRiskSizeUsd);

                break;
            case 'stopLossPercent':
                var getStopLossPercent = event.target.value;
                setStopLossPercent(getStopLossPercent);
                break;
        
        }
        var priceQ = document.getElementsByClassName("inputPort")[0].value;
        var marginUsdQ = document.getElementsByClassName("marginUsd")[0].value;
        var riskSizeQ = document.getElementsByClassName("riskSizeUsd")[0].value;
        var stopLossQ = document.getElementsByClassName("stopLossPercent")[0].value;
        
        
        
        
        

        //if margin percent and price is not empty we will make margin usd
        if(priceQ==="" || marginUsdQ==="" || riskSizeQ==="" || stopLossQ===""){
            console.log("empty")
            setContract('')
            setPortAtRisk('')
            setLeverage('')
            return;
            
        }
        
        
        var setContractCalc = riskSizeQ/(stopLossQ/100)
        setContractCalc = setContractCalc.toFixed(2)
        setContract(setContractCalc)

        var setPortRiskCalc = (riskSizeQ/priceQ)*100
        setPortRiskCalc=setPortRiskCalc.toFixed(2)
        setPortAtRisk(setPortRiskCalc)

        
        setTimeout(() => {
            var avg =createLeverage();
            console.log(avg+" s")
            var setLevCalc = Math.ceil(avg/marginUsdQ)
            setLeverage(setLevCalc)

        }, "1 second")
   
    }
    
    function createLeverage(){
        
        var contQ = document.getElementsByTagName('p')[5].innerHTML;
        return contQ;

    }


    return (
        <div className="container">
  
            
            <div className="outerBox">
                

                <div className="logoBox">
                    <h1>Position Size Calculator for Bitcoin <i className="fa-solid fa-bitcoin-sign"></i></h1>

                    
                    

                    
                </div>

                <div className="inputBox">
                    <p>Portfolio Size In USD <i className="fa-solid fa-wallet"></i></p>
                    
                    <input type="number" className='inputPort' onChange={updatePortfolioPrice} value={price}/>
                    
                </div>

                <div className="inputBox">
                    <p>Margin Size In USD <i className="fa-solid fa-dollar-sign"></i></p>
                    <input type="number"  onChange={updatePortfolioPrice} className="marginUsd" value={marginUsd}/>
                    
                    
                </div>

                <div className="inputBox">
                    <p>Risk Size In USD <i className="fa-solid fa-dollar-sign"></i></p>
                    <input type="number" onChange={updatePortfolioPrice} className='riskSizeUsd' value={riskSizeUsd}/>
                   

                </div>

                <div className="inputBox">
                    <p>Stop Loss In Percent <i className="fa-solid fa-percent"></i></p>
                    <input type="number" onChange={updatePortfolioPrice} className='stopLossPercent' value={stopLossPercent}/>
                </div>

                <div className="outputBox">
                    
                    <div>
                        <p className='placeHolderOutput'>Result <i className="fa-solid fa-copy"></i></p>
                        <h1>{contract}</h1>
                    </div>
                    
                    <div>
                        
                        <p className='placeHolderOutput'>Result <i className="fa-solid fa-chart-line"></i></p>
                        <h1>{portAtRisk}</h1>
                    </div>

                    <div >
                        <p className='placeHolderOutput'>Result <i className="fa-solid fa-rocket"></i></p>
                        <h1>{leverage}</h1>
                    </div>
                    
   
                                       
                </div>
            </div>


        </div>
    );
}
export default CreateRiskReward;