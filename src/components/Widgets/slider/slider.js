import React from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import {Link} from 'react-router-dom';

import {URL} from '../../../config';

import './slider.css';

class SimpleSlider extends React.Component {
    state = {
        items:[]
    }
    
    componentWillMount(){
        axios.get(`${URL}/articles?_start=0&_end=3`)
            .then((response)=>{
                this.setState({
                    items:response.data
                })
            });
    }
    
    render() {
           const settings = {
                dots:true,
                arrows:false,
                infinite:true,
                speed:500,
                slidesToShow:1,
                slidestoScroll:1,
                ...this.props.settings
            }
        
        return (
            <Slider {...settings}>         
                {this.state.items.map((item,i)=> <div key={i} className="container">
                <img src={require(`../../../images/articles/${item.image}`)} alt="" width="100%" height="580px"/>
                <div className="imgTitle"><Link to={`/articles/${item.id}`}>{item.title}</Link></div>
                </div>)}
            </Slider>
        )
    }
}

export default SimpleSlider;