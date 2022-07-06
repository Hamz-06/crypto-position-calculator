import React, { useState, useEffect } from "react";
import './SignOut.css';
import { useSelector, useDispatch } from 'react-redux'
import {signOut} from "firebase/auth"
import { auth } from "../Firebase/Firebase";
import { useRef } from "react";
//render both and show only the real one using user info 

export const SignOut = () => {



    const [displayLogin, updateDisplayLogin] = useState(false)
    const userEmail = useSelector((state) => state.userData.value)
    var currentUserEmail = useRef();


    //fuunction to sign out using firebase 
    const firebase_signOut=()=>{

        signOut(auth).then(() => {

            // Sign-out successful.(so remove signout display)
            updateDisplayLogin(false)
          }).catch((error) => {
            
          });
    }

    function click(e){
       
        var user_butt = document.getElementById("userLoginButton");
        var login_con = document.getElementsByClassName('signOut_innerbox')[0];
    
    
        if(currentUserEmail.current){

            var isOutsideClicked = login_con.contains(e.target);
            var isUserClicked = user_butt.contains(e.target);

         
            if ((!isOutsideClicked && !isUserClicked)) {
                updateDisplayLogin(false)

            }
            if (isUserClicked) {
                updateDisplayLogin(true)
            }
        }    
    }

    //add event listner 
    useEffect(()=>{
        
        document.addEventListener("click", click);

        return () => {
            document.removeEventListener('click', click)
        }

    },[displayLogin])

    useEffect(()=>{
        currentUserEmail.current=userEmail
    },[userEmail])


    return (

        <div className="signOut_outer"
            style={displayLogin ? { display: 'flex' } : { display: 'none' }}>


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
                    
                    
                   Sign Out?<a href='/' className='login_login_link' onClick={firebase_signOut}> here</a>
                </div>

            </div>
        </div>
    )
}