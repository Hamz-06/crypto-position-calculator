
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import FetchBalance from './Components/ApiReq/FetchBalance';
import FetchTransation from './Components/ApiReq/FetchTransaction';

function App() {
  return (
    <div className="App">
      <Navbar />
      <FetchBalance/>
      <FetchTransation/>
      
    </div>
  );
}

export default App;
