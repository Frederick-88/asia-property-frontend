import React from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";

import "./styles/sidemodal.scss";
import "./styles/editaddmodal.scss";

// Vue Slot in React Reference -> https://medium.com/@srph/react-imitating-vue-slots-eab8393f96fd
// Important! Header, Body & Footer are necessary part in React, removing 1 of them either in this component / on the usage will lead to an error

const Header = () => {
  return null;
};

const Body = () => {
  return null;
};

const Footer = () => {
  return null;
};

class EditAddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static Header = Header;
  static Body = Body;
  static Footer = Footer;

  // ----------------------
  // < ---- Computed ---- >
  // ----------------------

  sideModalClass = () => {
    const classArray = ["side-modal"];
    if (this.props.isShow) {
      classArray.push("is-show");
    }

    return classArray.join(" "); // creating result like `navigation__bar nav--scrolled` so usable in react's className
  };

  confirmButtonClass = () => {
    const cssClass = ["footer__button", "button--confirm"];
    if (this.props.userRole === "visitor") cssClass.push("button--disabled");

    return cssClass.join(" ");
  };

  editAddModalActionText = () => {
    const actionText =
      this.props.editAddModalObjType === "create" ? "Create" : "Update";
    const subject = this.props.subjectText;

    return `${actionText} ${subject}`;
  };

  // ---------------------
  // < ---- Methods ---- >
  // ---------------------

  onClickEditAddModalConfirmButton = () => {
    if (this.props.userRole !== "admin") this.onlyForAdminNotification();
    else this.props.onClickEditAddModalConfirmButton(); // emit event to parent
  };

  hideEditAddModal = () => {
    this.props.hideEditAddModal(); // emit event to parent
  };

  onlyForAdminNotification = () => {
    toast.success("This action is only accessible by admin.", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
    });
  };

  render() {
    const { children } = this.props;
    const header = children.find((child) => child.type === Header);
    const body = children.find((child) => child.type === Body);
    const footer = children.find((child) => child.type === Footer);

    const {
      sideModalClass,
      confirmButtonClass,
      hideEditAddModal,
      editAddModalActionText,
    } = this;

    return (
      <div className={sideModalClass()}>
        <div
          className="side-modal__overlay"
          onClick={() => hideEditAddModal()}
        />
        <header>{header ? header.props.children : null}</header>
        <button
          type="button"
          className="side-modal__close-button icon-close"
          onClick={() => hideEditAddModal()}
        />
        <div className="side-modal__content edit-add-modal">
          <h4 className="modal__title">{editAddModalActionText()}</h4>

          {body ? body.props.children : null}

          <div className="modal__footer">
            <button
              type="button"
              className="footer__button button--cancel"
              title="Cancel"
              onClick={() => hideEditAddModal()}
            >
              Cancel
            </button>

            <button
              type="button"
              className={confirmButtonClass()}
              title={editAddModalActionText()}
              onClick={() => this.onClickEditAddModalConfirmButton()}
            >
              {editAddModalActionText()}
            </button>
          </div>
        </div>
        <footer>{footer ? footer.props.children : null}</footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userRole: state.LoginReducer.userRole,
  };
};

export default connect(mapStateToProps, null)(EditAddModal);
