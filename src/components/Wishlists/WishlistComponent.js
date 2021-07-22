import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import SkeletonList from "../SkeletonList";
import ListingCard from "../Home/children/ListingCard";

import wishlistVector from "../../assets/images/illustrations/wishlist.png";
import banner from "../../assets/images/banner-bg.jpg";

const WishlistComponent = (props) => {
  const history = useHistory();
  const currentQueryUrl = useLocation().search;
  const isAuthenticated = props.isAuthenticated;
  const isLoading = props.isLoadingType === "wishlist" || props.isInitialLoad;

  // -----------------------------------
  // < ------------------------------- >
  // -----------------------------------

  const wishlistList = () => {
    return props.wishlistsData;
  };

  const backgroundStyle = (image) => {
    return {
      backgroundImage: `linear-gradient(to bottom, rgba(29,41,62,0.6) 0%,rgba(29,41,62,0.6) 100%), url("${image}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  };

  const WishlistListComponent = () => {
    if (isLoading) {
      return <SkeletonList quantity={6} />;
    } else {
      return (
        <div className="wishlist-list__container">
          <h4 className="list-title">{wishlistList().length} Wishlists</h4>
          <div className="wishlist-list">
            {wishlistList().map((wishlist, index) => {
              return <ListingCard data={wishlist} key={index} />;
            })}
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/");
    }
    if (!currentQueryUrl) {
      // always need to have '?page={page_num}'
      history.push("?page=1");
    }
  }, [currentQueryUrl, history, isAuthenticated]);

  return (
    <div className="wishlist__container">
      <div className="wishlist__banner" style={backgroundStyle(banner)}>
        <div className="banner-container">
          <img className="banner-image" src={wishlistVector} alt="cover" />
          <div className="banner-text">
            <h4 className="banner-title">Wishlists</h4>
            <p className="banner-description">
              All your wishlists in Asia Property will be stored here. You can
              remove/add your property wishlists with the love icon at the top
              of a property card.
            </p>
          </div>
        </div>
      </div>
      <div className="wishlist__content">
        <WishlistListComponent />

        {/* Coming Soon Feature */}
        {/* <Pagination paginationCount={paginationCount} /> */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.LoginReducer.isAuthenticated,
    isLoadingType: state.UsersReducer.isLoadingType,
    isInitialLoad: state.UsersReducer.isInitialLoad,
    wishlistsData: state.UsersReducer.wishlistsData,
  };
};

export default connect(mapStateToProps, null)(WishlistComponent);
