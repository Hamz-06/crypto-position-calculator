import React, { Component, useEffect, useRef } from 'react';

import './Navbar.css'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { displayChart } from '../Storage/Chartclicked_data'
import { SignOut } from './SignOut';
import { Login } from './Login.js'

function Navbar() {
    
    var loginButton = useRef();
    const dispatch = useDispatch();
    const chartClick = useSelector((state) => state.chartClicked.value)
    const userEmail = useSelector((state) => state.userData.value)

    const [menuClick, updateMenuClick] = useState(false)
    const [settingClick, updateSettingclick] = useState(false)

    


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

         




            <div className='menu-icon container' id='userLoginButton' ref={loginButton}>

                <div className='menu-icon' id='login-menu-icon'>
                    {/* shows sign in or out according to user info(taken from redux store) */}
                    <label className='fontm'>{userEmail ? 'Sign Out' : 'Sign In'}</label>
                    <i className={userEmail ? 'fa-solid fa-user-check' : 'fa-solid fa-user-xmark'}></i>
                    {/* <i class={"fa-solid " + 'fa-user-xmark'}></i> */}
                </div>

            </div>
     








            {
                //if user is logged in dont shpw log in page, if hes logged in show sign out  

               <Login button= {loginButton}/>
               

            }
            {
                <SignOut/>
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