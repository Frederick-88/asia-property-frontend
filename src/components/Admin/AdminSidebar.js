import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import Logo from "../../assets/images/logo.png";

const AdminSidebar = (props) => {
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
    const params = new URLSearchParams(currentUrlQuery);
    const getIsVisitorQuery = params.get("is_visitor");
    console.log(
      currentUrlQuery,
      { getIsVisitorQuery },
      "checking ?is_visitor query"
    );
  }, [currentUrlQuery]);

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
            src="https://pbs.twimg.com/media/FJYRgy6acAYzXgj.jpg"
            alt="logo"
          />
          <h4 className="profile-title">Frederick</h4>
          <p className="profile-role">Admin</p>
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

export default AdminSidebar;
