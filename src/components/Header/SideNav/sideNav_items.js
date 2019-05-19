import React from "react";
import { Link, withRouter } from "react-router-dom";
import { firebase } from "../../../firebase";

import FontAwesome from "react-fontawesome";
import "./sideNav.css";

const SideNavItems = props => {
  const items = [
    {
      cname: "sideItems", //cname is for Class Names
      icon: "home",
      text: "Home",
      link: "/",
      login: ""
    },
    {
      cname: "sideItems",
      icon: "newspaper",
      text: "News",
      link: "/news",
      login: ""
    },
    {
      cname: "sideItems",
      icon: "video",
      text: "Videos",
      link: "/videos",
      login: ""
    },
    {
      cname: "sideItems",
      icon: "sign-in-alt",
      text: "Sign-In",
      link: "/signin",
      login: true
    },
    {
      cname: "sideItems",
      icon: "sign-in-alt",
      text: "Dashboard",
      link: "/dashboard",
      login: false
    },
    {
      cname: "sideItems",
      icon: "sign-out-alt",
      text: "Sign-Out",
      link: "/signout",
      login: false
    }
  ];

  const element = (item, i) => {
    return (
      <div key={i} className={item.cname}>
        <Link to={item.link}>
          <FontAwesome name={item.icon} />
          {item.text}
        </Link>
      </div>
    );
  };

  const navCondition = (item, i) => {
    let template = null;
    if (props.user === null && item.login) {
      template = element(item, i);
    }

    if (props.user !== null && !item.login) {
      if (item.link === "/signout") {
        template = (
          <div
            key={i}
            className={item.cname}
            onClick={() => {
              firebase
                .auth()
                .signOut()
                .then(() => {
                  props.history.push("/");
                });
            }}
          >
            <FontAwesome name={item.icon} />
            {item.text}
          </div>
        );
      } else {
        template = element(item, i);
      }
    }
    return template;
  };

  const showItems = () => {
    return items.map((item, i) => {
      return item.login !== "" ? navCondition(item, i) : element(item, i);
    });
  };

  return (
    <div>
      {console.log(props.user)}
      {showItems()}
    </div>
  );
};

export default withRouter(SideNavItems);
