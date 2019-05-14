import React from "react";

import NewsList from "../Widgets/NewsList/newsList";
// import SimpleSlider from '../Widgets/Slider/slider';

const NewsView = () => {
  return (
    <div>
      {/* <SimpleSlider settings={{dots:false}}/> */}
      <NewsList type="card" />
    </div>
  );
};

export default NewsView;
