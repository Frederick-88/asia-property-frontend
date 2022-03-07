import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Modal from "./Modal";

import "./styles/deletemodal.scss";

const DeleteModal = (props) => {
  const { isShowDeleteModal, deleteModalTitle, deleteModalText } = props;

  // ----------------------
  // < ---- Computed ---- >
  // ----------------------

  const confirmButtonClass = () => {
    const cssClass = ["delete-modal__button", "button--confirm"];
    if (props.userRole === "visitor") cssClass.push("button--disabled");

    return cssClass.join(" ");
  };

  // ---------------------
  // < ---- Methods ---- >
  // ---------------------

  const onClickDeleteModalConfirmButton = () => {
    if (props.userRole !== "admin") {
      onlyForAdminNotification();
    } else {
      props.onClickDeleteModalConfirmButton();
      props.hideDeleteModal();
    }
  };

  const hideDeleteModal = () => {
    props.hideDeleteModal();
  };

  const onlyForAdminNotification = () => {
    toast.success("This action is only accessible by admin.", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
    });
  };

  return (
    <Modal
      isShow={isShowDeleteModal}
      hideModal={hideDeleteModal}
      maxWidth="500px"
    >
      <Modal.Header />

      <Modal.Body>
        <main className="delete-modal">
          <button
            type="button"
            className="delete-modal__close-button icon-close"
            title="Close Modal"
            onClick={hideDeleteModal}
          />
          <div className="modal__content">
            <h4 className="delete-modal__title">{deleteModalTitle}</h4>
            <h4 className="delete-modal__text">{deleteModalText}</h4>
          </div>
          <div className="modal__content-footer">
            <button
              type="button"
              className="delete-modal__button button--cancel"
              title="Cancel"
              onClick={hideDeleteModal}
            >
              Cancel
            </button>

            <button
              type="button"
              className={confirmButtonClass()}
              title="Confirm"
              onClick={onClickDeleteModalConfirmButton}
            >
              Confirm
            </button>
          </div>
        </main>
      </Modal.Body>

      <Modal.Footer />
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    userRole: state.LoginReducer.userRole,
  };
};

export default connect(mapStateToProps, null)(DeleteModal);
