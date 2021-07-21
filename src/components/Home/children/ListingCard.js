import React from "react";
import { Link } from "react-router-dom";
import "../../../assets/styles/home.scss";

const ListingCard = (props) => {
  const isRentListingType = props.data.is_renting;
  const rentText = isRentListingType ? "For Rent" : "For Sale";
  const imageThumb = props.data.images && props.data.images[0];
  const imageCount = props.data.images && props.data.images.length;
  const priceText = isRentListingType
    ? `$${props.data.price}/month`
    : `$${props.data.price}`;

  const featuredTagComponent = () => {
    if (props.data.is_featured) {
      return <span className="card-tag tag--featured">Featured</span>;
    }

    return null;
  };

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
    return `/listing/${props.data._id}`;
  };

  return (
    <div className="listing-card">
      <div className="card__image-wrapper">
        <Link to={listingRoute()} className="card__image">
          <img className="image" src={imageThumb} alt="real-estate" />
        </Link>
        {featuredTagComponent()}
        <span className="card__image-count">
          <i className="icon-pictures" />
          <p className="count-text">{imageCount}</p>
        </span>
        <button type="button" className={wishlistButtonClass()} />
      </div>

      <div className="card__content-wrapper">
        <div className="card__content">
          <h4 className="title">{props.data.name}</h4>
          <p className="description">
            {props.data.city + ", " + props.data.address}
          </p>
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
              <p className="detail-text">{props.data.building_size} SqFt</p>
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
