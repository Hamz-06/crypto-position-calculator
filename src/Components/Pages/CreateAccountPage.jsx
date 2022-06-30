import React, { useState, useRef } from "react"
import './CreateAccountPage.css'

import { auth } from "../Firebase/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
export function CreateAccountPage() {



    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');

    function handleaccount(event) {
        event.preventDefault();


        createUserWithEmailAndPassword(auth, email, password)
            .then((auth) => {
                console.log(auth)
            })

            .catch((error) => {
                console.log(error.code)
                console.log(error.message)
            })
    }
    return (
        <div className="createAccount_outer">

            <div className="createAccount_innerbox">


                <div className="createAccount_logo">
                    <h1>Create Account</h1>
                </div>
              

                <div className="createAccount_signupUsing">
                    <p>Create Account using :</p>
                </div>

                <div className="createAccount_signupOptions">
                    

                    <i className="fa-brands fa-github fa-2x"></i>
                    <i className="fa-brands fa-facebook fa-2x"></i>
                    <i className="fa-brands fa-google fa-2x"></i>

                    
                </div>
                <div className="createAccount_or">

                    <p>or :</p>
                </div>

                <form>

                    <div className="createAccount_input">
                       
                        <input type="text" className="createAccount_email" placeholder="Email" />

                        
                        <input type="text" className="createAccount_password" placeholder="Password"/>
                    </div>
                    

                    <div className="createAccount_remember_me">
                        <label>
                            Remember Me 
                            <input type="checkbox"  className="createAccount_checkbox" value="Bike"/>

                        </label>
                    </div>

                    <div className="createAccount_signup">
                        <button type='submit' className="createAccount_button">Create Account </button>
                    </div>


                </form>

                <div className="createAccount_login">
                    have an account?<a href='/' className='createAccount_login_link'> log in</a>
                </div>

            </div>
        </div>
    )
}



/*           
 <div className="caccount_container">

                <div>

                    <h1 className='caccount_label'>Create Account</h1>
                </div>

                <form>

                    <div className="caccount_input">

                        <label className='caccount_label'>Email</label>
                        <input type="text"
                            className="caccount_userName_input"
                            value={email}
                            onChange={(e) => {
                                updateEmail(e.target.value)
                                
                            }}

                        />

                    </div>
                    <div className="caccount_input">
                        <label
                            className='caccount_label'>Password</label>
                        <input type="text"
                            className="caccount_userName_input"
                            
                            value={password}
                        
                            onChange={(e) => {

                                updatePassword(e.target.value)
                                
                            }}
                        />
                    </div>
                </form>
                <div className='caccount_btn'>

                    <button type='submit' className='caccount_btn_submit' onClick={handleaccount}>Create Account </button>
                </div>
                <a href='/' className='sign_up'>go back</a>

            </div> 
*/