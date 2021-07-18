import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { toast } from "react-toastify";

import Logo from "../assets/images/logo.png";

import "../assets/styles/navbar.scss";
import AuthModal from "./AuthModal";
import AboutUsModal from "./AboutUsModal";
import UserProfileModal from "./UserProfileModal";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isScrolled: false,
      withBg: false,
      isProfileModalShow: false,
      isAboutUsModalShow: false,
      isAuthModalShow: false,
      selectedAuthType: "login",
      currentRoute: "",
    };
  }

  componentDidMount() {
    this.setState({ currentRoute: this.props.location.pathname });
    window.addEventListener("scroll", this.handleScroll);
    const route = this.state.currentRoute;
    const withBgRoute =
      route !== "/" && route !== "/wishlists" && route !== "/our-agents";

    if (withBgRoute) {
      this.setState({ withBg: true });
    }
  }

  componentDidUpdate(previousProps, previousState) {
    const currentPath = this.props.location.pathname;
    const route = this.state.currentRoute;
    const withBgRoute =
      route !== "/" && route !== "/wishlists" && route !== "/our-agents";

    // catch changes in url/route, added if() to avoid maximum stack error
    // read this for detail -> https://stackoverflow.com/questions/30528348/setstate-inside-of-componentdidupdate
    if (previousState.currentRoute !== currentPath) {
      this.setState({ currentRoute: currentPath });

      if (withBgRoute) {
        this.setState({ withBg: true });
      } else {
        this.setState({ withBg: false });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  AuthNavComponent = () => {
    if (this.state.isAuthenticated) {
      return (
        <UserProfileModal
          isProfileModalShow={this.state.isProfileModalShow}
          toggleIsProfileModalShow={this.toggleIsProfileModalShow}
          hideIsProfileModalShow={this.hideIsProfileModalShow}
          goToAboutDeveloper={this.goToAboutDeveloper}
          logout={this.logout}
        />
      );
    } else {
      return (
        <div className="auth-button__list">
          <button
            type="button"
            className="nav__auth-button"
            onClick={() => this.showAuthModal("login")}
          >
            <i className="icon-user icon" />
            <p className="title">Sign in</p>
          </button>
          <button
            type="button"
            className="nav__auth-button auth--admin"
            onClick={() => this.showAuthModal("login-admin")}
          >
            <p className="title">For Admin</p>
            <i className="icon-arrow-right icon" />
          </button>
        </div>
      );
    }
  };

  // ----------------------
  //  < ---- Computed ---- >
  // ----------------------

  navClass = () => {
    const classArray = ["navigation__bar"];
    // 'withBg' gonna be 'true' when user access into other page that is not a home page
    if (this.state.isScrolled || this.state.withBg) {
      classArray.push("nav--scrolled");
    }

    return classArray.join(" "); // creating result like `navigation__bar nav--scrolled` so usable in react's className
  };

  // ----------------------
  //  < ---- Methods ---- >
  // ----------------------

  toggleIsProfileModalShow = () => {
    this.setState({ isProfileModalShow: !this.state.isProfileModalShow });
  };

  hideIsProfileModalShow = () => {
    this.setState({ isProfileModalShow: false });
  };

  handleScroll = () => {
    const position = document.documentElement;
    const scrolledThroughLimit = position.scrollTop > 90;
    this.setState({ isScrolled: scrolledThroughLimit });
  };

  showAuthModal = (authType) => {
    this.setState({ isAuthModalShow: true, selectedAuthType: authType });
  };

  hideAuthModal = () => {
    this.setState({ isAuthModalShow: false });
  };

  goToAboutDeveloper = () => {
    this.toggleAboutUsModal(false);
    this.setState({ isProfileModalShow: false });
  };

  toggleAboutUsModal = (currentModalState) => {
    this.setState({ isAboutUsModalShow: !currentModalState });
  };

  handleAuthInputSubmit = (data) => {
    if (data.type === "register") {
      toast.success("You've successfully created a new account.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    } else if (data.type === "login-admin") {
      this.setState({ isAuthenticated: true, isAuthModalShow: false });
      toast.success("You've successfully logged in as an admin.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    } else {
      this.setState({ isAuthenticated: true, isAuthModalShow: false });
      toast.success("You've successfully logged in.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    }
  };

  logout = () => {
    this.setState({ isAuthenticated: false, isProfileModalShow: false });
    toast.success("You've successfully logged out.", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
    });
  };

  render() {
    const { isAboutUsModalShow, isAuthModalShow, selectedAuthType } =
      this.state;

    // some react functions doesn't use "()" to avoid error -> read this: https://stackoverflow.com/questions/48497358/reactjs-maximum-update-depth-exceeded-error
    // note: // for function that returns must use "()" so can call the function & get the return
    const {
      toggleAboutUsModal,
      navClass,
      AuthNavComponent,
      hideAuthModal,
      handleAuthInputSubmit,
    } = this;

    return (
      <section className={navClass()}>
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

        {AuthNavComponent()}

        {/* 
          in Event/Emits from Child, Binding into Function can use "()=>" if you're going to send a param.
         */}
        <AuthModal
          isAuthModalShow={isAuthModalShow}
          type={selectedAuthType}
          hideModal={hideAuthModal}
          handleAuthInputSubmit={handleAuthInputSubmit}
        />
        <AboutUsModal
          isAboutUsModalShow={isAboutUsModalShow}
          hideModal={() => toggleAboutUsModal(isAboutUsModalShow)}
        />
      </section>
    );
  }
}

export default withRouter(Navbar);
