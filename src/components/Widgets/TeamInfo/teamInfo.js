import React from 'react';


const TeamInfo = (props) => {
    console.log(props.team)
    return (
        <div style={{display:'flex',alignItems:'center',height:'80px',borderBottom:'1px solid grey'}}>
            <div style={{width:'10%',float:'left'}}>
            <img src={require(`../../../images/teams/${props.team.logo}`)} alt="" width="50%"/>
            </div>
            <div style={{width:'90%',float:'left'}}>
                <p>{props.team.city} {props.team.name}</p>
                <strong>W{props.team.stats[0].wins}-L{props.team.stats[0].defeats}</strong>
            </div>
                
        </div>
    )
}

export default TeamInfo;