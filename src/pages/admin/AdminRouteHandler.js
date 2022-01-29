import React from "react";
import { connect } from "react-redux";
import { useRouteMatch, Switch, Route } from "react-router-dom";

import AdminNavbar from "../../components/Admin/AdminNavbar";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import "../../assets/styles/admin/adminnavbar.scss";
import "../../assets/styles/admin/adminsidebar.scss";

import AdminDashboard from "./AdminDashboard";
import AdminSettings from "./AdminSettings";
import AdminUsers from "./AdminUsers";
import AdminListing from "./AdminListing";

const AdminRouteHandler = (props) => {
  const routeMatcher = useRouteMatch(); // match current path ( e.g '/admin', '/admin/settings' ) depend on which route it's in
  // console.log({ routeMatcher });

  return (
    <main className="admin-site__container">
      <AdminSidebar />
      <section className="admin-content__container">
        <AdminNavbar />
        <div className="admin-content">
          <Switch>
            <Route exact path={routeMatcher.path}>
              {props.adminToken ? (
                <AdminDashboard />
              ) : (
                <h4>Bro, let's login</h4>
              )}
            </Route>

            <Route exact path={`${routeMatcher.path}/settings`}>
              {props.adminToken ? <AdminSettings /> : <h4>Bro, let's login</h4>}
            </Route>

            <Route exact path={`${routeMatcher.path}/users`}>
              {props.adminToken ? <AdminUsers /> : <h4>Bro, let's login</h4>}
            </Route>

            <Route exact path={`${routeMatcher.path}/listings`}>
              {props.adminToken ? <AdminListing /> : <h4>Bro, let's login</h4>}
            </Route>
          </Switch>
        </div>
      </section>
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    adminToken: state.LoginReducer.adminToken,
  };
};

export default connect(mapStateToProps, null)(AdminRouteHandler);
