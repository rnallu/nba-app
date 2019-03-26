import React from 'react';
import FontAwesome from 'react-fontawesome';

import SideNavigation from '../Header/SideNav/sideNav';

import './header.css';
class Header extends React.Component {
    state= {
        showNav:false
    }
    render () {
        return (
            <header>
                
                <SideNavigation 
                    showNav={this.state.showNav}
                    onHideNav = {()=>this.setState({showNav:false})}
                />
                <span className="menu_item">
                    <FontAwesome name="bars"
                        onClick={()=> this.setState({showNav:true})}
                    />
                </span>
                <img src="/images/nba_logo.png" alt="nba_logo"/>
                
            </header>
        )
    }
}

export default Header;