import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";

import "../assets/styles/navbar.scss";
import AuthModal from "./AuthModal";
import AboutUsModal from "./AboutUsModal";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScrolled: false,
      isAboutUsModalShow: false,
      isAuthModalShow: false,
      selectedAuthType: "login",
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const position = document.documentElement;
    const scrolledThroughLimit = position.scrollTop > 120;
    this.setState({ isScrolled: scrolledThroughLimit });
  };

  navClass = () => {
    const classArray = ["navigation__bar"];
    if (this.state.isScrolled) {
      classArray.push("nav--scrolled");
    }

    return classArray.join(" "); // creating result like `navigation__bar nav--scrolled` so usable in react's className
  };

  showAuthModal = (authType) => {
    this.setState({ isAuthModalShow: true, selectedAuthType: authType });
  };

  hideAuthModal = () => {
    this.setState({ isAuthModalShow: false });
  };

  toggleAboutUsModal = (currentModalState) => {
    this.setState({ isAboutUsModalShow: !currentModalState });
  };

  render() {
    const { isAboutUsModalShow, isAuthModalShow, selectedAuthType } =
      this.state;
    // some react functions doesn't use "()" to avoid error -> read this: https://stackoverflow.com/questions/48497358/reactjs-maximum-update-depth-exceeded-error
    const { toggleAboutUsModal, showAuthModal, hideAuthModal } = this;
    const navClass = this.navClass(); // for class binding must use "()" so can call the function & get the return

    return (
      <section className={navClass}>
        <div className="navigation__list">
          <Link to="/" className="nav-image__wrapper">
            <img className="nav__image" src={Logo} alt="logo" />
            <h4 className="nav__logo-title">Asia Property</h4>
          </Link>
          <Link to="/listings" className="nav__item">
            Listing
          </Link>
          <Link to="/wishlists" className="nav__item">
            Wishlists
          </Link>
          <Link to="/our-agents" className="nav__item">
            Our Agents
          </Link>
          <button
            type="button"
            className="nav__item"
            onClick={() => toggleAboutUsModal(isAboutUsModalShow)}
          >
            About Us
          </button>
        </div>

        <div className="auth-button__list">
          <button
            type="button"
            className="nav__auth-button"
            onClick={() => showAuthModal("login")}
          >
            <i className="icon-user icon" />
            <p className="title">Sign in</p>
          </button>
          <button
            type="button"
            className="nav__auth-button auth--admin"
            onClick={() => showAuthModal("login-admin")}
          >
            <p className="title">For Admin</p>
            <i className="icon-arrow-right icon" />
          </button>
        </div>

        {/* 
          in Event/Emits from Child, Binding into Function can use "()=>" if you're going to send a param.
         */}
        <AuthModal
          isAuthModalShow={isAuthModalShow}
          type={selectedAuthType}
          hideModal={hideAuthModal}
        />
        <AboutUsModal
          isAboutUsModalShow={isAboutUsModalShow}
          hideModal={() => toggleAboutUsModal(isAboutUsModalShow)}
        />
      </section>
    );
  }
}
