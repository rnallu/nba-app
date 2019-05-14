import React from 'react';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';

import './newsteam.css';

const NewsTeam = (props) => {

    const teamName= (teams,team) => {
        let data = teams.find((item)=>{
            return item.teamId===team
        });

        if(data){
            return data.name
        }
    }

        const dateFormat = (date) => {
            return moment(date).format('DD-MM-YYYY')
        }

        return (
            <div className="news_team">
                <span className="team_name">{teamName(props.teams,props.team)}</span>
                <span className="team_date"><FontAwesome name="clock"/>{" "}{dateFormat(props.date)}</span>
            </div>
        )
}

export default NewsTeam;