import React from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

const AdminProfileModal = (props) => {
  // ----------------------
  // < ---- Computed ---- >
  // ----------------------

  const adminProfileModalClass = () => {
    return props.isProfileModalShow
      ? "admin-navbar__profile-modal is-show"
      : "admin-navbar__profile-modal";
  };

  // ---------------------
  // < ---- Methods ---- >
  // ---------------------

  const hideIsProfileModalShow = (event) => {
    let getClickedClass = event.path[0] && event.path[0].className;
    const isIconLine =
      getClickedClass && getClickedClass.includes("icon-user-line");

    // sometimes the one that is clicked is the icon class so need to check
    if (isIconLine) getClickedClass = event.path[1] && event.path[1].className;

    const isProfileButton =
      getClickedClass && getClickedClass.includes("button--profile");

    if (!isProfileButton) props.hideIsProfileModalShow();
  };

  const reactClickOutside = useDetectClickOutside({
    onTriggered: hideIsProfileModalShow,
  });

  const onClickAdminProfileModalButton = (type) => {
    props.onClickAdminProfileModalButton(type);
  };

  return (
    <div className={adminProfileModalClass()} ref={reactClickOutside}>
      <button
        type="button"
        className="modal-button"
        onClick={() => onClickAdminProfileModalButton("staff")}
      >
        <i className="icon-team" />
        <p> Staff {props.isProfileModalShow} </p>
      </button>
      <button
        type="button"
        className="modal-button"
        onClick={() => onClickAdminProfileModalButton("account-settings")}
      >
        <i className="icon-user-line" />
        <p> Account Settings </p>
      </button>
      <button
        type="button"
        className="modal-button"
        onClick={() => onClickAdminProfileModalButton("about-developer")}
      >
        <i className="icon-user" />
        <p> About Developer </p>
      </button>
      <button
        type="button"
        className="modal-button"
        onClick={() => onClickAdminProfileModalButton("logout")}
      >
        <i className="icon-logout" />
        <p> Logout </p>
      </button>
    </div>
  );
};

export default AdminProfileModal;
