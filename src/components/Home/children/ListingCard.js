import React from "react";
import SampleImage from "../../../../src/assets/images/sample-real-estate.jpg";

const ListingCard = (props) => {
  return (
    <div className="listing-card">
      <img className="card__image" src={SampleImage} alt="real-estate" />
      <h4 className="card-title">{props.data.name}</h4>
      <p className="card-description">Card Description</p>
    </div>
  );
};

export default ListingCard;
