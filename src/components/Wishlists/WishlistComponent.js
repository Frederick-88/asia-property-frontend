import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import SkeletonList from "../SkeletonList";
import ListingCard from "../Home/children/ListingCard";

import wishlistVector from "../../assets/images/illustrations/wishlist.png";
import banner from "../../assets/images/banner-bg.jpg";

const WishlistComponent = (props) => {
  const history = useHistory();
  const currentQueryUrl = useLocation().search;
  const isLoading = false;

  // -----------------------------------
  // < ------------------------------- >
  // -----------------------------------

  const backgroundStyle = (image) => {
    return {
      backgroundImage: `linear-gradient(to bottom, rgba(29,41,62,0.6) 0%,rgba(29,41,62,0.6) 100%), url("${image}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  };

  const ListingListComponent = () => {
    if (isLoading) {
      return <SkeletonList quantity={6} />;
    } else {
      return (
        <div className="wishlist-list__container">
          <h4 className="list-title">45 Wishlists</h4>
          <div className="wishlist-list">
            {sampleListingData(10).map((listing, index) => {
              return <ListingCard data={listing} key={index} />;
            })}
          </div>
        </div>
      );
    }
  };

  const sampleListingData = (quantity) => {
    const array = [];

    for (let index = 0; index < quantity; index++) {
      array.push({
        id: 1001 + index,
        name: `Apartment Boulevard - ${index}`,
        price: "20,000",
        status: "available",
        address: "393 Lewis Ave, Brooklyn, New York",
        is_renting: true,
        bathroom_count: 3,
        bedroom_count: 3,
        square_feet_size: 900,
        type: "apartment",
      });
    }

    return array;
  };

  useEffect(() => {
    if (!currentQueryUrl) {
      // always need to have '?page={page_num}'
      history.push("?page=1");
    }
  }, [currentQueryUrl, history]);

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
        <ListingListComponent />

        {/* Coming Soon Feature */}
        {/* <Pagination paginationCount={paginationCount} /> */}
      </div>
    </div>
  );
};

export default WishlistComponent;
