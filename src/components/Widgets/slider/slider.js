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
     sliderItems =()=>{ this.state.items.map((item,i)=>{
        return (
             <div key={i}>
                <img src={require( process.env.PUBLIC_URL + `/images/articles/1.jpeg`)} alt="news-img" height="580px"/>
                {console.log(item.image)}
             </div>
         )
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
                {/* <img src={ process.env.PUBLIC_URL + `/images/articles/1.jpeg`} alt="news-img" height="580px"/> */}
                {this.sliderItems()}
            </Slider>
        )
    }
}

export default SimpleSlider;