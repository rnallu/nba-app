import React from 'react';
import FontAwesome from 'react-fontawesome';

import './newsteam.css';

const NewsTeam = (props) => {

    const teamName= (teams,team) => {
        let data = teams.find((item)=>{
            return item.id===team
        });

        if(data){
            return data.name
        }
        console.log(data)
    }
        return (
            <div className="news_team">
                <span className="team_name">{teamName(props.teams,props.team)}</span>
                <span className="team_date"><FontAwesome name="clock"/>{" "}{props.date}</span>
            </div>
        )
}

export default NewsTeam;