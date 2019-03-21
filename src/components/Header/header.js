import React from 'react';
import FontAwesome from 'react-fontawesome';

import './header.css';
const Header = () => {
    return (
        <header>
            <span className="menu_item">
                <FontAwesome name="bars"/>
            </span>
            <img src="/images/nba_logo.png"/>
        </header>
    )
}

export default Header;