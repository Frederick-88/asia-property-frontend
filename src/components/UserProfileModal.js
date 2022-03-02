import React from "react";
import { useHistory } from "react-router-dom";
import { useDetectClickOutside } from "react-detect-click-outside";
import { connect } from "react-redux";

const UserProfileModal = (props) => {
  const history = useHistory();
  const userProfileType = props.userToken ? props.userData : props.adminData;

  const userProfileModalClass = () => {
    return props.isProfileModalShow
      ? "user-profile__content is-show"
      : "user-profile__content";
  };

  const hideIsProfileModalShow = () => {
    props.hideIsProfileModalShow();
  };

  const reactClickOutside = useDetectClickOutside({
    onTriggered: hideIsProfileModalShow,
  });

  const goToAdminSite = () => {
    history.push("/admin");
  };

  const goToAccountSettings = () => {
    props.goToAccountSettings();
  };

  const goToAboutDeveloper = () => {
    props.goToAboutDeveloper();
  };

  const logout = () => {
    props.logout();
  };

  return (
    <div className="auth__user-profile" ref={reactClickOutside}>
      <button
        type="button"
        className="user-profile__header"
        onClick={props.toggleIsProfileModalShow}
      >
        <img
          className="profile-image"
          src={userProfileType.image}
          alt="user-profile "
        />
        <i className="profile-icon icon-chevron-down" />
      </button>

      <div className={userProfileModalClass()}>
        <p className="profile-username">{userProfileType.username}</p>
        <p className="profile-role">{props.userRole}</p>

        <div className="profile-container">
          <i className="icon icon-mail" />
          <p className="profile-email">{userProfileType.email}</p>
        </div>
        <div className="profile-container">
          <i className="icon icon-phone" />
          <p className="profile-location">{userProfileType.phone_number}</p>
        </div>

        <hr className="divider-line" />

        {props.userRole === "admin" && (
          <button
            type="button"
            className="profile-button"
            onClick={goToAdminSite}
          >
            Go To Admin Site
          </button>
        )}
        <button
          type="button"
          className="profile-button"
          onClick={goToAccountSettings}
        >
          Account Settings
        </button>
        <button
          type="button"
          className="profile-button"
          onClick={goToAboutDeveloper}
        >
          About Developer
        </button>
        <button
          type="button"
          className="profile-button button--logout"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userRole: state.LoginReducer.userRole,
    userData: state.LoginReducer.userData,
    adminData: state.LoginReducer.adminData,
    userToken: state.LoginReducer.userToken,
  };
};

export default connect(mapStateToProps, null)(UserProfileModal);
