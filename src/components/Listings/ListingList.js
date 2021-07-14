import React from "react";
import SkeletonList from "../SkeletonList";

const ListingList = (props) => {
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

        <div className="listing-list">
          <SkeletonList quantity={8} />
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

export default ListingList;
