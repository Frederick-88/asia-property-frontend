import React from "react";
import { useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

import {
  setListingDetail,
  toggleWishlistListing,
} from "../../../actionCreators/UsersAction";

import { toast } from "react-toastify";
import "../../../assets/styles/home.scss";

const ListingCard = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const isRentListingType = props.data.is_renting;
  const rentText = isRentListingType ? "For Rent" : "For Sale";
  const imageThumb = props.data.images && props.data.images[0];
  const imageCount = props.data.images && props.data.images.length;
  const priceText = isRentListingType
    ? `$${props.data.price}/month`
    : `$${props.data.price}`;

  const isWishlist = () => {
    const isWishlistListing = props.wishlistsData.find(
      (wishlistListing) => wishlistListing._id === props.data._id
    );

    return !!isWishlistListing;
  };

  const wishlistButtonClass = () => {
    const classArray = ["card__wishlist-button"];

    if (isWishlist()) {
      classArray.push("icon-favourite-solid");
    } else {
      classArray.push("icon-favourite-line");
    }

    return classArray.join(" ");
  };

  const featuredTagComponent = () => {
    if (props.data.is_featured) {
      return <span className="card-tag tag--featured">Featured</span>;
    }

    return null;
  };

  const wishlistListing = (data) => {
    const realEstateId = data._id;

    if (!props.isAuthenticated) {
      toast.warn("You need to be logged in to access this feature.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    } else {
      dispatch(
        toggleWishlistListing({
          userToken: props.userToken,
          user_id: props.userData.id,
          real_estate_id: realEstateId,
          is_wishlisted: isWishlist(),
        })
      );
    }
  };

  const routeToListingDetail = () => {
    dispatch(setListingDetail(props.data));
    history.push(`/listing/${props.data._id}`);
  };

  return (
    <div className="listing-card">
      <div className="card__image-wrapper">
        <button
          type="button"
          className="card__image"
          onClick={routeToListingDetail}
        >
          <img className="image" src={imageThumb} alt="real-estate" />
        </button>
        {featuredTagComponent()}
        <span className="card__image-count">
          <i className="icon-pictures" />
          <p className="count-text">{imageCount}</p>
        </span>
        <button
          type="button"
          className={wishlistButtonClass()}
          onClick={() => wishlistListing(props.data)}
        />
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

const mapDispatchToProps = {
  setListingDetail,
  toggleWishlistListing,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.LoginReducer.isAuthenticated,
    userData: state.LoginReducer.userData,
    userToken: state.LoginReducer.userToken,
    wishlistsData: state.UsersReducer.wishlistsData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListingCard);
