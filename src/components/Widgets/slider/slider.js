import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import { firebase, firebaseArticles, firebaseMapper } from "../../../firebase";
import "./slider.css";

class SimpleSlider extends React.Component {
  state = {
    items: []
  };

  componentWillMount() {
    firebaseArticles
      .limitToFirst(3)
      .once("value")
      .then(snapshot => {
        const items = firebaseMapper(snapshot);

        items.forEach((item, i) => {
          firebase
            .storage()
            .ref("images")
            .child(item.image)
            .getDownloadURL()
            .then(url => {
              items[i].image = url;

              this.setState({
                items
              });
            });
        });
      });
  }

  render() {
    const settings = {
      dots: true,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidestoScroll: 1,
      ...this.props.settings
    };

    return (
      <Slider {...settings}>
        {this.state.items.map((item, i) => (
          <div key={i} className="container">
            <img src={`${item.image}`} alt="" />
            <div className="imgTitle">
              <Link to={`/articles/${item.id}`}>{item.title}</Link>
            </div>
          </div>
        ))}
      </Slider>
    );
  }
}

export default SimpleSlider;
