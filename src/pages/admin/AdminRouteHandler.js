import React from "react";
import { connect } from "react-redux";
import { useRouteMatch, Switch, Route } from "react-router-dom";

import AdminDashboard from "./AdminDashboard";
import AdminSettings from "./AdminSettings";
import AdminUsers from "./AdminUsers";
import AdminListing from "./AdminListing";

const AdminRouteHandler = (props) => {
  const routeMatcher = useRouteMatch(); // match current path ( e.g '/admin', '/admin/settings' ) depend on which route it's in
  // console.log({ routeMatcher });

  return (
    <div>
      <Switch>
        <Route exact path={routeMatcher.path}>
          {props.tokenAdmin ? <AdminDashboard /> : <h4>Bro, let's login</h4>}
        </Route>

        <Route exact path={`${routeMatcher.path}/settings`}>
          {props.tokenAdmin ? <AdminSettings /> : <h4>Bro, let's login</h4>}
        </Route>

        <Route exact path={`${routeMatcher.path}/users`}>
          {props.tokenAdmin ? <AdminUsers /> : <h4>Bro, let's login</h4>}
        </Route>

        <Route exact path={`${routeMatcher.path}/listings`}>
          {props.tokenAdmin ? <AdminListing /> : <h4>Bro, let's login</h4>}
        </Route>
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    adminToken: state.LoginReducer.adminToken,
  };
};

export default connect(mapStateToProps, null)(AdminRouteHandler);
