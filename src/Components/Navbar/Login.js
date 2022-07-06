import React, { useRef } from "react";
import { auth } from '../Firebase/Firebase'
import { GoogleAuthProvider, signInWithPopup, GithubAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import './LoginModal.css'; //made easier for modal 
import { Link } from "react-router-dom";
export const Login = (props) => {

    const [email, updateEmail] = useState();
    const [password, updatePassword] = useState();
    const [error, updateError] = useState('');
    const [displayLogin, updateDisplayLogin] = useState(false)
    // const userInfo = useSelector((state)=>state.userData.value)

    const userEmail = useSelector((state) => state.userData.value)

    var currentUserEmail = useRef();

    
    
    function click(e) {
        
        var login_con = document.getElementsByClassName('login_innerbox')[0];
        var user_butt = document.getElementById("userLoginButton");

        if(!currentUserEmail.current){

            var isUserClicked = user_butt.contains(e.target);
            var isOutside = login_con.contains(e.target)
            if (!isOutside && !isUserClicked) {
                
                updateDisplayLogin(false)
            }
            if(isUserClicked){
                updateDisplayLogin(true)
            }
        }
    }
    useEffect(() => {

  
        document.addEventListener("click", click);


        return () => {
            document.removeEventListener('click', click)
        }
    }, [displayLogin])

    useEffect(() => {
        currentUserEmail.current = userEmail
    }, [userEmail])




    function handleEmail(e) {

        updateEmail(e.target.value);
    }
    function handlePassword(e) {
        updatePassword(e.target.value);
    }

    const handleaccount = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                updateDisplayLogin(false)
                updateError('')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                updateError(errorCode);
            });

    }
    function handleFacebook() {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;

                if (result) {
                    //removes login pop up
                    updateDisplayLogin(false)
                }
                // ...
            }).catch((error) => {
                console.log(error)
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(error)
                // ...
            });
    }

    function handleGithub() {
        const provider = new GithubAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                console.log(result)
                // The signed-in user info.
                const user = result.user;
                if (result) {
                    //removes login pop up
                    updateDisplayLogin(false)
                }
                // ...
            }).catch((error) => {
                console.log(error)
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GithubAuthProvider.credentialFromError(error);
                // ...
            });

    }

    return (
        <div className="login_outer" style={displayLogin ? { display: 'flex' } : { display: 'none' }}>

            <div className="login_innerbox">


                <div className="login_logo">
                    <h1>Log in </h1>
                </div>
                <div className="login_line">

                </div>

                <div className="login_signupUsing">
                    <p>Log in using :</p>
                </div>


                <div className="login_signupOptions">


                    <i onClick={handleGithub} className="fa-brands fa-github fa-2x"></i>

                    <i onClick={handleFacebook} className="fa-brands fa-google fa-2x"></i>


                </div>
                <div className="login_or">

                    <p>or sign in:</p>
                </div>




                <form onSubmit={handleaccount}>

                    <div className="login_input">

                        <div className="login_error">
                            {error}

                        </div>

                        <input type="email" className="login_email" placeholder="Email" value={email} onChange={handleEmail} required />


                        <input type="text" className="login_password" placeholder="Password" value={password} onChange={handlePassword} required />
                    </div>




                    <div className="login_signup">
                        <button type='submit' className="login_button">Log in </button>
                    </div>


                </form>

                <div className="login_login">
                    Create account?<Link to='/create_account' className='login_login_link'> click here</Link>
                </div>

            </div>
        </div>


    )

}