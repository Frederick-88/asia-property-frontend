import React from "react";
import Modal from "./Modal";

import "./styles/deletemodal.scss";

const DeleteModal = (props) => {
  const { isShowDeleteModal, deleteModalTitle, deleteModalText } = props;

  const onClickDeleteModalConfirmButton = () => {
    props.onClickDeleteModalConfirmButton();
    props.hideDeleteModal();
  };

  const hideDeleteModal = () => {
    props.hideDeleteModal();
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
              className="delete-modal__button button--confirm"
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

export default DeleteModal;
