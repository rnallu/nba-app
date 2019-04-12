import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import {URL} from '../../../config';
import './newsList.css';

class NewsList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            items:[],
            start:3,
            end:6
        }
    }
    componentWillMount(){
        this.request(3,6);
    }

    request = (start,end) => {
        axios.get(`${URL}/articles?_start=${start}&_end=${end}`)
            .then((response)=>{
                this.setState({
                    items:this.state.items.concat(response.data)
                })
            });
    }

    loadNews = () => {
        return this.state.items.map((item, i)=> 
            <div key={i}>
                <div className="newsList_item">
                  <Link to={`/articles/${item.id}`}>  <h2>{item.title}</h2> </Link></div>
            </div> )
    }

    loadMore = () => {
        this.setState({start:this.state.end});
        this.setState({end:this.state.start+3});
        this.request(this.state.start,this.state.end);
    }
    render () {  
    
        return (
            <div>
                {this.loadNews()}
                <div className="loadmore" onClick={this.loadMore}>Load More</div>
            </div>
        )
    }
}
export default NewsList;