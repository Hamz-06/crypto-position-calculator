
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import FetchBalance from './Components/ApiReq/FetchBalance';
import FetchTransation from './Components/ApiReq/FetchTransaction';
import MainTab from './Components/Calc/MainTab';
import $ from 'jquery'; 

function App() {

  // var num =1.21;
  // num = num.toFixed(3);
  // console.log(num); 

  return (
    <div className="App">

      

      <Navbar />
      <MainTab />
      

      
      



      
    </div>
  );
}

export default App;
