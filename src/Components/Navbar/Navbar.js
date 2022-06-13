import React, {Component} from 'react';


import './Navbar.css'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { displayChart } from '../Storage/Chartclicked_data'

function Navbar(){

    const dispatch = useDispatch();
    const chartClick = useSelector((state) => state.chartClicked.value)

    const [menuClick, updateMenuClick] = useState(false)
    const [settingClick, updateSettingclick] = useState(false)
    
    
    
    const menuClicked=()=>{
        // this.setState({menuClicked:!this.state.menuClicked}) 
        updateMenuClick(!menuClick)
        
    }
    const settingClicked =()=>{
        // this.setState({settingClicked:!this.state.settingClicked})
        updateSettingclick(!settingClick)
    }




    const Value = [
        {
            title:'MetaMask Connect (Coming Soon)',
            url:'google.com',
            cName:'nav-links'
        },
        {
            title:'Portfolio Tracker (Coming Soon)',
            url:'google.com',
            cName:'nav-links'
        }
    ]        

        return(
            
            <nav className="NavbarItems">

                <div className='menu-icon container' onClick={menuClicked}>
                    <div className='menu-icon' >
                        <i className={menuClick ? 'fas fa-times':'fas fa-bars'}></i>
                    </div>
                    
                </div>

                {/* <div className='menu-icon container' onClick={this.settingClicked}>
                    <div className='menu-icon'>
                        <i className={'fa-solid fa-gear'} ></i>
                    </div>
                    
                </div> */}

                <div className='menu-icon container' onClick={()=>dispatch(displayChart(!chartClick))}>
                    <div className='menu-icon'>
                        
                        <i className={chartClick ? 'fa-solid fa-toggle-on': 'fa-solid fa-toggle-off'} ></i>
                    </div>
                </div>
                <button className="test" style={{width:50, height:50, backgroundColor:"red"}} ></button>

{/* 
                <div className='menu-icon container'>
                    <div className='menu-icon'>
                        <i className={'login'}>Login</i>
                    </div>
                    
                </div> */}

          

          
               
                
            

                <ul className={menuClick?'nav-menu active':'nav-menu'}>     
                    { Value.map((item, index)=>{
                        return(
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        ) 
                    }) }
                </ul>
               
            </nav>
        )
    
}
export default Navbar;