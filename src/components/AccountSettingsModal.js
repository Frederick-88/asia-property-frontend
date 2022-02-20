import React from "react";
import { toast } from "react-toastify";

import Modal from "../utilities/Modal";

const AccountSettingsModal = (props) => {
  const onClickEditProfilePicture = () => {
    comingSoonNotification("Update profile picture");
  };

  const hideModal = () => {
    props.hideModal();
  };

  const comingSoonNotification = (featureName) => {
    toast.success(`${featureName} feature will come soon.`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
    });
  };

  return (
    <Modal
      isShow={props.isAccountSettingsModalShow}
      hideModal={hideModal}
      maxWidth="600px"
    >
      <Modal.Header />

      <Modal.Body>
        <main
          className={
            "account-settings__modal " +
            (props.isAdmin ? "modal--admin" : "modal--user")
          }
        >
          <div className="modal__content-header">
            <h4 className="header-title">Account Settings</h4>
            <button
              type="button"
              className="header__close-button icon-close"
              title="Close Modal"
              onClick={hideModal}
            />
          </div>

          <div className="modal__content">
            <div className="content__account-picture-wrapper">
              <button
                type="button"
                className="content__account-picture"
                onClick={onClickEditProfilePicture}
              >
                <img
                  className="account-picture"
                  src="https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.png"
                  alt="account-profile"
                />
                <div className="account-picture__edit-overlay">
                  <i className="icon-edit edit-button" />
                </div>
              </button>
            </div>
            <div className="content__input-list">
              <div className="input-row row--2">
                <div className="input-column">
                  <div className="input-label__container">
                    <p className="required-mark">*</p>
                    <label className="input-label" htmlFor="first_name">
                      First Name
                    </label>
                  </div>
                  <input
                    id="first_name"
                    type="text"
                    className="input"
                    placeholder="First Name"
                  />
                </div>
                <div className="input-column">
                  <label className="input-label" htmlFor="last_name">
                    Last Name
                  </label>
                  <input
                    id="last_name"
                    type="text"
                    className="input"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="input-row row--1">
                <div className="input-label__container">
                  <p className="required-mark">*</p>
                  <label className="input-label" htmlFor="phone_number">
                    Phone Number
                  </label>
                </div>
                <input
                  id="phone_number"
                  type="number"
                  className="input"
                  placeholder="Phone Number"
                />
              </div>
              <div className="input-row row--1">
                <div className="input-label__container">
                  <p className="required-mark">*</p>
                  <label className="input-label" htmlFor="email">
                    Email
                  </label>
                </div>
                <input
                  id="email"
                  type="email"
                  className="input"
                  placeholder="Email"
                />
              </div>
              <div className="input-row row--2">
                <div className="input-column">
                  <label className="input-label" htmlFor="old_password">
                    Old Password
                  </label>
                  <input
                    id="old_password"
                    type="password"
                    className="input"
                    placeholder="Old Password"
                  />
                </div>
                <div className="input-column">
                  <label className="input-label" htmlFor="new_password">
                    New Password
                  </label>
                  <input
                    id="new_password"
                    type="password"
                    className="input"
                    placeholder="New Password"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="modal__content-footer">
            <button
              type="button"
              className="header__button button--cancel"
              title="Cancel"
              onClick={hideModal}
            >
              Cancel
            </button>

            <button
              type="button"
              className="header__button button--save"
              title="Save"
              onClick={() => comingSoonNotification("Save account settings")}
            >
              Save
            </button>
          </div>
        </main>
      </Modal.Body>

      <Modal.Footer />
    </Modal>
  );
};

export default AccountSettingsModal;
