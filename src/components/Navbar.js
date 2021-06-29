import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/navbar.scss";

const Navbar = () => {
  return (
    <section className="navigation__bar">
      <div>
        <Link to="/" className="nav__item main-nav">
          Asia Property
        </Link>
        <hr className="nav__link" />
      </div>
      <Link to="/" className="nav__item">
        Property
      </Link>
      <Link to="/" className="nav__item">
        Property
      </Link>
      <Link to="/" className="nav__item">
        Property
      </Link>
      <Link to="/" className="nav__item">
        Property
      </Link>
    </section>
  );
};

export default Navbar;
