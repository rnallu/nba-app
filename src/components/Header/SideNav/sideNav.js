import React from "react";
import SideNav from "react-simple-sidenav";

import SideNavItems from "./sideNav_items";

const SideNavigation = props => {
  return (
    <SideNav
      showNav={props.showNav}
      onHideNav={props.onHideNav}
      navStyle={{
        backgroundColor: "#242424",
        maxWidth: "224px"
      }}
    >
      <SideNavItems {...props} />
    </SideNav>
  );
};

export default SideNavigation;
