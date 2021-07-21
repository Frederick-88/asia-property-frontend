import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import ListingCard from "./children/ListingCard";
import SkeletonList from "../SkeletonList";
import Slider from "react-slick";

const HomeListingPreview = (props) => {
  const history = useHistory();
  const customSlider = useRef();
  const isLoading = props.isLoadingType === "listing";

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1380,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  const isRentListingType = props.type && props.type === "rent";

  const carouselWrapperClass = () => {
    return isLoading
      ? "carousel__wrapper wrapper--is-loading"
      : "carousel__wrapper";
  };

  const listingData = () => {
    if (isRentListingType) {
      return props.forRentListingData;
    } else {
      return props.forSaleListingData;
    }
  };

  const ListingPreviewComponent = () => {
    if (isLoading) {
      return <SkeletonList quantity={4} />;
    } else {
      return (
        <Slider ref={(slider) => (customSlider.current = slider)} {...settings}>
          {listingData().map((listing, index) => {
            return <ListingCard data={listing} key={index} />;
          })}
        </Slider>
      );
    }
  };

  // -----------------------------------
  // < ------------------------------- >
  // -----------------------------------

  const setPrevCarousel = () => {
    customSlider.current.slickPrev();
  };

  const setNextCarousel = () => {
    customSlider.current.slickNext();
  };

  const goToListingPage = () => {
    if (isRentListingType) {
      history.push("/listings?page=1&type=for-rent");
    } else {
      history.push("/listings?page=1&type=for-sale");
    }
  };

  return (
    <section className="home__listing-preview">
      <div className="list__header-wrapper">
        <div className="list-header">
          <h4 className="list-title">
            Best Properties for {isRentListingType ? "Rent" : "Sale"}
          </h4>
          <hr className="list__line-decoration" />
          <p className="list-subtitle">
            Here, are the best & great properties for{" "}
            {isRentListingType ? "rent" : "sale"}, see more of them by clicking
            the button beside.
          </p>
        </div>
        <button
          type="button"
          className="list-header__button"
          onClick={goToListingPage}
        >
          <p className="title">See all properties</p>
          <i className="icon-arrow-right" />
        </button>
      </div>

      <div className="preview__list-carousel">
        <button
          type="button"
          className="carousel-icon icon--left"
          onClick={setPrevCarousel}
        >
          <i className="icon-chevron-left" />
        </button>

        <div className={carouselWrapperClass()}>
          {ListingPreviewComponent()}
        </div>

        <button
          type="button"
          className="carousel-icon icon--right"
          onClick={setNextCarousel}
        >
          <i className="icon-chevron-right" />
        </button>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoadingType: state.UsersReducer.isLoadingType,
    forRentListingData: state.UsersReducer.forRentListingData,
    forSaleListingData: state.UsersReducer.forSaleListingData,
  };
};

export default connect(mapStateToProps, null)(HomeListingPreview);
