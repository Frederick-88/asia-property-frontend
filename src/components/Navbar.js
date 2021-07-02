import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import "../assets/styles/navbar.scss";

const Navbar = () => {
  return (
    <section className="navigation__bar">
      <div className="navigation__list">
        <div className="nav-image__wrapper">
          <img className="nav__image" src={Logo} alt="logo" />
          <h4 className="nav__logo-title">Asia Property</h4>
        </div>
        <Link to="/" className="nav__item">
          Listing
        </Link>
        <Link to="/" className="nav__item">
          Favourites
        </Link>
        <Link to="/" className="nav__item">
          Our Agents
        </Link>
        <Link to="/" className="nav__item">
          About Us
        </Link>
      </div>

      <div className="auth-button__list">
        <button type="button" className="nav__auth-button">
          <i className="icon-user icon" />
          <p className="title">Sign in</p>
        </button>
        <button type="button" className="nav__auth-button auth--admin">
          <p className="title">For Admin</p>
          <i className="icon-arrow-right icon" />
        </button>
      </div>
    </section>
  );
};

export default Navbar;
