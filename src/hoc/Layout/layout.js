import React from 'react';

import './layout.css';
import Header from '../../components/Header/header';

const Layout = (props) => {
    
    return (
        <div>
            <Header/>
            {props.children}
            Footer
        </div>
    )
}
export default Layout;