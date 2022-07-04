import React, { Component } from 'react';

import { auth } from '../Firebase/Firebase'
import { GoogleAuthProvider, signInWithPopup, GithubAuthProvider, signInWithEmailAndPassword } from "firebase/auth";


import './Navbar.css'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { displayChart } from '../Storage/Chartclicked_data'
import './LoginModal.css'; //made easier for modal 
import { useEffect } from 'react';

function Navbar() {

    const dispatch = useDispatch();
    const chartClick = useSelector((state) => state.chartClicked.value)

    const [menuClick, updateMenuClick] = useState(false)
    const [settingClick, updateSettingclick] = useState(false)
    const [displayLogin, updateDisplayLogin] = useState(false)

    const [email, updateEmail] = useState();
    const [password, updatePassword] = useState();
    const [error,updateError] = useState('lol');


    const menuClicked = () => {
        // this.setState({menuClicked:!this.state.menuClicked}) 
        updateMenuClick(!menuClick)

    }
    const settingClicked = () => {
        // this.setState({settingClicked:!this.state.settingClicked})
        updateSettingclick(!settingClick)
    }


    const Value = [

        {
            title: 'Portfolio Tracker (Coming Soon)',
            url: 'google.com',
            cName: 'nav-links'
        }
    ]
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

    function handleEmail(e) {

        updateEmail(e.target.value);
    }
    function handlePassword(e) {
        updatePassword(e.target.value);
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



    const LoginModal = () => {

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


                        <div className="login_remember_me">
                            <label>
                                Remember Me
                                <input type="checkbox" className="login_checkbox" value="Bike" />

                            </label>
                        </div>

                        <div className="login_signup">
                            <button type='submit' className="login_button">Create Account </button>
                        </div>


                    </form>

                    <div className="login_login">
                        Create account?<a href='/create_account' className='login_login_link'> click here</a>
                    </div>

                </div>
            </div>


        )
    }
    useEffect(() => {
        var login_con = document.getElementsByClassName('login_innerbox')[0];
        var user_butt = document.getElementById("userLoginBut");

        document.addEventListener("click", (e) => {

            //console.log(e.target.className)
            var isOutsideClicked = login_con.contains(e.target);
            var isUserClicked = user_butt.contains(e.target);

            if ((!isOutsideClicked && !isUserClicked)) {
                updateDisplayLogin(false)

            }

        });
    }, [])



    return (

        <nav className="NavbarItems">

            <div className='menu-icon container' onClick={menuClicked}>
                <div className='menu-icon' >
                    <i className={menuClick ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>

            </div>

            {/* <div className='menu-icon container' onClick={this.settingClicked}>
                    <div className='menu-icon'>
                    <i className={'fa-solid fa-gear'} ></i>
                    </div>
                    
                </div> */}

            <div className='menu-icon container' onClick={() => dispatch(displayChart(!chartClick))}>
                <div className='menu-icon'>

                    <i className={chartClick ? 'fa-solid fa-toggle-on' : 'fa-solid fa-toggle-off'} ></i>
                </div>
            </div>
            {/* <button className="test" style={{width:50, height:50, backgroundColor:"red"}} ></button> */}



            <div className='menu-icon container'
                id='userLoginBut'
                onClick={() => {

                    updateDisplayLogin(!displayLogin)
                }

                }>

                <div className='menu-icon'>
                    <i className={'fa-solid fa-user'}></i>
                </div>

            </div>

            {
                LoginModal()
            }




            <ul className={menuClick ? 'nav-menu active' : 'nav-menu'}>
                {Value.map((item, index) => {
                    return (
                        <li key={index}>
                            <a className={item.cName} href={item.url}>
                                {item.title}
                            </a>
                        </li>
                    )
                })}
            </ul>

        </nav>
    )

}
export default Navbar;