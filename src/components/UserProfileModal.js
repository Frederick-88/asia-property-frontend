import React from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { toast } from "react-toastify";
import sampleUser from "../assets/images/sample-user.png";

const UserProfileModal = (props) => {
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

  const goToAccountSettings = () => {
    toast.success("Account settings feature will come soon.", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
    });
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
        <img className="profile-image" src={sampleUser} alt="user-profile " />
        <i className="profile-icon icon-chevron-down" />
      </button>

      <div className={userProfileModalClass()}>
        <p className="profile-username">Chen Frederick</p>
        <p className="profile-role">User</p>

        <div className="profile-container">
          <i className="icon icon-mail" />
          <p className="profile-email">frederick@asiaproperty.com</p>
        </div>
        <div className="profile-container">
          <i className="icon icon-location" />
          <p className="profile-location">Batam, Indonesia</p>
        </div>

        <hr className="divider-line" />

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

export default UserProfileModal;
