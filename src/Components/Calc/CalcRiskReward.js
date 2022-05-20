import './CalcRiskReward.css'
function createRiskReward(){

    return (
        <div className="container">
            
            <div className="outerBox">

                <div className="logoBox">
                    <h1>Position Size Calculator for Bitcoin</h1>
                </div>

                <div className="portfolioSize">
                    Portfolio Size
                    <input type="text" name="name" />
                </div>

                <div className="riskSize">
                    Risk Size
                    <input type="text" name="name" />

                </div>

                <div className="stopLoss">
                    Stop Loss
                    <input type="text" name="name" />
                </div>
            </div>


        </div>
    );
}
export default createRiskReward;