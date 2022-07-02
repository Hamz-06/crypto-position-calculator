import React, { Component } from 'react';


import './Navbar.css'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { displayChart } from '../Storage/Chartclicked_data'
import './LoginModal.css'; //made easier for modal 
import { useEffect } from 'react';
import { useRef } from 'react';
import { auth } from '../Firebase/Firebase'
function Navbar() {

    const dispatch = useDispatch();
    const chartClick = useSelector((state) => state.chartClicked.value)

    const [menuClick, updateMenuClick] = useState(false)
    const [settingClick, updateSettingclick] = useState(false)
    const [displayLogin, updateDisplayLogin] = useState(false)

    const [email, updateEmail] = useState();
    const [password, updatePassword] = useState();

    const menuClicked = () => {
        // this.setState({menuClicked:!this.state.menuClicked}) 
        updateMenuClick(!menuClick)

    }
    const settingClicked = () => {
        // this.setState({settingClicked:!this.state.settingClicked})
        updateSettingclick(!settingClick)
    }

    const handleSignIn = (e) => {
        e.preventDefault()
    }




    const Value = [

        {
            title: 'Portfolio Tracker (Coming Soon)',
            url: 'google.com',
            cName: 'nav-links'
        }
    ]



    const LoginModal = () => {

        return (
            <div className="login_outer" style={displayLogin ? { display: 'flex' } : { display: 'none' }}>

                <div className="login_innerbox">


                    <div className="login_logo">
                        <h1>Log in </h1>
                    </div>


    
                    <div className="login_line">
                        
                    </div>

                    <form>

                        <div className="login_input">

                            <input type="text" className="login_email" placeholder="Email" />


                            <input type="text" className="login_password" placeholder="Password" />
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
            // <div className="log_outer_box"
            //     style={displayLogin ? { display: 'block' } : { display: 'none' }}>


            //     <div className="login_container">

            //         <div>

            //             <h1 className='login_label'>Login</h1>
            //         </div>

            //         <form>

            //             <div className="login_input">

            //                 <label className='login_label'>Email</label>
            //                 <input type="text"
            //                     className="login_userName_input"
            //                     value={email}
            //                     onChange={(e) => {
            //                         console.log("sff")
            //                         updateEmail(e.value)
            //                     }}

            //                 />

            //             </div>
            //             <div className="login_input">
            //                 <label
            //                     className='login_label'>Password</label>
            //                 <input type="text"
            //                     className="login_userName_input"
            //                     value={password}
            //                     onChange={(e) => {
            //                         console.log("sff")
            //                         updatePassword(e.value)
            //                     }}
            //                 />
            //             </div>
            //         </form>
            //         <div className='login_btn'>

            //             <button type='submit' className='login_btn_submit' onClick={handleSignIn}>log in </button>


            //         </div>
            //             <a href='/create_account' className='sign_up'> Create an account</a>

            //     </div>
            // </div>

        )
    }
    useEffect(() => {
        var login_con = document.getElementsByClassName('login_innerbox')[0];
        var user_butt = document.getElementById("userLoginBut");

        document.addEventListener("click", (e) => {

            //console.log(e.target.className)
            var isOutsideClicked = login_con.contains(e.target);
            var isUserClicked = user_butt.contains(e.target);
            console.log(e.target)
            console.log(isUserClicked)
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