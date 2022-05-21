import './CalcRiskReward.css'
function createRiskReward(){

    return (
        <div className="container">
            
            <div className="outerBox">

                <div className="logoBox">
                    <h1>Position Size Calculator for Bitcoin</h1>
                </div>

                <div className="inputBox">
                    <p>Portfolio Size</p>
                    
                    <input type="text" name="name" />
                </div>

                <div className="inputBox">
                    <p>Margin Size</p>
                    <input type="text" name="name" />
                    <input type="text" name="name" />
                    
                </div>

                <div className="inputBox">
                    <p>Risk Size</p>
                    <input type="text" name="name" />
                    <input type="text" name="name" />

                </div>

                <div className="inputBox">
                    <p>Stop Loss</p>
                    <input type="text" name="name" />
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
export default createRiskReward;