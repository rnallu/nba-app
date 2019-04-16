import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import {URL} from '../../../config';
import './newsList.css';
import NewsTeam from '../NewsTeam/newsTeam';

class NewsList extends React.Component {

        state = {
            items:[],
            teams:[],
            start:3,
            end:6
        }
    
    componentDidMount(){
        this.request(this.state.start,this.state.end);
    }

    request = (start,end) => {

        if(this.state.teams.length<1){
            axios.get(`${URL}/teams`)
        .then((response)=>{
            this.setState({
                teams:response.data
            })
        })
        }
        
        axios.get(`${URL}/articles?_start=${start}&_end=${end}`)
            .then((response)=>{
                this.setState({
                    items:this.state.items.concat(response.data)
                })
            });
    }

    loadNews = () => {
        return this.state.items.map((item, i)=> 
            <CSSTransition 
                key={i}
                timeout={2000}
                classNames="list"
            >
                <div className="newsList_item">
                    <NewsTeam teams={this.state.teams} team={item.team} date={item.date}/>
                  <Link to={`/articles/${item.id}`}>  <h2>{item.title}</h2> </Link></div>
            </CSSTransition>
             )
    }
    
    loadMore = () => {
    this.request(this.state.end, this.state.end + 3)
    this.setState({ start: this.state.end, end: this.state.end + 3 })
    
    }

    render () {  
    
        return (
            <div>
                <TransitionGroup component="h2">
                {this.loadNews()}
                </TransitionGroup>
                <div className="loadmore" onClick={this.loadMore}>Load More</div>
            </div>
        )
    }
}
export default NewsList;