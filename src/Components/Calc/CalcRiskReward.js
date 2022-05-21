import { useState } from 'react';
import './CalcRiskReward.css'


function CreateRiskReward(){
    const [price, setPrice] = useState('');
    const [marginPercent, setmarginPercent] = useState();
    const [marginUsd, setmarginUsd] = useState();

    function updatePortfolioPrice(event){
        setPrice(event.target.value);
      
    }
    //set margin percent and also the margin in usd
    const updateMarginPercent=(event)=>{
        if (price!=''){

            setmarginPercent(event.target.value)
            
            var setMarginUsdCal = price/marginPercent
            setmarginUsd(setMarginUsdCal)

            
        }


        //document.getElementsByClassName("marginUsd")[0].value="12"

    }
    const updateMarginUsd=(event)=>{
        
    }



    return (
        <div className="container">
            
            <div className="outerBox">

                <div className="logoBox">
                    <h1>Position Size Calculator for Bitcoin</h1>
                </div>

                <div className="inputBox">
                    <p>Portfolio Size</p>
                    
                    <input type="number" name="name" onChange={updatePortfolioPrice}/>
                </div>

                <div className="inputBox">
                    <p>Margin Size</p>
                    <input type="number" name="name" onChange={updateMarginPercent} className="marginPercent" value={marginPercent}/>
                    <input type="number" name="name" onChange={updateMarginUsd} className="marginUsd" value={marginUsd}/>
                    
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