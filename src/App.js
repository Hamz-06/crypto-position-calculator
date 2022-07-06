
import './App.css';

import React, { useEffect, useState, useMemo } from 'react';
import { Homepage } from './Components/Pages/Homepage.jsx';
import { auth } from './Components/Firebase/Firebase';
import {  onAuthStateChanged } from "firebase/auth";

import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { CreateAccountPage } from './Components/Pages/CreateAccountPage.jsx'

import { useSelector, useDispatch } from 'react-redux'
import { setUserData } from './Components/Storage/Userdata'

function App() {

  const dispatch = useDispatch();
  const userData = useSelector((state) =>state.userData.value)
  


  useEffect(()=>{

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
  
       
        dispatch(setUserData(user.email))
        // ...
      } else {
        // User is signed out
        // ...
        dispatch(setUserData(null))
      }
    });
  },[])

  return (
    <Router basename="/">
      <Routes>
        <Route exact path='/' element={



          <Homepage />


        } />

        <Route path='/create_account' element={


          <CreateAccountPage />


        } />


      </Routes>

    </Router>


  );
}

export default App;
