import React from "react";

import ListingCard from "../Home/children/ListingCard";
import "../../assets/styles/home.scss"; // for ListingCard css

import image1 from "../../assets/images/listing-detail/1.webp";
import image2 from "../../assets/images/listing-detail/2.webp";
import image3 from "../../assets/images/listing-detail/3.webp";
import image4 from "../../assets/images/listing-detail/4.webp";
import image5 from "../../assets/images/listing-detail/5.webp";
import sampleAgent from "../../assets/images/sample-agent.jpeg";

const ListingDetailComponent = (props) => {
  // console.log(props.paramId);
  const overview = [
    {
      type: "id",
      value: "2297",
      icon: "icon-property",
    },
    {
      type: "type",
      value: "Apartment",
      icon: "icon-file-text",
    },
    {
      type: "Bedrooms",
      value: "3",
      icon: "icon-bedroom",
    },
    {
      type: "Bathrooms",
      value: "2",
      icon: "icon-bathroom",
    },
    {
      type: "Status",
      value: "For Sale",
      icon: "icon-information-line",
    },
    {
      type: "Size",
      value: "900 SqFt",
      icon: "icon-size",
    },
  ];

  const propertyDetails = [
    {
      type: "Property Id",
      value: "2297",
    },
    {
      type: "Property Type",
      value: "Apartment",
    },
    {
      type: "Bedrooms",
      value: "3",
    },
    {
      type: "Bathrooms",
      value: "2",
    },
    {
      type: "Size",
      value: "900 SqFt",
    },
    {
      type: "Country",
      value: "Indonesia",
    },
    {
      type: "City",
      value: "Jakarta",
    },
    {
      type: "Address",
      value: "Kecamatan Batam Kota, Kepulauan Riau, Indonesia",
    },
  ];

  const listingSuggestions = [
    {
      id: 1001,
      name: "Apartment Boulevard",
      price: "150,000",
      status: "available",
      address: "393 Lewis Ave, Brooklyn, New York",
      is_renting: false,
      bathroom_count: 3,
      bedroom_count: 3,
      square_feet_size: 900,
      type: "apartment",
    },
    {
      id: 1002,
      name: "Apartment Promax",
      price: "180,000",
      status: "available",
      address: "393 Lewis Ave, Brooklyn, New York",
      is_renting: true,
      bathroom_count: 2,
      bedroom_count: 3,
      square_feet_size: 1100,
      type: "house",
    },
  ];

  return (
    <div className="listing-detail__wrapper">
      <h4 className="detail-title">Apartment Meisterstadt Pollux-A #31-12</h4>

      <div className="detail-header">
        <div className="header-section section--left">
          <i className="icon-location" />
          <p className="location-text">
            Kecamatan Batam Kota, Kepulauan Riau, Indonesia
          </p>
        </div>

        <div className="header-section section--right">
          <button type="button" className="share-section">
            <i className="icon icon-share" />
            <p className="text">Share</p>
          </button>
          <button type="button" className="share-section">
            <i className="icon icon-favourite-line" />
            <p className="text">Wishlist</p>
          </button>
        </div>
      </div>

      <div className="photo-grid__wrapper">
        <div className="photo-grid__section section--left">
          <img
            className="grid-image image--main"
            src={image1}
            alt="photogrid"
          />
        </div>
        <div className="photo-grid__section section--right">
          <div className="photo-grid__child-section child-section--left">
            <img
              className="grid-image image--child"
              src={image2}
              alt="photogrid"
            />
            <img
              className="grid-image image--child"
              src={image3}
              alt="photogrid"
            />
          </div>
          <div className="photo-grid__child-section child-section--right">
            <img
              className="grid-image image--child"
              src={image4}
              alt="photogrid"
            />
            <img
              className="grid-image image--child"
              src={image5}
              alt="photogrid"
            />
          </div>
        </div>

        <button type="button" className="show-images__button">
          <i className="icon-pictures" />
          <p className="text">Show all photos</p>
        </button>
      </div>

      <div className="detail__content-wrapper">
        <div className="detail-content">
          <div className="content__header">
            <h4 className="header-title">
              Apartment · Apartment Meisterstadt Pollux-A #31-12
            </h4>
            <div className="header-icons">
              <span className="card-tag tag--featured">Featured</span>
              <span className="card-tag">For Sale</span>
            </div>
            <h4 className="header-price">$1,250,000</h4>
          </div>

          <hr className="divider-line" />

          <p className="content-description">
            Breathtaking city view studio with a warm feeling of home, Located
            at in the Centre of Batam Suitable for couple and friends. The
            Location is strategic. 2 minutes walk to Mitra Raya Wet Market, 2
            minutes walk to Fanindo Fast Food Street & Pandora Food Market, 5
            minutes drive to Mega Mall , 5 minutes drive to Ferry Terminal
            International Batam Centre, You can easily find local cuisine nearby
            within 5 minutes drive.
          </p>

          <hr className="divider-line" />

          <div className="content__overview-section">
            <h4 className="overview-title">Overview</h4>
            <div className="overview-list">
              {overview.map((item, index) => {
                return (
                  <div className="overview__list-item" key={index}>
                    <i className={`icon ${item.icon}`} />
                    <div className="overview-content">
                      <p className="text">{item.type}</p>
                      <p className="value">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <hr className="divider-line" />

          <div className="content__property-details-section">
            <h4 className="property-details-title">Details</h4>
            <div className="property-details-list">
              {propertyDetails.map((item, index) => {
                return (
                  <div className="property-details__list-item" key={index}>
                    <p className="text">{item.type}</p>
                    <p className="value">{item.value}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <hr className="divider-line" />

          <div className="content__map-section">
            <h4 className="map-title">Location</h4>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63824.94971363673!2d104.02559383176848!3d1.1175792402775235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d988dc34cd0ecb%3A0xe373ee32cae6412!2sKec.%20Batam%20Kota%2C%20Kota%20Batam%2C%20Kepulauan%20Riau!5e0!3m2!1sid!2sid!4v1626275977399!5m2!1sid!2sid"
              title="map"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          <hr className="divider-line" />

          <div className="content__suggestion">
            <h4 className="suggestion-title">Similar location you may like</h4>
            <div className="suggestion-list">
              {listingSuggestions.map((listing, index) => {
                return (
                  <div className="suggestion__list-item" key={index}>
                    <ListingCard data={listing} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="detail-agent">
          <img src={sampleAgent} className="agent-image" alt="agent" />
          <h4 className="agent-title">Agent Ben Davies</h4>

          <div className="agent-info">
            <i className="icon-mail agent-icon" />
            <p className="agent-text">bendavies@asiaproperty.com</p>
          </div>
          <div className="agent-info text--black">
            <i className="icon-phone agent-icon" />
            <p className="agent-text">0858-3599-5588</p>
          </div>

          <button type="button" className="agent-button">
            Send Message or Email
          </button>
          <button type="button" className="agent-button button--hollow">
            Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailComponent;
