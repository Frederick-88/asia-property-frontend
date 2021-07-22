import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import ListingCard from "../Home/children/ListingCard";
import "../../assets/styles/home.scss"; // for ListingCard css

const ListingDetailComponent = (props) => {
  const history = useHistory();
  const listingDetail = props.listingDetail;
  const isListingDetailEmpty = !Object.keys(listingDetail).length;

  const saleTypeText = listingDetail.is_renting ? "For Rent" : "For Sale";

  const overviewArray = [
    {
      type: "id",
      value: listingDetail._id,
      icon: "icon-property",
    },
    {
      type: "type",
      value: listingDetail.type,
      icon: "icon-file-text",
    },
    {
      type: "Bedrooms",
      value: listingDetail.bedroom_count,
      icon: "icon-bedroom",
    },
    {
      type: "Bathrooms",
      value: listingDetail.bathroom_count,
      icon: "icon-bathroom",
    },
    {
      type: "Status",
      value: saleTypeText,
      icon: "icon-information-line",
    },
    {
      type: "Size",
      value: listingDetail.building_size + "SqFt",
      icon: "icon-size",
    },
  ];

  const propertyDetailsArray = [
    {
      type: "Property Id",
      value: listingDetail._id,
    },
    {
      type: "Property Type",
      value: listingDetail.type,
    },
    {
      type: "Bedrooms",
      value: listingDetail.bedroom_count,
    },
    {
      type: "Bathrooms",
      value: listingDetail.bathroom_count,
    },
    {
      type: "Size",
      value: listingDetail.building_size + "SqFt",
    },
    {
      type: "Country",
      value: listingDetail.country,
    },
    {
      type: "City",
      value: listingDetail.city,
    },
    {
      type: "Address",
      value: listingDetail.address,
    },
  ];

  const listingSuggestions = props.listingData.slice(0, 2);

  const comingSoonNotification = (featureName) => {
    toast.success(`${featureName} feature will come soon.`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
    });
  };

  useEffect(() => {
    if (isListingDetailEmpty) {
      history.push("/");
    }
  }, [isListingDetailEmpty, history]);

  return (
    <div className="listing-detail__wrapper">
      <h4 className="detail-title">{listingDetail.name}</h4>

      <div className="detail-header">
        <div className="header-section section--left">
          <i className="icon-location" />
          <p className="location-text">{listingDetail.address}</p>
        </div>

        <div className="header-section section--right">
          <button
            type="button"
            className="share-section"
            onClick={() => comingSoonNotification("Share listing")}
          >
            <i className="icon icon-share" />
            <p className="text">Share</p>
          </button>
          <button
            type="button"
            className="share-section"
            onClick={() => comingSoonNotification("Add listing to wishlist")}
          >
            <i className="icon icon-favourite-line" />
            <p className="text">Wishlist</p>
          </button>
        </div>
      </div>

      <div className="photo-grid__wrapper">
        <div className="photo-grid__section section--left">
          <img
            className="grid-image image--main"
            src={listingDetail.images && listingDetail.images[0]}
            alt="photogrid"
          />
        </div>
        <div className="photo-grid__section section--right">
          <div className="photo-grid__child-section child-section--left">
            <img
              className="grid-image image--child"
              src={listingDetail.images && listingDetail.images[1]}
              alt="photogrid"
            />
            <img
              className="grid-image image--child"
              src={listingDetail.images && listingDetail.images[2]}
              alt="photogrid"
            />
          </div>
          <div className="photo-grid__child-section child-section--right">
            <img
              className="grid-image image--child"
              src={listingDetail.images && listingDetail.images[3]}
              alt="photogrid"
            />
            <img
              className="grid-image image--child"
              src={listingDetail.images && listingDetail.images[4]}
              alt="photogrid"
            />
          </div>
        </div>

        <button
          type="button"
          className="show-images__button"
          onClick={() => comingSoonNotification("Show all photos")}
        >
          <i className="icon-pictures" />
          <p className="text">Show all photos</p>
        </button>
      </div>

      <div className="detail__content-wrapper">
        <div className="detail-content">
          <div className="content__header">
            <h4 className="header-title">
              {listingDetail.type} · {listingDetail.name}
            </h4>
            <div className="header-icons">
              {listingDetail.is_featured && (
                <span className="card-tag tag--featured">Featured</span>
              )}
              <span className="card-tag">{saleTypeText}</span>
            </div>
            <h4 className="header-price">${listingDetail.price}</h4>
          </div>

          <hr className="divider-line" />

          <p className="content-description">{listingDetail.description}</p>

          <hr className="divider-line" />

          <div className="content__overview-section">
            <h4 className="overview-title">Overview</h4>
            <div className="overview-list">
              {overviewArray.map((item, index) => {
                return (
                  <div className="overview__list-item" key={index}>
                    <i className={`icon ${item.icon}`} />
                    <div className="overview-content">
                      <p className="text">{item.type}</p>
                      <p
                        className={
                          item.type === "id" ? "value value--id" : "value"
                        }
                      >
                        {item.value}
                      </p>
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
              {propertyDetailsArray.map((item, index) => {
                return (
                  <div className="property-details__list-item" key={index}>
                    <p className="text">{item.type}</p>
                    <p
                      className={
                        item.type === "Property Id"
                          ? "value value--id"
                          : "value"
                      }
                    >
                      {item.value}
                    </p>
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
            <h4 className="suggestion-title">Similar listing you may like</h4>
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
          <img
            src={listingDetail.agent && listingDetail.agent.image}
            className="agent-image"
            alt="agent"
          />
          <h4 className="agent-title">
            {listingDetail.agent && listingDetail.agent.name}
          </h4>

          <div className="agent-info">
            <i className="icon-mail agent-icon" />
            <p className="agent-text">
              {listingDetail.agent && listingDetail.agent.email}
            </p>
          </div>
          <div className="agent-info text--black">
            <i className="icon-phone agent-icon" />
            <p className="agent-text">
              {listingDetail.agent && listingDetail.agent.phone_number}
            </p>
          </div>

          <button
            type="button"
            className="agent-button"
            onClick={() => comingSoonNotification("Send email to agent")}
          >
            Send Message or Email
          </button>
          <button
            type="button"
            className="agent-button button--hollow"
            onClick={() => comingSoonNotification("Call agent")}
          >
            Call
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    listingDetail: state.UsersReducer.listingDetail,
    listingData: state.UsersReducer.listingData,
  };
};

export default connect(mapStateToProps, null)(ListingDetailComponent);
