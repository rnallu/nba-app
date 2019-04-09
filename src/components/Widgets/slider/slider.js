import React from 'react';
import Slider from 'react-slick';
import axios from 'axios';


class SimpleSlider extends React.Component {
    state = {
        items:[]
    }
    
    componentWillMount(){
        axios.get('http://localhost:3004/articles?_start=0&_end=3')
            .then((response)=>{
                this.setState({
                    items:response.data
                })
            });
    }
    
    render() {
        
        var settings = {
            dots:true,
            arrows:false,
            infinite:true,
            speed:500,
            slidesToShow:1,
            slidestoScroll:1
        };
        
        return (
            <Slider {...settings}>         
                {this.state.items.map((item,i)=> <div key={i}>
                <img src={require(`../../../images/articles/${item.image}`)} alt="" width="100%" height="580px"/>
                </div>)}
            </Slider>
        )
    }
}

export default SimpleSlider;