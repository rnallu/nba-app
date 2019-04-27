import React from 'react';
import axios from 'axios';

import { URL } from '../../config';
import TeamInfo from '../Widgets/TeamInfo/teamInfo';

class ArticlePage extends React.Component {

    state={
        items:[],
        teams:''
    }

    componentDidMount(){
        axios.get(`${URL}/articles/${this.props.match.params.id}`)
            .then(response => {
                this.setState({
                    items:this.state.items.concat(response.data)
                })
                
            });

        if(this.state.items<1){
            axios.get(`${URL}/teams/${this.props.match.params.id}`)
                .then(response => {
                    
                    this.setState({
                        teams:response.data
                    })
                })
    
        }
    }
    
    render(){
        
        if(!this.state.teams){
            return null;
        }
        return (
            <div>
                <TeamInfo team={this.state.teams}/>
                <div style={{borderBottom:'1px solid grey',padding:'10px 0 10px 0'}}>
                    Date:<strong>{this.state.items[0].date}</strong><br/>
                    Author:<strong>{this.state.items[0].author}</strong>
                </div>
                <div>
                    {this.state.items.map((item,i)=>{
                     return <div key={i}>
                        <h3>{item.title}</h3>
                        <img src={require(`../../images/articles/${item.image}`)} alt="" width="100%" height="480px" />
                        <p>{item.body}</p>    
                    </div>
                    })}
                </div>
            </div>
        )
    }
}

export default ArticlePage;