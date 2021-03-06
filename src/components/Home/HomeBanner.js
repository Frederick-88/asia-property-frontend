import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const HomeBanner = () => {
  const history = useHistory();
  const [activeNav, setActiveNav] = useState("all-real-estate");
  const [searchQueryInput, setSearchQueryInput] = useState("");

  const navbarClass = (nav) => {
    const classArray = ["nav--item"];
    if (nav === activeNav) {
      classArray.push("nav--active");
    }

    return classArray.join(" "); // creating result like `nav--item nav--active` so usable in react's className
  };

  const setNavigation = (nav) => {
    setActiveNav(nav);
  };

  const searchListing = () => {
    const typeParam =
      activeNav === "all-real-estate"
        ? "all"
        : activeNav === "for-rent"
        ? "for-rent"
        : "for-sale";
    let listingListRoute = `/listings?page=1&type=${typeParam}`;
    if (searchQueryInput) {
      listingListRoute = `/listings?page=1&type=${typeParam}&search_query=${searchQueryInput}`;
    }

    history.push(listingListRoute);
  };

  const handleSearchInput = (event) => {
    let { value } = event.currentTarget;
    setSearchQueryInput(value);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") searchListing();
  };

  return (
    <section className="home-banner">
      <h4 className="subtitle uppercase--all">Let us guide your home</h4>
      <h2 className="title">Find Your Dream Home</h2>

      <div className="banner-navbar">
        <button
          type="button"
          className={navbarClass("all-real-estate")}
          onClick={() => setNavigation("all-real-estate")}
        >
          All Types
        </button>
        <button
          type="button"
          className={navbarClass("for-rent")}
          onClick={() => setNavigation("for-rent")}
        >
          For Rent
        </button>
        <button
          type="button"
          className={navbarClass("for-sale")}
          onClick={() => setNavigation("for-sale")}
        >
          For Sale
        </button>
      </div>

      <div className="search-bar">
        <i className="icon-search search-icon" />
        <input
          className="search-input"
          placeholder="Enter Keyword ..."
          onChange={(event) => handleSearchInput(event)}
          onKeyDown={(event) => handleSearchKeyDown(event)}
        />
        <button type="button" className="search-button" onClick={searchListing}>
          Search
        </button>
      </div>
    </section>
  );
};

export default HomeBanner;
