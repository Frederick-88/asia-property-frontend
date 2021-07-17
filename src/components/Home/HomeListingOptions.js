import React from "react";
import { useHistory } from "react-router-dom";

import ApartmentImage from "../../assets/images/sample-apartment.jpg";
import HouseImage from "../../assets/images/sample-house.jpg";
import HomeClusterImage from "../../assets/images/sample-home-cluster.jpg";
import VillaImage from "../../assets/images/sample-villa.jpg";

const HomeListingOptions = () => {
  const history = useHistory();

  const options = [
    {
      title: "Apartment",
      image: ApartmentImage,
      listing_count: 52,
    },
    {
      title: "House",
      image: HouseImage,
      listing_count: 88,
    },
    {
      title: "Home Cluster",
      image: HomeClusterImage,
      listing_count: 7,
    },
    {
      title: "Villa",
      image: VillaImage,
      listing_count: 0,
    },
  ];

  const goToListingPage = () => {
    history.push("/listings");
  };

  return (
    <section className="home__listing-options">
      <div className="options__header-wrapper">
        <h4 className="header-title">Browse listings by category</h4>
        <p className="header-subtitle">
          Highlight the best of your properties by using the List Category
          shortcode. You can list categories, types, cities, areas and states.
        </p>
      </div>

      <div className="options__list-wrapper">
        {options.map((option) => {
          return (
            <button
              type="button"
              key={option.title}
              className="options__list-item"
              onClick={goToListingPage}
            >
              <img
                className="item-image"
                src={option.image}
                alt="real-estate-option"
              />
              <h4 className="item-title">{option.title}</h4>
              <h4 className="item__listing-count">
                {option.listing_count} Listings
              </h4>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default HomeListingOptions;
