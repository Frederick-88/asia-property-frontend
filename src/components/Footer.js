import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { toast } from "react-toastify";
import Logo from "../assets/images/logo.png";
import "../assets/styles/footer.scss";

const Footer = () => {
  const [emailInput, setEmailInput] = useState("");
  const currentRoute = useLocation().pathname;
  const isOnAdminPage = currentRoute.includes("/admin");

  const footerClass = () => {
    const needMarginInFooterRoute = currentRoute === "/";
    return needMarginInFooterRoute ? "footer" : "footer footer--no-margin";
  };

  const onChangeSubscribeInput = (event) => {
    let { value } = event.currentTarget;
    setEmailInput(value);
  };

  const subscribe = () => {
    if (!emailInput) {
      toast.warn("Please check your email address.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    } else {
      toast.success(
        "Thanks for subscribe! Stay close with any latest informations from Asia Property.",
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        }
      );
    }

    setEmailInput("");
  };

  const onClickSubFooter = () => {
    toast.success("Suboptions feature in footer will come soon.", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
    });
  };

  return (
    <div>
      {!isOnAdminPage ? (
        <section className={footerClass()}>
          <div className="footer-section section--main">
            <div className="image__wrapper">
              <img className="image" src={Logo} alt="logo" />
              <h4 className="image-title">Asia Property</h4>
            </div>
            <p className="footer-text">58 Howard Street #2 San Francisco</p>
            <p className="footer-text">me@chenfrederick.com</p>
            <p className="footer-text">(+68) 1221 09876</p>
            <p className="footer-text">www.asiaproperty.com</p>
            <p className="footer-text text--copyright">
              © 2021 Asia-Property. All Rights Reserved
            </p>
          </div>

          <div className="footer-section section--large">
            <div className="footer__section-child">
              <p className="footer-title">Popular Searches</p>
              <p className="footer-subtitle" onClick={onClickSubFooter}>
                Apartment for Rent
              </p>
              <p className="footer-subtitle" onClick={onClickSubFooter}>
                Apartment for Sale
              </p>
              <p className="footer-subtitle" onClick={onClickSubFooter}>
                House for Rent
              </p>
              <p className="footer-subtitle" onClick={onClickSubFooter}>
                House for Sale
              </p>
            </div>

            <div className="footer__section-child">
              <p className="footer-title">Quick Links</p>
              <p className="footer-subtitle" onClick={onClickSubFooter}>
                Terms & Conditions
              </p>
              <p className="footer-subtitle" onClick={onClickSubFooter}>
                Privacy Policy
              </p>
              <p className="footer-subtitle" onClick={onClickSubFooter}>
                Contact support
              </p>
              <p className="footer-subtitle" onClick={onClickSubFooter}>
                Careers
              </p>
              <p className="footer-subtitle" onClick={onClickSubFooter}>
                FAQs
              </p>
            </div>
          </div>

          <div className="footer-section">
            <p className="footer-title">Sign Up for Our Newsletter</p>
            <p className="footer-text">
              Sign up to Asia Property's newsletter & receive any latest
              informations about real-estates and what's new here.
            </p>
            <div className="subscribe-section">
              <input
                className="subscribe-input"
                placeholder="Your email"
                value={emailInput}
                onChange={(event) => onChangeSubscribeInput(event)}
              />
              <button
                type="button"
                className="subscribe-button"
                onClick={subscribe}
              >
                Subscribe
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default Footer;
