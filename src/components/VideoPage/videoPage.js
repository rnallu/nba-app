import React from 'react';
import axios from 'axios';

import { URL } from '../../config';
import TeamInfo from '../Widgets/TeamInfo/teamInfo';

class VideoPage extends React.Component {

    state={
        items:[],
        teams:''
    }

    componentDidMount(){
        axios.get(`${URL}/videos/${this.props.match.params.id}`)
            .then(response => {
                this.setState({items:this.state.items.concat(response.data)});
                return axios.get(`${URL}/teams/${this.state.items[0].team}`);
            })
            .then(response => {
                this.setState({teams:response.data});
            })
    }

    render(){
        if(!this.state.teams){
            return null;
        }
        return (
            <div>
                <TeamInfo team={this.state.teams}/>
                <div>
                    {this.state.items.map((item,i)=>{
                     return <div key={i}>
                        <h3>{item.title}</h3>
                        <iframe width='1080' height='720' title={item.id} src={`https://www.youtube.com/embed/${item.url}`}></iframe>
                        <p>{item.body}</p>    
                    </div>
                    })}
                </div>
            </div>
        )
    }
}

export default VideoPage;