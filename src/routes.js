import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./hoc/Layout/layout";
import Home from "./components/Home/home";
import ArticlePage from "./components/ArticlePage/articlePage";
import VideoPage from "./components/VideoPage/videoPage";
import NewsView from "./components/NewsView/newsView";
import VideoView from "./components/VideoView/videoView";
import SignIn from "./components/SignIn/signIn";

class Routes extends React.Component {
  render() {
    return (
      <Layout user={this.props.user}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/articles/:id" exact component={ArticlePage} />
          <Route path="/videos/:id" exact component={VideoPage} />
          <Route path="/news" exact component={NewsView} />
          <Route path="/videos" exact component={VideoView} />
          <Route path="/signin" exact component={SignIn} />
        </Switch>
      </Layout>
    );
  }
}

export default Routes;
