import { useState } from 'react';
import './CalcRiskReward.css'


function CreateRiskReward(){
    const [price, setPrice] = useState('');
    const [marginPercent, setmarginPercent] = useState('');
    const [marginUsd, setmarginUsd] = useState('');

    function updatePortfolioPrice(event){
        
        var price = document.getElementsByClassName("inputPort")[0].value;
        
        switch(event.target.className) {
            case 'inputPort':
                setPrice(event.target.value);
                
              break;
            case 'marginPercent':
                
                if (price!==''){
                    var getMarginPercent = event.target.value
                    setmarginPercent(getMarginPercent)
                
                    
        
                }
              break;
            
            case 'marginUsd':

            break;
        }
        var setMarginUsdCalculation = (marginPercent/100)*price
        setmarginUsd(setMarginUsdCalculation)
        // console.log("------")
        // console.log(event.target.value +" "+ event.target.className)
        // console.log( " price")

        if(price===""){
            //console.log("is empty")
            setmarginUsd('')
            setmarginPercent('')
        }
      
    }
    //set margin percent and also the margin in usd
 


    //document.getElementsByClassName("marginUsd")[0].value="12"

    



    return (
        <div className="container">
            
            <div className="outerBox">

                <div className="logoBox">
                    <h1>Position Size Calculator for Bitcoin</h1>
                </div>

                <div className="inputBox">
                    <p>Portfolio Size</p>
                    
                    <input type="number" className='inputPort' onChange={updatePortfolioPrice} value={price}/>
                    
                </div>

                <div className="inputBox">
                    <p>Margin Size</p>
                    <input type="number"  onChange={updatePortfolioPrice} className="marginPercent" value={marginPercent}/>
                    <input type="number" name="name" onChange={updatePortfolioPrice} className="marginUsd" value={marginUsd}/>
                    
                </div>

                <div className="inputBox">
                    <p>Risk Size</p>
                    <input type="number" name="name" />
                    <input type="number" name="name" />

                </div>

                <div className="inputBox">
                    <p>Stop Loss</p>
                    <input type="number" name="name" />
                </div>

                <div className="outputBox">
                    
                    <div>
                        <p className='placeHolderOutput'>Result</p>
                        <p>Result</p>
                    </div>
                    
                    <div>
                        <p className='placeHolderOutput'>Result</p>
                        <p>Result</p>
                    </div>

                    <div >
                        <p className='placeHolderOutput'>Result</p>
                        <p>Result</p>
                    </div>
                    
   
                                       
                </div>
            </div>


        </div>
    );
}
export default CreateRiskReward;