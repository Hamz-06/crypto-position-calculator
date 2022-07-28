import React, { useState, } from "react"
import { useNavigate } from "react-router-dom";
import './CreateAccountPage.css'
import { Footer } from "../Footer/Footer";
import { auth } from "../Firebase/Firebase";
import { createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,GithubAuthProvider } from "firebase/auth";
import { Link } from "react-router-dom";
export function CreateAccountPage() {



    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');
    const [error, updateError] = useState('');
    //redirect when login 
    const usenavigate = useNavigate();


    function handleFacebook(){  
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
      
          if(result){
            usenavigate('/')
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

    function handleGithub(){
        const provider = new GithubAuthProvider();

        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          const credential = GithubAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
      
          // The signed-in user info.
          const user = result.user;
          if(result){
            usenavigate('/')
          }
          // ...
        }).catch((error) => {
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
    
    function handleaccount(event) {
        event.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
            .then((auth) => {
                console.log(auth)
                if(auth){
                    usenavigate('/')
                }
              
            })

            .catch((error) => {
          
                updateError(error.code)

            })
    }
    function handleEmail(e){
    
        updateEmail(e.target.value);
    }
    function handlePassword(e){
        updatePassword(e.target.value);
    }
    return (
        <>
        
        
        <div className="createAccount_outer">

            <div className="createAccount_innerbox">


                <div className="createAccount_logo">
                    <h1>Create Account</h1>
                    
                </div>


                <div className="createAccount_signupUsing">
                    <p>Create Account using :</p>
                </div>

                <div className="createAccount_signupOptions">


                    <i onClick={handleGithub} className="fa-brands fa-github fa-2x"></i>
                    
                    <i onClick={handleFacebook} className="fa-brands fa-google fa-2x"></i>


                </div>
                <div className="createAccount_or">

                    <p>or :</p>
                </div>

                <form onSubmit={handleaccount}>
                    <div className="createAccount_input">

                        <div className="createAccount_error">
                            {error}
                        </div>
                        <input type="email" className="createAccount_email" placeholder="Email" value={email} onChange={ handleEmail } required />


                        <input type="text" className="createAccount_password" placeholder="Password" value={password} onChange={handlePassword} required />
                    </div>


            

                    <div className="createAccount_signup">
                        <button type='submit' className="createAccount_button" > Create Account </button>
                    </div>


                </form>

                <div className="createAccount_login">
                    have an account?<Link to='/' className='createAccount_login_link'> log in</Link>
                </div>

            </div>
        </div>
        <Footer/>
        </>
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