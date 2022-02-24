import React from "react";
import Modal from "./Modal";

import "./styles/viewmodal.scss";

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

class ViewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static Header = Header;
  static Body = Body;
  static Footer = Footer;

  // ---------------------
  // < ---- Methods ---- >
  // ---------------------

  hideViewModal = () => {
    this.props.hideViewModal(); // emit event to parent
  };

  render() {
    const { children } = this.props;
    const header = children.find((child) => child.type === Header);
    const body = children.find((child) => child.type === Body);
    const footer = children.find((child) => child.type === Footer);

    const { hideViewModal } = this;
    const { isShowViewModal, viewModalTitle } = this.props;

    return (
      <Modal
        isShow={isShowViewModal}
        hideModal={hideViewModal}
        maxWidth="800px"
      >
        <Modal.Header />

        <Modal.Body>
          <header>{header ? header.props.children : null}</header>
          <main className="view-modal">
            <button
              type="button"
              className="view-modal__close-button icon-close"
              title="Close Modal"
              onClick={hideViewModal}
            />
            <div className="modal__content">
              <h4 className="view-modal__header">{viewModalTitle}</h4>
              {body ? body.props.children : null}
            </div>
          </main>
          <footer>{footer ? footer.props.children : null}</footer>
        </Modal.Body>

        <Modal.Footer />
      </Modal>
    );
  }
}

export default ViewModal;
