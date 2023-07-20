import React, { useState, useEffect } from "react";
import './SignOut.css';
import { useSelector, useDispatch } from 'react-redux'
import { signOut } from "firebase/auth"
import { auth } from "../Firebase/Firebase";
import { useRef } from "react";
import { Link } from "react-router-dom";
//render both and show only the real one using user info 

export const SignOut = (props) => {


    const userEmail = useSelector((state) => state.userData.value)
    var currentUserEmail = useRef();
    var displayLogin = props.display.displayLogin
    var updateDisplayLogin = props.display.updateDisplayLogin

    //fuunction to sign out using firebase 
    const firebase_signOut = () => {

        signOut(auth).then(() => {

            // Sign-out successful.(so remove signout display)
            updateDisplayLogin(false)
        }).catch((error) => {

        });
    }

        useEffect(() => {
            currentUserEmail.current = userEmail
        }, [userEmail])

        return displayLogin && userEmail!==null?(
            <div className="signOut_outer">

                <div className="signOut_innerbox">

                    <div className="signOut_logo">
                        <h1> My Account </h1>
                    </div>
                    <div className="login_line">

                    </div>
                    <div className="signOut_icon">

                        <i className="fa-solid fa-dragon fa-4x"></i>
                    </div>
                    <div className="signOut_email">
                        You are currenly signed in with this email address
                        <br />
                        <br />
                        {userEmail}

                    </div>

                    <div className="signOut_login">

                        Sign Out?<Link to='/create_account' className='login_login_link' onClick={firebase_signOut}> here</Link>
                    </div>
                <i onClick={()=>updateDisplayLogin(false)} className="fa-solid fa-location-crosshairs fa-2x"></i>
                </div>


            </div>
        ):''
    }