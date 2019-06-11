import React from "react";
import moment from "moment";

import {
  firebase,
  firebaseDB,
  firebaseTeams,
  firebaseMapper
} from "../../firebase";
import TeamInfo from "../Widgets/TeamInfo/teamInfo";

class ArticlePage extends React.Component {
  state = {
    items: [],
    teams: "",
    imageURL: ""
  };

  componentWillMount() {
    firebaseDB
      .ref(`articles/${this.props.match.params.id}`)
      .once("value")
      .then(snapshot => {
        let article = snapshot.val();

        firebaseTeams
          .orderByChild("teamId")
          .equalTo(article.team)
          .once("value")
          .then(snapshot => {
            const team = firebaseMapper(snapshot);
            let image = "";

            firebase
              .storage()
              .ref("images")
              .child(article.image)
              .getDownloadURL()
              .then(url => {
                image = url;
                this.setState({
                  items: this.state.items.concat(article),
                  teams: team,
                  imageURL: image
                });
              });
          });
      });
    // axios.get(`${URL}/articles/${this.props.match.params.id}`)
    //     .then(response => {
    //         this.setState({
    //             items:this.state.items.concat(response.data)
    //         })

    //     });

    // if(this.state.items<1){
    // axios.get(`${URL}/teams/${this.props.match.params.id}`)
    //     .then(response => {
    //         this.setState({
    //             teams:response.data
    //         })
    //     })

    //  }
  }
  dateFormat = date => {
    return moment(date).format("DD-MM-YYYY");
  };

  render() {
    if (!this.state.teams) {
      return null;
    }
    return (
      <div>
        <TeamInfo team={this.state.teams[0]} />
        <div
          style={{ borderBottom: "1px solid grey", padding: "10px 0 10px 0" }}
        >
          Date:<strong>{this.dateFormat(this.state.items[0].date)}</strong>
          <br />
          Author:<strong>{this.state.items[0].author}</strong>
        </div>
        <div>
          {this.state.items.map((item, i) => {
            return (
              <div key={i}>
                <h3>{item.title}</h3>
                <img
                  src={`${this.state.imageURL}`}
                  alt=""
                  width="auto"
                  height="480px"
                />
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.body
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ArticlePage;
