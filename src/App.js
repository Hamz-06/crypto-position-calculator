
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import React, { useEffect, useState, useMemo } from 'react';
import {Homepage } from './Components/Pages/Homepage.jsx';
import { Footer } from './Components/Footer/Footer.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {CreateAccountPage} from './Components/Pages/CreateAccountPage.jsx'
function App() {


  return (
    <Router>
      <Routes>
        <Route path='/' element={

          <>
            <Navbar />
            <Homepage/>
            <Footer />
          </>
        } />

        <Route path='create_account' element={
          <>
          
            <CreateAccountPage/>
            <Footer/>
          </>
        }/>


      </Routes>

    </Router>


  );
}

export default App;
