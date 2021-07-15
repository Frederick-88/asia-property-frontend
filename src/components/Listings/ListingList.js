import React from "react";

import SkeletonList from "../SkeletonList";
import ListingCard from "../Home/children/ListingCard";

const ListingList = (props) => {
  const isLoading = false;

  const ListingListComponent = () => {
    if (isLoading) {
      return <SkeletonList quantity={8} />;
    } else {
      return (
        <div className="listing-list">
          {sampleListingData(8).map((listing, index) => {
            return <ListingCard data={listing} key={index} />;
          })}
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
        price: "150,000",
        status: "available",
        address: "393 Lewis Ave, Brooklyn, New York",
        is_renting: false,
        bathroom_count: 3,
        bedroom_count: 3,
        square_feet_size: 900,
        type: "apartment",
      });
    }

    return array;
  };

  return (
    <div className="listing-list__container">
      <div className="listing-section">
        <h4 className="listing-title">Showing 1-8 of 45 Results</h4>
        <div className="listing__navigation-setting">
          <select className="option-dropdown" name="property-type">
            <option className="option" value="All">
              All
            </option>
            <option className="option" value="For Sale">
              For Sale
            </option>
            <option className="option" value="For Rent">
              For Rent
            </option>
          </select>
          <div className="search-bar">
            <i className="icon-search search-icon" />
            <input className="search-input" placeholder="Enter Keyword ..." />
            <button type="button" className="search-button">
              Search
            </button>
          </div>
        </div>

        <ListingListComponent />
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

export default ListingList;
