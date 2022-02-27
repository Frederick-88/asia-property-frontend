import React from "react";

const AdminListingCard = (props) => {
  const isRentListingType = props.data.is_renting;
  const rentText = isRentListingType ? "For Rent" : "For Sale";
  const imageThumb = props.data.images && props.data.images[0];
  const priceText = isRentListingType
    ? `$${props.data.price}/month`
    : `$${props.data.price}`;

  // ---------------------
  // < ---- Methods ---- >
  // ---------------------

  const onClickCheckbox = (listingId) => {
    props.onClickCheckbox(listingId);
  };

  const actionButtonClick = (dataObj) => {
    props.actionButtonClick(dataObj);
  };

  const featuredTagComponent = () => {
    if (props.data.is_featured) {
      return <span className="card-tag tag--featured">Featured</span>;
    }

    return null;
  };

  return (
    <div className="admin-listing-card">
      <div className="card__image-wrapper">
        <div className="card__image">
          <img className="image" src={imageThumb} alt="real-estate" />
        </div>

        <label className="admin-checkbox">
          <input
            type="checkbox"
            checked={props.selectedIds.includes(props.data._id)}
            id={props.data._id}
            name="listingId"
            onChange={() => onClickCheckbox(props.data._id)}
          />
          <span className="checkmark"></span>
        </label>
        {featuredTagComponent()}
        <div className="card__action-button-list">
          <button
            type="button"
            title="View Listing"
            className="card__action-button icon-eye"
            onClick={() =>
              actionButtonClick({ type: "view", data: props.data })
            }
          />
          <button
            type="button"
            title="Update Listing"
            className="card__action-button icon-edit"
            onClick={() =>
              actionButtonClick({ type: "update", data: props.data })
            }
          />
          <button
            type="button"
            title="Delete Listing"
            className="card__action-button icon-delete-solid"
            onClick={() =>
              actionButtonClick({ type: "delete", data: props.data })
            }
          />
        </div>
      </div>

      <div className="card__content-wrapper">
        <div className="card__content">
          <h4 className="title">{props.data.name}</h4>
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

        <div className="card-price__wrapper">
          <h4 className="card-price">{priceText}</h4>
          <span className="card-tag">{rentText}</span>
        </div>
      </div>
    </div>
  );
};

export default AdminListingCard;
