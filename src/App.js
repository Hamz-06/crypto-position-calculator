
import './App.css';

import React, { useEffect, useState, useMemo } from 'react';
import { Homepage } from './Components/Pages/Homepage.jsx';
import { auth } from './Components/Firebase/Firebase';
import { onAuthStateChanged } from "firebase/auth";

import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { CreateAccountPage } from './Components/Pages/CreateAccountPage.jsx'

import { useSelector, useDispatch } from 'react-redux'
import { setUserData } from './Components/Storage/UserEmail'
import {createUserDataBase} from '../src/Components/Firebase/Firebase_user_info'
import {setUserId} from './Components/Storage/UserId'
import {ViewTrades_Port} from './Components/Pages/ViewTades_Port'
function App() {

  const dispatch = useDispatch();
  
  const [load, updateLoad] = useState(false)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
  
      if (user) {
       
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        dispatch(setUserData(user.email))
        dispatch(setUserId(uid))
        createUserDataBase(uid)

        // ...
      } else {
        // User is signed out
        // ...
        dispatch(setUserData(null))
        dispatch(setUserId(null))
      }
    });
    updateLoad(true)
    return unsub
  }, [])

  return (
    <>
      {/* prevents multiple refreshes due to redux user  */}
      {load ?
        (<Router basename="/">
          
         
          <Routes>

            <Route exact path='/' element={
              <Homepage />
            } />

            <Route path='/create_account' element={
              <CreateAccountPage />
            } />

            <Route path='/view_trades&potfolio' element={
              <ViewTrades_Port />
            } />

          </Routes>

        </Router>
        ) : null}


    </>

  );
}

export default App;
