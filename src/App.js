
import './App.css';

import React, { useEffect, useState, useMemo } from 'react';
import { Homepage } from './Components/Pages/Homepage.jsx';
import { auth } from './Components/Firebase/Firebase';
import {  onAuthStateChanged } from "firebase/auth";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CreateAccountPage } from './Components/Pages/CreateAccountPage.jsx'

function App() {

  useEffect(()=>{

  },[])

  return (
    <Router>
      <Routes>
        <Route path='/' element={



          <Homepage />


        } />

        <Route path='create_account' element={


          <CreateAccountPage />


        } />


      </Routes>

    </Router>


  );
}

export default App;
