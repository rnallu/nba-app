import React from 'react';
import { Link } from 'react-router-dom';

import FontAwesome from 'react-fontawesome';
import './sideNav.css';


const SideNavItems = () => {

    const items = [
        {
            cname:'sideItems',
            icon:'home',
            text:'Home',
            link:'/'
        },
        {
            cname:'sideItems',
            icon:'newspaper',
            text:'News',
            link:'/'
        },
        {
            cname:'sideItems',
            icon:'video',
            text:'Videos',
            link:'/'
        }
    ]

    const showItems=()=>{
        return items.map((item,i)=> {
            return (
                <div key={i} className={item.cname}>
                    <Link to={item.link}>
                        <FontAwesome name={item.icon}/>
                        {item.text}
                    </Link>
                </div>
            )
        })
    }
    return (
        <div>
        {showItems()}
        </div>
    )
}

export default SideNavItems;