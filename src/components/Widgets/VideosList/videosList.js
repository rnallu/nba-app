import React from 'react';
import {Link} from 'react-router-dom';

import { firebaseVideos, firebaseTeams, firebaseMapper } from '../../../firebase';
import NewsTeam from '../NewsTeam/newsTeam';
import './videosList.css';

class VideosList extends React.Component {

    state = {
        videos:[],
        teams:[],
        start:this.props.start,
        end:this.props.end
    }

    componentDidMount(){
        this.request(this.state.start,this.state.end);
    }

    request = (start,end) => {

        if(this.state.teams.length<1){
            firebaseTeams.once('value')
            .then ((snapshot)=>{
                const teams = firebaseMapper(snapshot);
                this.setState({
                    teams
                })
            })        
        
        //     axios.get(`${URL}/teams`)
        // .then((response)=>{
        //     this.setState({
        //         teams:response.data
        //     })
        // })
        }
        firebaseVideos.orderByChild('id').startAt(start).endAt(end).once('value')
        .then((snapshot)=>{
            const data = firebaseMapper(snapshot);
            this.setState({
                videos:this.state.videos.concat(data)
            })
        })

        // axios.get(`${URL}/videos?_start=${start}&_end=${end}`)
        //     .then((response)=>{
        //         this.setState({
        //             videos:this.state.videos.concat(response.data)
        //         })
        //     });
    }

    loadVideos = () => {
        return this.state.videos.map((item, i)=> 
                <div className="video_item" key={i}>
                    <Link to={`/videos/${item.id}`}>
                    <div className="videoList_container">
                        <div className="image_titleDiv"><img src={require(`../../../images/videos/${item.image}`)} alt="" height="90px" width="110px"/>
                         <img className="image_play" src={require('../../../images/play.png')} alt="play"/>
                         </div> 
                        
                        <div className="video_titleDiv">
                        <NewsTeam teams={this.state.teams} team={item.team} date={item.date}/>
                        <h2>{item.title}</h2> 
                        </div>
                    </div>
                    </Link>
                </div>
             )
    }
    
    loadMore = () => {
    this.request(this.state.end, this.state.end + 3)
    this.setState({ start: this.state.end, end: this.state.end + 3 })
    
    }

    render (){
        return (
            <div>
                <h2 className="video_heading"><strong>NBA</strong> Videos</h2>
                {this.loadVideos()}
                <div className="load_videos" onClick={this.loadMore}>Load More Videos</div>
            </div>
        )
    }

}

export default VideosList;