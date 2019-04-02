import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Layout from "./hoc/Layout/layout";
import Home from "./components/Home/home";

class Routes extends React.Component {
  render() {
    return (
      <Layout>
        <BrowserRouter>
          <Route path="/" component={Home} />
        </BrowserRouter>
      </Layout>
    );
  }
}

export default Routes;
