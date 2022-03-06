import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { doLogout } from "../../actionCreators/LoginAction";

import AboutUsModal from "../AboutUsModal";
import AdminProfileModal from "./children/AdminProfileModal";

const AdminNavbar = (props) => {
  const history = useHistory();
  const navbarButtonList = [
    {
      icon: "icon-notification-line",
      type: "notification",
      additionalClass: "",
    },
    {
      icon: "icon-message",
      type: "chat",
      additionalClass: "",
    },
    {
      icon: "icon-gift",
      type: "gift",
      additionalClass: "",
    },
    {
      icon: "icon-user-line",
      type: "profile",
      additionalClass: "button--profile",
    },
  ];

  const [isProfileModalShow, setIsProfileModalShow] = useState(false);
  const [isAboutUsModalShow, setIsAboutUsModalShow] = useState(false);

  // ----------------------
  //  < ---- Methods ---- >
  // ----------------------

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") comingSoonNotification("Global search");
  };

  const onClickNavbarButton = (type) => {
    const capitalizeType = type.charAt(0).toUpperCase() + type.slice(1);
    if (type !== "profile") comingSoonNotification(capitalizeType);
    else toggleAdminUserProfileModal();
  };

  const onClickAdminProfileModalButton = (type) => {
    if (type === "about-developer") setAboutUsModal(true);
    else if (type === "staff") history.push("/admin/users");
    else if (type === "account-settings") props.setAccountSettingsModal(true);
    else if (type === "logout") {
      if (props.userRole === "admin") props.doLogout();
      history.push("/");
    }

    toggleAdminUserProfileModal();
  };

  const toggleAdminUserProfileModal = () => {
    setIsProfileModalShow(!isProfileModalShow);
  };

  const hideIsProfileModalShow = () => {
    setIsProfileModalShow(false);
  };

  const setAboutUsModal = (boolean) => {
    setIsAboutUsModalShow(boolean);
  };

  const comingSoonNotification = (featureName) => {
    toast.success(`${featureName} feature will come soon.`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
    });
  };

  return (
    <div className="admin-navbar">
      <div className="navbar__search-bar">
        <i className="icon-search search-icon" />
        <input
          className="search-input"
          placeholder="Search"
          onKeyDown={(event) => handleSearchKeyDown(event)}
        />
      </div>

      <div className="navbar__button-list">
        {navbarButtonList.map((button, index) => {
          return (
            <button
              type="button"
              className={"navbar-button " + button.additionalClass}
              key={index}
              onClick={() => onClickNavbarButton(button.type)}
            >
              <i className={button.icon} />
            </button>
          );
        })}
      </div>

      <AdminProfileModal
        isProfileModalShow={isProfileModalShow}
        hideIsProfileModalShow={hideIsProfileModalShow}
        onClickAdminProfileModalButton={onClickAdminProfileModalButton}
      />
      <AboutUsModal
        isDark={true}
        isAboutUsModalShow={isAboutUsModalShow}
        hideModal={() => setAboutUsModal(false)}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userRole: state.LoginReducer.userRole,
  };
};

const mapDispatchToProps = {
  doLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminNavbar);
