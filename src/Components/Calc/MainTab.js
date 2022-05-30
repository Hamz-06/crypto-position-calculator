
import './MainTab.css'
import {CalculatorTab} from './CalculatorTab'
import {ChartTab} from './ChartTab'

function MainTab(){


    return (
       
      
        <div className="container">
             
            <div className="outerBox">

                <CalculatorTab />
                
            </div>

            <div className="outerBox">
            <ChartTab />
            

            </div> 
        </div>
       


    );
}
export default MainTab;