
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import FetchBalance from './Components/ApiReq/FetchBalance';
import FetchTransation from './Components/ApiReq/FetchTransaction';
import $ from 'jquery'; 

function App() {

  // var num =1.21;
  // num = num.toFixed(3);
  // console.log(num); 

  return (
    <div className="App">

      

      <Navbar />
        <div className='OuterBox'>
          hello
          <div className='PriceChartRow'>

            <div className='LeftCol'>
              left box
            </div>

            <div className='RightCol'>
              right box
            </div>

          </div>

          <div className='RecentPriceRow'>
              Price
          </div>

        </div>
      {/* <FetchBalance/> */}
      
     { <FetchTransation/> } 
      
      



      
    </div>
  );
}

export default App;
