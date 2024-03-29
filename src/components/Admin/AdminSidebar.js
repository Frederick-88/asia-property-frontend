import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useLocation, useHistory } from "react-router-dom";

import { setUserRole } from "../../actionCreators/LoginAction";

import Logo from "../../assets/images/logo.png";

const AdminSidebar = (props) => {
  const history = useHistory();
  const currentUrlPath = window.location.pathname;
  const currentUrlQuery = useLocation().search;

  const [activeButton, setActiveButton] = useState("dashboard");
  const sidebarButtonList = [
    {
      class: "icon-statistic",
      name: "Dashboard",
      value: "dashboard",
      url: "/admin",
    },
    {
      class: "icon-property",
      name: "Listings",
      value: "listings",
      url: "/admin/listings",
    },
    {
      class: "icon-team",
      name: "Users",
      value: "users",
      url: "/admin/users",
    },
    {
      class: "icon-agent",
      name: "Agents",
      value: "agents",
      url: "/admin/agents",
    },
    {
      class: "icon-money",
      name: "Inquiries",
      value: "inquiries",
      url: "/admin/inquiries",
    },
    {
      class: "icon-settings-solid",
      name: "Settings",
      value: "settings",
      url: "/admin/settings",
    },
  ];

  // ----------------------
  // < ---- Computed ---- >
  // ----------------------

  const getUserName = () => {
    return props.userRole === "visitor" ? "John Doe" : "Frederick";
  };

  // ----------------------
  //  < ---- Methods ---- >
  // ----------------------

  const isActiveButton = (button) => {
    return button === activeButton ? "button--active" : "";
  };

  useEffect(() => {
    const urlToActiveButton = {
      "/admin": "dashboard",
      "/admin/listings": "listings",
      "/admin/users": "users",
      "/admin/agents": "agents",
      "/admin/inquiries": "inquiries",
      "/admin/settings": "settings",
      "/admin/account-settings": "settings",
    };

    const getActiveButtonName = urlToActiveButton[currentUrlPath];
    if (getActiveButtonName) setActiveButton(getActiveButtonName);
  }, [currentUrlPath]);

  useEffect(() => {
    // ---------------------------------------
    // check person's role ( admin / visitor ), if it's unclear, direct to homepage that show admin login modal
    // ---------------------------------------
    const params = new URLSearchParams(currentUrlQuery);
    const hasIsVisitorQueryUrl = params.get("is_visitor");

    if (!props.userRole && hasIsVisitorQueryUrl) props.setUserRole("visitor");
    else if (props.userRole) return;
    else history.push(`/?show_admin_login_modal=true`);
  }, [currentUrlQuery, history]); // eslint-disable-line

  return (
    <div className="admin-sidebar">
      <div className="sidebar__content">
        <div className="sidebar__logo">
          <Link to="/" className="sidebar__logo">
            <img className="logo" src={Logo} alt="logo" />
            <h4 className="logo-title">Asia Property</h4>
          </Link>
        </div>

        <div className="sidebar__user-profile">
          <img
            className="profile-image"
            src="https://i.pinimg.com/originals/b9/ae/1c/b9ae1c820c0162c268611941084dd614.jpg"
            alt="logo"
          />
          <h4 className="profile-title">{getUserName()}</h4>
          <p className="profile-role">{props.userRole}</p>
        </div>

        <div className="sidebar__button-list">
          {sidebarButtonList.map((button, index) => {
            return (
              <Link
                to={button.url}
                className={"sidebar-button " + isActiveButton(button.value)}
                key={index}
              >
                <i className={"button-icon " + button.class} />
                <p className="button-text">{button.name}</p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="sidebar__reminder-box">
        <div className="sidebar__reminder-content">
          <i className="icon-shift" />
          <i className="content-icon icon-history" />
          <h4 className="title">History Available</h4>
          <p className="subtitle">Check your weekly transaction reports</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userRole: state.LoginReducer.userRole,
  };
};

const mapDispatchToProps = {
  setUserRole,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminSidebar);
