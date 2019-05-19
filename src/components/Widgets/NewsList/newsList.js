import React from "react";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import {
  firebaseArticles,
  firebaseTeams,
  firebaseMapper
} from "../../../firebase";
import "./newsList.css";
import NewsTeam from "../NewsTeam/newsTeam";

class NewsList extends React.Component {
  state = {
    items: [],
    teams: [],
    start: 3,
    end: 6
  };

  componentDidMount() {
    this.request(this.state.start, this.state.end);
  }

  request = (start, end) => {
    if (this.state.teams.length < 1) {
      firebaseTeams.once("value").then(snapshot => {
        const teams = firebaseMapper(snapshot);
        this.setState({
          teams
        });
      });
      //     axios.get(`${URL}/teams`)
      // .then((response)=>{
      //     this.setState({
      //         teams:response.data
      //     })
      // })
    }

    firebaseArticles
      .orderByChild("id")
      .startAt(start)
      .endAt(end)
      .once("value")
      .then(snapshot => {
        const data = firebaseMapper(snapshot);
        this.setState({
          items: this.state.items.concat(data)
        });
      });

    // axios.get(`${URL}/articles?_start=${start}&_end=${end}`)
    //     .then((response)=>{
    //         this.setState({
    //             items:this.state.items.concat(response.data)
    //         })
    //     });
  };

  loadMore = () => {
    this.request(this.state.end, this.state.end + 3);
    this.setState({ start: this.state.end, end: this.state.end + 3 });
  };

  renderSwitch = type => {
    switch (type) {
      case "card":
        return this.state.items.map((item, i) => (
          <CSSTransition key={i} timeout={2000} classNames="list">
            <div className="newsList_item">
              <div className="left-item">
                <img
                  src={require(`../../../images/articles/${item.image}`)}
                  width="90px"
                  alt=""
                />
              </div>
              <div className="right-item">
                <NewsTeam
                  teams={this.state.teams}
                  team={item.team}
                  date={item.date}
                />
                <Link to={`/articles/${item.id}`}>
                  {" "}
                  <h2>{item.title}</h2>{" "}
                </Link>
              </div>
            </div>
          </CSSTransition>
        ));

      default:
        return this.state.items.map((item, i) => (
          <CSSTransition key={i} timeout={2000} classNames="list">
            <div className="newsList_item">
              <NewsTeam
                teams={this.state.teams}
                team={item.team}
                date={item.date}
              />
              <Link to={`/articles/${item.id}`}>
                {" "}
                <h2>{item.title}</h2>{" "}
              </Link>
            </div>
          </CSSTransition>
        ));
    }
  };

  render() {
    return (
      <div>
        <TransitionGroup component="h2">
          {this.renderSwitch(this.props.type)}
        </TransitionGroup>
        <div className="loadmore" onClick={this.loadMore}>
          Load More
        </div>
      </div>
    );
  }
}
export default NewsList;
