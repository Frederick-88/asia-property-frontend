import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";

import {
  doLogin,
  doLogout,
  doRegister,
  setIsAuthModalShow,
} from "../actionCreators/LoginAction";

import { getWishlists, resetWishlistData } from "../actionCreators/UsersAction";

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
      isScrolled: false,
      withBg: false,
      isProfileModalShow: false,
      isAboutUsModalShow: false,
      selectedAuthType: "login",
      currentRoute: "",
      isOnAdminPage: false,
    };
  }

  componentDidMount() {
    const route = this.state.currentRoute;
    const withBgRoute =
      route !== "/" && route !== "/wishlists" && route !== "/our-agents";

    this.setState({ currentRoute: this.props.location.pathname });
    window.addEventListener("scroll", this.handleScroll);

    if (withBgRoute) {
      this.setState({ withBg: true });
    }
  }

  componentDidUpdate(previousProps, previousState) {
    const currentPath = this.props.location.pathname;

    // catch changes in url/route, added if() to avoid maximum stack error
    // read this for detail -> https://stackoverflow.com/questions/30528348/setstate-inside-of-componentdidupdate
    if (previousState.currentRoute !== currentPath) {
      const userId = this.props.userData && this.props.userData.id;
      const { adminToken, userToken, hasDidGetWishlist, isAuthenticated } =
        this.props;

      const route = this.state.currentRoute;
      const isAdminRoute = route.includes("/admin");
      const withBgRoute =
        route !== "/" && route !== "/wishlists" && route !== "/our-agents";

      if (isAdminRoute) {
        this.setState({ isOnAdminPage: true });
      } else {
        this.setState({ isOnAdminPage: false });
      }

      if (withBgRoute) {
        this.setState({ withBg: true });
      } else {
        this.setState({ withBg: false });
      }

      if (isAuthenticated && !hasDidGetWishlist && !adminToken) {
        this.props.getWishlists({ user_id: userId, token: userToken });
      }

      this.setState({ currentRoute: currentPath });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  AuthNavComponent = () => {
    if (this.props.isAuthenticated) {
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
  // < ---- Computed ---- >
  // ----------------------

  navClass = () => {
    const classArray = ["navigation__bar"];
    // 'withBg' gonna be 'true' when user access into other page that is not a home page
    if (this.state.isScrolled || this.state.withBg) {
      classArray.push("nav--scrolled");
    }

    return classArray.join(" "); // creating result like `navigation__bar nav--scrolled` so usable in react's className
  };

  // ---------------------
  // < ---- Methods ---- >
  // ---------------------

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
    this.setState({ selectedAuthType: authType });
    this.props.setIsAuthModalShow(true);
  };

  hideAuthModal = () => {
    this.props.setIsAuthModalShow(false);
  };

  goToAboutDeveloper = () => {
    this.toggleAboutUsModal(false);
    this.setState({ isProfileModalShow: false });
  };

  toggleAboutUsModal = (currentModalState) => {
    this.setState({ isAboutUsModalShow: !currentModalState });
  };

  goToWishlists = () => {
    if (this.props.isAuthenticated) {
      this.props.history.push({
        pathname: "/wishlists",
      });
    } else {
      toast.warn("You need to be logged in to access this feature.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    }
  };

  handleAuthInputSubmit = (data) => {
    if (data.type === "register") {
      this.props.doRegister(data);
    } else if (data.type === "login-admin") {
      this.props.doLogin(data);
    } else {
      this.props.doLogin(data);
    }
  };

  logout = () => {
    this.props.doLogout();
    this.props.resetWishlistData();
    this.setState({ isProfileModalShow: false });
  };

  render() {
    const { isAboutUsModalShow, selectedAuthType, isOnAdminPage } = this.state;

    const { isAuthModalShow, isAuthenticated } = this.props;

    // some react functions doesn't use "()" to avoid error -> read this: https://stackoverflow.com/questions/48497358/reactjs-maximum-update-depth-exceeded-error
    // note: // for function that returns must use "()" so can call the function & get the return
    const {
      toggleAboutUsModal,
      navClass,
      AuthNavComponent,
      hideAuthModal,
      handleAuthInputSubmit,
      goToWishlists,
    } = this;

    return (
      <div>
        {!isOnAdminPage ? (
          <section className={navClass()}>
            <div className="navigation__list">
              <Link to="/" className="nav-image__wrapper">
                <img className="nav__image" src={Logo} alt="logo" />
                <h4 className="nav__logo-title">Asia Property</h4>
              </Link>
              <Link to="/listings" className="nav__item">
                Listing
              </Link>
              <button
                type="button"
                className={
                  !isAuthenticated ? "nav__item nav--disabled" : "nav__item"
                }
                onClick={goToWishlists}
              >
                Wishlists
              </button>
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
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = {
  doLogin,
  doLogout,
  doRegister,
  setIsAuthModalShow,
  getWishlists,
  resetWishlistData,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.LoginReducer.isAuthenticated,
    isAuthModalShow: state.LoginReducer.isAuthModalShow,
    adminToken: state.LoginReducer.adminToken,
    userToken: state.LoginReducer.userToken,
    userData: state.LoginReducer.userData,
    hasDidGetWishlist: state.UsersReducer.hasDidGetWishlist,
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Navbar);
