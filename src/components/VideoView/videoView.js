import React from 'react';

import VideosList from '../Widgets/VideosList/videosList';

const VideoView = () => {
    return (
        <div>
            <VideosList start={0} end={9} />
        </div>
    )
}

export default VideoView;