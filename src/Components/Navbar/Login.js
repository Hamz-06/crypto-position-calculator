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
    const userEmail = useSelector((state) => state.userData.value)

    var displayLogin = props.display.displayLogin
    var updateDisplayLogin = props.display.updateDisplayLogin



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
    return (displayLogin && userEmail === null) ? (
        <div className="login_outer">

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
                <i onClick={()=>updateDisplayLogin(false)} className="fa-solid fa-location-crosshairs fa-2x"></i>

            </div>
        </div>


    ) : ' '

}