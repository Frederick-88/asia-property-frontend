import React from "react";
import { useLocation } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import "../assets/styles/footer.scss";

const Footer = () => {
  const currentRoute = useLocation().pathname;

  const footerClass = () => {
    const needMarginInFooterRoute = currentRoute === "/";
    return needMarginInFooterRoute ? "footer" : "footer footer--no-margin";
  };

  return (
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
          <p className="footer-text">Apartment for Rent</p>
          <p className="footer-text">Apartment for Sale</p>
          <p className="footer-text">House for Rent</p>
          <p className="footer-text">House for Sale</p>
        </div>

        <div className="footer__section-child">
          <p className="footer-title">Quick Links</p>
          <p className="footer-text">Terms & Conditions</p>
          <p className="footer-text">Privacy Policy</p>
          <p className="footer-text">Contact support</p>
          <p className="footer-text">Careers</p>
          <p className="footer-text">FAQs</p>
        </div>
      </div>

      <div className="footer-section">
        <p className="footer-title">Sign Up for Our Newsletter</p>
        <p className="footer-text">
          Lorem ipsum dolor sit amet, consecte tur cing elit. Suspe ndisse
          suscipit sagittis
        </p>
        <div className="subscribe-section">
          <input className="subscribe-input" placeholder="Your email" />
          <button type="button" className="subscribe-button">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default Footer;
