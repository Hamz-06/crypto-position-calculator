import React, {Component} from 'react';

import './Navbar.css'
class Navbar extends Component{

    
    state = {clicked:false}
    handleClick=()=>{
        this.setState({clicked:!this.state.clicked})
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
                <div className='menu-icon container'>
                    <div className='menu-icon' onClick={this.handleClick}>
                        <i className={this.state.clicked ? 'fas fa-times':'fas fa-bars'}></i>
                    </div>
                </div>
               
                
            

                <ul className={this.state.clicked?'nav-menu active':'nav-menu'}>     
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