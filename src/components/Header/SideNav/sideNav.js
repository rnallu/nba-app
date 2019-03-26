import React from 'react';
import SideNav from 'react-simple-sidenav';


const SideNavigation = (props) => {
    return (
        <SideNav 
            showNav={props.showNav}
            onHideNav = {props.onHideNav}
            items = {['Home','Articles','Videos']}
            itemStyle={{backgroundColor:'#232323',listStyle:'none',marginLeft:0}}
            itemHoverStyle={{backgroundColor:'yellow'}}
            navStyle={{
                backgroundColor:'#242424',
                maxWidth:'224px'
            }}
        />    
    )
}

export default SideNavigation;