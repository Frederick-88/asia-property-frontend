import React from "react";
import "./styles/modal.scss";

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

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static Header = Header;
  static Body = Body;
  static Footer = Footer;

  modalClass = () => {
    const classArray = ["global-dialog-modal"];
    if (this.props.isShow) {
      classArray.push("is-show");
    }

    return classArray.join(" "); // creating result like `navigation__bar nav--scrolled` so usable in react's className
  };

  maxWidthStyle = () => {
    return { maxWidth: this.props.maxWidth ? this.props.maxWidth : "1000px" };
  };

  hideModal = () => {
    this.props.hideModal();
  };

  render() {
    const { children } = this.props;
    const header = children.find((child) => child.type === Header);
    const body = children.find((child) => child.type === Body);
    const footer = children.find((child) => child.type === Footer);

    const modalClass = this.modalClass();
    const maxWidthStyle = this.maxWidthStyle();

    return (
      <div className={modalClass}>
        <div
          className="global-dialog-modal__overlay"
          onClick={() => this.hideModal()}
        />
        <header>{header ? header.props.children : null}</header>
        <div className="global-dialog-modal__content" style={maxWidthStyle}>
          {body ? body.props.children : null}
        </div>
        <footer>{footer ? footer.props.children : null}</footer>
      </div>
    );
  }
}

export default Modal;
