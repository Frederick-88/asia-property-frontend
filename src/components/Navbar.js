import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import "../assets/styles/navbar.scss";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScrolled: false,
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

  render() {
    const navClass = this.navClass();

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
          <Link to="/about-us" className="nav__item">
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
  }
}
