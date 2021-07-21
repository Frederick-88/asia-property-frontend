import React, { useState, useEffect } from "react";
import Modal from "../utilities/Modal";
import Slider from "react-slick";
import { toast } from "react-toastify";

import inspiration01 from "../assets/images/auth-modal/inspiration1.png";
import inspiration02 from "../assets/images/auth-modal/inspiration2.jpg";
import inspiration03 from "../assets/images/auth-modal/inspiration3.jpg";
import inspiration04 from "../assets/images/auth-modal/inspiration4.jpg";
import inspiration05 from "../assets/images/auth-modal/inspiration5.jpg";
import inspiration06 from "../assets/images/auth-modal/inspiration6.jpg";

import "../assets/styles/authmodal.scss";

const AuthModal = (props) => {
  // -------------------------------------------
  // < ---- Conditional Component Renders ---- >
  // -------------------------------------------
  const AuthAddonsComponent = () => {
    if (authType === "login") {
      return (
        <div className="auth-addons">
          <div className="signed-in__wrapper">
            <input
              type="checkbox"
              className="checkbox"
              id="check-signed"
              checked={stayAuthenticated}
              onChange={() => setStayAuthenticated(!stayAuthenticated)}
            />
            <label htmlFor="check-signed" className="text">
              Keep me signed in
            </label>
          </div>
          <button
            type="button"
            className="auth__forgot-pass-button"
            onClick={forgotPassword}
          >
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

  const ExtraAuthButton = () => {
    if (authType === "login-admin") {
      return (
        <button
          type="button"
          className="auth-button button--admin"
          onClick={proceedAsVisitor}
        >
          <p>Proceed as Visitor</p>
          <i className="icon-checkmark" />
        </button>
      );
    }

    return null;
  };

  const AuthFormComponent = () => {
    if (authType === "register") {
      return (
        <div className="form__input-list">
          <label className="input-title" htmlFor="username">
            Username
          </label>
          <div className="input-wrapper">
            <i className="icon-user icon" />
            <input
              className="input"
              name="username"
              id="username"
              placeholder="Enter your username"
              value={authInputData.username}
              onChange={(event) => handleAuthInputChange(event)}
            />
          </div>
          <label className="input-title" htmlFor="email">
            Email Address
          </label>
          <div className="input-wrapper">
            <i className="icon-mail icon" />
            <input
              type="email"
              className="input"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={authInputData.email}
              onChange={(event) => handleAuthInputChange(event)}
            />
          </div>
          <label className="input-title" htmlFor="phone-number">
            Phone Number
          </label>
          <div className="input-wrapper">
            <i className="icon-phone icon" />
            <input
              type="number"
              className="input"
              name="phone_number"
              id="phone-number"
              placeholder="Enter your phone number"
              value={authInputData.phone_number}
              onChange={(event) => handleAuthInputChange(event)}
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
              name="password"
              id="password"
              placeholder="Enter your password"
              value={authInputData.password}
              onChange={(event) => handleAuthInputChange(event)}
            />
            <button
              type="button"
              tabIndex="1"
              className={passwordInputIcon()}
              onClick={togglePasswordType}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="form__input-list">
          <label className="input-title" htmlFor="email">
            Email Address
          </label>
          <div className="input-wrapper">
            <i className="icon-mail icon" />
            <input
              type="email"
              className="input"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={authInputData.email}
              onChange={(event) => handleAuthInputChange(event)}
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
              name="password"
              id="password"
              placeholder="Enter your password"
              value={authInputData.password}
              onChange={(event) => handleAuthInputChange(event)}
            />
            <button
              type="button"
              tabIndex="1"
              className={passwordInputIcon()}
              onClick={togglePasswordType}
            />
          </div>
        </div>
      );
    }
  };

  // ---------------------
  // < ---- States ---- >
  // ---------------------
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

  const [stayAuthenticated, setStayAuthenticated] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [authType, setAuthType] = useState(props.type);
  const [authInputData, setAuthInputData] = useState({
    email: "",
    password: "",
    username: "",
    phone_number: "",
  });

  // -----------------------
  //  < ---- Computed ---- >
  // -----------------------
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

  // ----------------------
  //  < ---- Methods ---- >
  // ----------------------
  const hideModal = () => {
    props.hideModal();
  };

  const toggleAuthType = () => {
    const authToggleValue = authType === "login" ? "register" : "login";
    setAuthType(authToggleValue);
    resetAuthInput();
  };

  const togglePasswordType = () => {
    setShowPassword(!showPassword);
  };

  const resetAuthInput = () => {
    setAuthInputData({
      email: "",
      password: "",
      username: "",
      phone_number: "",
    });
  };

  const handleAuthInputChange = (event) => {
    setAuthInputData({
      ...authInputData,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleAuthInputSubmit = () => {
    let isValidForm = false;
    const { email, password, username, phone_number } = authInputData;

    // check existency
    if (authType === "register") {
      isValidForm = !!email && !!password && !!username && !!phone_number;
    } else {
      isValidForm = !!email && !!password;
    }

    if (!isValidForm) {
      toast.error("Please fill all the form.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      return;
    }

    props.handleAuthInputSubmit({ type: authType, ...authInputData });
    resetAuthInput();
  };

  const forgotPassword = () => {
    toast.success("Forgot password feature will come soon.", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
    });
  };

  const proceedAsVisitor = () => {
    toast.success(
      "Proceed as visitor for admin page feature will be available around late Q3 2021.",
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 7000,
      }
    );
  };

  // -----------------------
  // < ---- UseEffect ---- >
  // -----------------------
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

            <button
              type="button"
              className="auth-button"
              onClick={handleAuthInputSubmit}
            >
              {authButtonText()}
            </button>

            {ExtraAuthButton()}

            {AuthToggleComponent()}
          </div>

          <div className={carouselClass()}>
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
          </div>
        </main>
      </Modal.Body>

      <Modal.Footer />
    </Modal>
  );
};

export default AuthModal;
