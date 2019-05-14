import React from "react";

import { firebaseDB, firebaseTeams, firebaseMapper } from "../../firebase";
import TeamInfo from "../Widgets/TeamInfo/teamInfo";

class VideoPage extends React.Component {
  state = {
    items: [],
    teams: ""
  };

  componentDidMount() {
    firebaseDB
      .ref(`videos/${this.props.match.params.id}`)
      .once("value")
      .then(snapshot => {
        const video = snapshot.val();
        firebaseTeams
          .orderByChild("teamId")
          .equalTo(video.team)
          .once("value")
          .then(snapshot => {
            const team = firebaseMapper(snapshot);
            this.setState({
              items: this.state.items.concat(video),
              teams: team
            });
          });
      });
    // axios.get(`${URL}/videos/${this.props.match.params.id}`)
    //     .then(response => {
    //         this.setState({items:this.state.items.concat(response.data)});
    //         return axios.get(`${URL}/teams/${this.state.items[0].team}`);
    //     })
    //     .then(response => {
    //         this.setState({teams:response.data});
    //     })
  }

  render() {
    if (!this.state.teams) {
      return null;
    }
    return (
      <div>
        <TeamInfo team={this.state.teams[0]} />
        <div>
          {this.state.items.map((item, i) => {
            return (
              <div key={i}>
                <h3>{item.title}</h3>
                <iframe
                  width="1080"
                  height="720"
                  title={item.id}
                  src={`https://www.youtube.com/embed/${item.url}`}
                />
                <p>{item.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default VideoPage;
