import React, { useState, useEffect } from "react";
import Modal from "../utilities/Modal";
import Slider from "react-slick";

import inspiration01 from "../assets/images/auth-modal/inspiration1.png";
import inspiration02 from "../assets/images/auth-modal/inspiration2.jpg";
import inspiration03 from "../assets/images/auth-modal/inspiration3.jpg";
import inspiration04 from "../assets/images/auth-modal/inspiration4.jpg";
import inspiration05 from "../assets/images/auth-modal/inspiration5.jpg";
import inspiration06 from "../assets/images/auth-modal/inspiration6.jpg";

import "../assets/styles/authmodal.scss";

const AuthModal = (props) => {
  // < ---- Conditional Component Renders ---- >
  const AuthAddonsComponent = () => {
    if (authType === "login") {
      return (
        <div className="auth-addons">
          <div className="signed-in__wrapper">
            <input type="checkbox" className="checkbox" id="check-signed" />
            <label htmlFor="check-signed" className="text">
              Keep me signed in
            </label>
          </div>
          <button type="button" className="auth__forgot-pass-button">
            Forgot Password?
          </button>
        </div>
      );
    }

    return null;
  };

  const AuthToggleComponent = () => {
    if (authType !== "login-admin") {
      return (
        <div className="auth-toggle">
          <p className="text">{authToggleTextObj().text}</p>
          <button className="toggle" onClick={toggleAuthType}>
            {authToggleTextObj().title}
          </button>
        </div>
      );
    }

    return null;
  };

  const AuthFormComponent = () => {
    if (authType === "register") {
      return (
        <div className="input-list">
          <label className="input-title" htmlFor="username">
            Username
          </label>
          <div className="input-wrapper">
            <i className="icon-user icon" />
            <input
              className="input"
              id="username"
              placeholder="Enter your username"
            />
          </div>
          <label className="input-title" htmlFor="email">
            Email Address
          </label>
          <div className="input-wrapper">
            <i className="icon-mail icon" />
            <input
              className="input"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <label className="input-title" htmlFor="phone-number">
            Phone Number
          </label>
          <div className="input-wrapper">
            <i className="icon-phone icon" />
            <input
              className="input"
              id="phone-number"
              placeholder="Enter your phone number"
            />
          </div>
          <label className="input-title" htmlFor="password">
            Password
          </label>
          <div className="input-wrapper">
            <i className="icon-key icon" />
            <input
              type={passwordInputType()}
              className="input input--password"
              id="password"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className={passwordInputIcon()}
              onClick={togglePasswordType}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="input-list">
          <label className="input-title" htmlFor="email">
            Email Address
          </label>
          <div className="input-wrapper">
            <i className="icon-mail icon" />
            <input
              className="input"
              id="email"
              placeholder="Enter your email"
            />
          </div>

          <label className="input-title" htmlFor="password">
            Password
          </label>
          <div className="input-wrapper">
            <i className="icon-key icon" />
            <input
              type={passwordInputType()}
              className="input input--password"
              id="password"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className={passwordInputIcon()}
              onClick={togglePasswordType}
            />
          </div>
        </div>
      );
    }
  };

  // < ---- States ---- >
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    fade: true,
    swipe: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };
  const inspirationList = [
    {
      image: inspiration01,
    },
    {
      image: inspiration02,
    },
    {
      image: inspiration03,
    },
    {
      image: inspiration04,
    },
    {
      image: inspiration05,
    },
    {
      image: inspiration06,
    },
  ];

  const [showPassword, setShowPassword] = useState(false);
  const [authType, setAuthType] = useState(props.type);
  // const [dataInputLogin, setDataInputLogin] = useState({
  //   email: "",
  //   password: "",
  // });

  // const handleInputLoginChange = (event) => {
  //   setDataInputLogin({
  //     ...dataInputLogin,
  //     [event.currentTarget.name]: event.currentTarget.value,
  //   });
  // };

  //  < ---- Computed ---- >
  const authTitle = () => {
    if (authType === "register") return "Create Account";
    else if (authType === "login") return "Login to your account";
    return "Login as Admin";
  };

  const authButtonText = () => {
    return authType === "register" ? "Create account" : "Login";
  };

  const authDescription = () => {
    return authType === "register"
      ? "Create account now so you can access full features here."
      : "Log in with your data that you entered during creating account.";
  };

  const authToggleTextObj = () => {
    if (authType === "register") {
      return {
        text: "Already have an account?",
        title: "Login here",
      };
    } else {
      return {
        text: "Not registered yet?",
        title: "Create a new account",
      };
    }
  };

  const passwordInputType = () => {
    return showPassword ? "text" : "password";
  };

  const passwordInputIcon = () => {
    return showPassword ? "icon-eye-slash pass-icon" : "icon-eye pass-icon";
  };

  const carouselClass = () => {
    return authType === "register"
      ? "auth-modal__section section--right section--register"
      : "auth-modal__section section--right";
  };

  //  < ---- Methods ---- >
  const hideModal = () => {
    props.hideModal();
  };

  const toggleAuthType = () => {
    const authToggleValue = authType === "login" ? "register" : "login";
    setAuthType(authToggleValue);
  };

  const togglePasswordType = () => {
    setShowPassword(!showPassword);
  };

  // < ---- UseEffect ---- >
  useEffect(() => {
    // watch changes in props.type
    setAuthType(props.type);
  }, [props.type]);

  return (
    <Modal isShow={props.isAuthModalShow} hideModal={hideModal}>
      <Modal.Header />

      <Modal.Body>
        <main className="auth-modal">
          <div className="auth-modal__section section--left">
            <div className="banner">
              <h4 className="banner-title">{authTitle()}</h4>
              <p className="banner-description">{authDescription()}</p>
            </div>

            {AuthFormComponent()}

            {AuthAddonsComponent()}

            <button type="button" className="auth-button">
              {authButtonText()}
            </button>

            {AuthToggleComponent()}
          </div>

          <div className={carouselClass()}>
            {props.isAuthModalShow ? (
              <Slider {...settings}>
                {inspirationList.map((inspiration, index) => {
                  return (
                    <img
                      className="preview-image"
                      src={inspiration.image}
                      key={index}
                      alt="previews"
                    />
                  );
                })}
              </Slider>
            ) : null}
          </div>
        </main>
      </Modal.Body>

      <Modal.Footer />
    </Modal>
  );
};

export default AuthModal;
