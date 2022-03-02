import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

import {
  getListing,
  getListingWithQueries,
} from "../../actionCreators/UsersAction";

import SkeletonList from "../SkeletonList";
import ListingCard from "../Home/children/ListingCard";
import Dropdown from "../../utilities/Dropdown";
import emptyResult from "../../assets/images/illustrations/empty-result.png";

const ListingList = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentQueryUrl = useLocation().search;
  const isLoading = props.isLoadingType === "listing" || props.isInitialLoad;

  const dropdownOptions = [
    {
      name: "All",
      value: "all",
    },
    {
      name: "For Sale",
      value: "for-sale",
    },
    {
      name: "For Rent",
      value: "for-rent",
    },
  ];

  const [pageQuery, setPageQuery] = useState(1);
  const [typeQuery, setTypeQuery] = useState("all");
  const [searchQueryInput, setSearchQueryInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // -------------------------------------------------
  // < --------------------------------------------- >
  // -------------------------------------------------

  const listingData = () => {
    if (typeQuery === "all") {
      return props.listingData;
    } else if (typeQuery === "for-rent") {
      return props.forRentListingData;
    } else {
      return props.forSaleListingData;
    }
  };

  const listingTitle = () => {
    const listingLength = listingData().length;
    const start = listingLength ? "1" : "0";
    return `Showing ${start}-${listingLength} of ${listingLength} Results`;
  };

  const ListingListComponent = () => {
    const emptyListingResult = !listingData().length;

    if (isLoading) {
      return <SkeletonList quantity={6} />;
    } else if (emptyListingResult) {
      return (
        <div className="empty-listing-result">
          <img className="image" src={emptyResult} alt="empty-search" />
          <p className="text">
            Sorry, we couldn't find the things you search for, please try again.
          </p>
        </div>
      );
    } else {
      return (
        <div className="listing-list">
          {listingData().map((listing, index) => {
            return <ListingCard data={listing} key={index} />;
          })}
        </div>
      );
    }
  };

  // -------------------------------------------------
  // < --------------------------------------------- >
  // -------------------------------------------------

  const getDropdownValue = (value) => {
    setTypeQuery(value);
    history.push(`?page=${pageQuery}&type=${value}`);
  };

  const handleSearchInput = (event) => {
    let { value } = event.currentTarget;
    setSearchQueryInput(value);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") searchListing();
  };

  const searchListing = () => {
    const params = new URLSearchParams(currentQueryUrl);
    const urlPageQuery = params.get("page");
    const urlTypeQuery = params.get("type");
    let paramPrefix = `?page=${urlPageQuery}&type=${urlTypeQuery}`;

    if (searchQueryInput) {
      paramPrefix = `?page=${urlPageQuery}&type=${urlTypeQuery}&search_query=${searchQueryInput}`;
    }

    history.push(paramPrefix);
  };

  useEffect(() => {
    const params = new URLSearchParams(currentQueryUrl);
    const urlPageQuery = params.get("page");
    const urlTypeQuery = params.get("type");
    const urlSearchQuery = params.get("search_query") || "";

    if (!currentQueryUrl) {
      // always need to have '?page={page_num}'
      history.push("?page=1&type=all");
    } else if (urlPageQuery && !urlTypeQuery) {
      const paramPrefix = `?page=${urlPageQuery}&type=all`;
      history.push(paramPrefix);
    } else if (!urlPageQuery && urlTypeQuery) {
      const paramPrefix = `?page=1&type=${urlTypeQuery}`;
      history.push(paramPrefix);
    } else {
      setPageQuery(urlPageQuery);
      setTypeQuery(urlTypeQuery);
      setSearchQuery(urlSearchQuery);
      setSearchQueryInput(urlSearchQuery || "");
    }
  }, [currentQueryUrl, history]);

  useEffect(() => {
    const isAllTypeQuery = typeQuery === "all";

    if (isAllTypeQuery && !searchQuery) {
      dispatch(
        getListing({
          isInitialGet: false,
        })
      );
    } else {
      dispatch(
        getListingWithQueries({
          type: isAllTypeQuery ? null : typeQuery,
          search_query: searchQuery ? searchQuery : null,
        })
      );
    }
  }, [pageQuery, typeQuery, searchQuery, dispatch]);

  return (
    <div className="listing-list__container">
      <div className="listing-section__container">
        <div className="listing-section">
          <h4 className="listing-title">{listingTitle()}</h4>
          <div className="listing__navigation-setting">
            <div className="option-dropdown">
              <Dropdown
                value={typeQuery}
                options={dropdownOptions}
                getDropdownValue={getDropdownValue}
              />
            </div>
            <div className="search-bar">
              <i className="icon-search search-icon" />
              <input
                className="search-input"
                placeholder="Enter Keyword ..."
                value={searchQueryInput}
                onChange={(event) => handleSearchInput(event)}
                onKeyDown={(event) => handleSearchKeyDown(event)}
              />
              <button
                type="button"
                className="search-button"
                onClick={searchListing}
              >
                Search
              </button>
            </div>
          </div>

          <ListingListComponent />

          {/* Coming Soon Feature */}
          {/* <Pagination paginationCount={paginationCount} /> */}
        </div>
      </div>

      <div className="listing__map">
        <iframe
          className="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63824.94971363673!2d104.02559383176848!3d1.1175792402775235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d988dc34cd0ecb%3A0xe373ee32cae6412!2sKec.%20Batam%20Kota%2C%20Kota%20Batam%2C%20Kepulauan%20Riau!5e0!3m2!1sid!2sid!4v1626275977399!5m2!1sid!2sid"
          title="map"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  getListing,
  getListingWithQueries,
};

const mapStateToProps = (state) => {
  return {
    isLoadingType: state.UsersReducer.isLoadingType,
    isInitialLoad: state.UsersReducer.isInitialLoad,
    listingData: state.UsersReducer.listingData,
    forRentListingData: state.UsersReducer.forRentListingData,
    forSaleListingData: state.UsersReducer.forSaleListingData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListingList);
