import React from "react";
import { Link } from "react-router-dom";
import SampleSaleImage from "../../../assets/images/sample-real-estate.jpg";
import SampleRentImage from "../../../assets/images/sample-real-estate-rent.jpg";

const ListingCard = (props) => {
  const isRentListingType = props.data.is_renting;
  const rentText = isRentListingType ? "For Rent" : "For Sale";
  const sampleImage = isRentListingType ? SampleRentImage : SampleSaleImage;
  const priceText = isRentListingType
    ? `$${props.data.price}/month`
    : `$${props.data.price}`;

  const wishlistButtonClass = () => {
    const classArray = ["card__wishlist-button"];
    if (props.data.is_wishlist) {
      classArray.push("icon-favourite-solid");
    } else {
      classArray.push("icon-favourite-line");
    }

    return classArray.join(" ");
  };

  const listingRoute = () => {
    return `/listing/${props.data.id}`;
  };

  return (
    <div className="listing-card">
      <div className="card__image-wrapper">
        <Link to={listingRoute()} className="card__image">
          <img className="image" src={sampleImage} alt="real-estate" />
        </Link>
        <span className="card-tag tag--featured">Featured</span>
        <span className="card__image-count">
          <i className="icon-pictures" />
          <p className="count-text">8</p>
        </span>
        <button type="button" className={wishlistButtonClass()} />
      </div>

      <div className="card__content-wrapper">
        <div className="card__content">
          <h4 className="title">{props.data.name}</h4>
          <p className="description">{props.data.address}</p>
          <div className="card-detail__wrapper">
            <div className="card-detail">
              <i className="icon-bedroom detail-icon" />
              <p className="detail-text">{props.data.bedroom_count} Br</p>
            </div>
            <div className="card-detail">
              <i className="icon-bathroom detail-icon" />
              <p className="detail-text">{props.data.bathroom_count} Ba</p>
            </div>
            <div className="card-detail">
              <i className="icon-size detail-icon" />
              <p className="detail-text">{props.data.square_feet_size} SqFt</p>
            </div>
          </div>
        </div>

        <hr className="card__content-divider" />

        <div className="card-price__wrapper">
          <h4 className="card-price">{priceText}</h4>
          <span className="card-tag">{rentText}</span>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
