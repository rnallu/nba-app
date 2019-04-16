import React from 'react';

import SimpleSlider from '../Widgets/Slider/slider';
import NewsList from '../Widgets/NewsList/newsList';
import VideosList from '../Widgets/VideosList/videosList';

const Home = () => {
    return (
        <div>
            <SimpleSlider/>
            <NewsList/>
            <VideosList/>
        </div>
        
    )
}

export default Home;