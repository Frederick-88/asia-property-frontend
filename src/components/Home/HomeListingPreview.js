import React, { useRef } from "react";
import ListingCard from "./children/ListingCard";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeListingPreview = (props) => {
  const customSlider = useRef();
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };
  const isRentListingType = props.type && props.type === "rent";
  const propertyText = isRentListingType ? "Apartment" : "House";

  /* TODO : 
  - later after receive api call, for "is_wishlist" field can get from cookie & check whether the id is wishlisted/not
  - filter to only show real estate with available status
  */
  const listingData = [
    {
      name: `${propertyText} Boulevard`,
      price: "150,000",
      status: "available",
      address: "393 Lewis Ave, Brooklyn, New York",
      is_renting: isRentListingType,
      bathroom_count: 3,
      bedroom_count: 3,
      square_feet_size: 900,
      type: "apartment",
    },
    {
      name: `${propertyText} Promax`,
      price: "180,000",
      status: "available",
      address: "393 Lewis Ave, Brooklyn, New York",
      is_renting: isRentListingType,
      bathroom_count: 2,
      bedroom_count: 3,
      square_feet_size: 1100,
      type: "house",
    },
    {
      name: `${propertyText} Boulevard`,
      price: "130,000",
      status: "available",
      address: "393 Lewis Ave, Brooklyn, New York",
      is_renting: isRentListingType,
      bathroom_count: 3,
      bedroom_count: 2,
      square_feet_size: 600,
      type: "apartment",
    },
    {
      name: `${propertyText} Promax`,
      price: "250,000",
      status: "available",
      address: "393 Lewis Ave, Brooklyn, New York",
      is_renting: isRentListingType,
      bathroom_count: 3,
      bedroom_count: 3,
      square_feet_size: 1800,
      type: "house",
    },
    {
      name: `${propertyText} Boulevard`,
      price: "150,000",
      status: "available",
      address: "393 Lewis Ave, Brooklyn, New York",
      is_renting: isRentListingType,
      bathroom_count: 3,
      bedroom_count: 4,
      square_feet_size: 1000,
      type: "apartment",
    },
    {
      name: `${propertyText} Promax`,
      price: "120,000",
      status: "available",
      address: "393 Lewis Ave, Brooklyn, New York",
      is_renting: isRentListingType,
      bathroom_count: 3,
      bedroom_count: 3,
      square_feet_size: 900,
      type: "house",
    },
  ];

  const setPrevCarousel = () => {
    customSlider.current.slickPrev();
  };

  const setNextCarousel = () => {
    customSlider.current.slickNext();
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
            Lorem ipsum dolor sit amet, consec tetur cing elit. Suspe ndisse
            suscipit
          </p>
        </div>
        <button type="button" className="list-header__button">
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
        <div className="carousel__wrapper">
          <Slider
            ref={(slider) => (customSlider.current = slider)}
            {...settings}
          >
            {listingData.map((listing, index) => {
              return <ListingCard data={listing} key={index} />;
            })}
          </Slider>
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

export default HomeListingPreview;
