import React, {Component} from 'react';

import './Navbar.css'
class Navbar extends Component{

    
    state = {menuClicked:false,
            settingClicked:false
        }

    menuClicked=()=>{
        this.setState({menuClicked:!this.state.menuClicked})
    }
    settingClicked =()=>{
        this.setState({settingClicked:!this.state.settingClicked})
        console.log(this.state.settingClicked)
    }
        

    render(){
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

                <div className='menu-icon container' onClick={this.menuClicked}>
                    <div className='menu-icon' >
                        <i className={this.state.menuClicked ? 'fas fa-times':'fas fa-bars'}></i>
                    </div>
                    
                </div>
                <div className='menu-icon container' onClick={this.settingClicked}>
                    <div className='menu-icon'>
                        <i className={'fa-solid fa-gear'} ></i>
                    </div>
                    
                </div>

          

          
               
                
            

                <ul className={this.state.menuClicked?'nav-menu active':'nav-menu'}>     
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
}
export default Navbar;