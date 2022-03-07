import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import AdminViewDashboard from "../../utilities/AdminViewDashboard";
import ViewModal from "../../utilities/ViewModal";
import AdminLoader from "../../utilities/AdminLoader";

const AdminInquiriesComponent = (props) => {
  const sortOptions = [
    {
      name: "Id",
      value: "id",
    },
    {
      name: "Name",
      value: "name",
    },
    {
      name: "Type",
      value: "type",
    },
    {
      name: "Agent Name",
      value: "agent_name",
    },
    {
      name: "City, Country",
      value: "city_country",
    },
  ];

  const [isCheckedAllCheckbox, setIsCheckedAllCheckbox] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [inquiryList, setInquiryList] = useState([]);
  const [viewModalObj, setViewModalObj] = useState({
    isShow: false,
    data: {},
  });
  // ----------------------
  // < ---- Computed ---- >
  // ----------------------

  const tableRowClass = (index) => {
    return inquiryList.length === index + 1 ? "table-row--is-last" : "";
  };

  const inquiryAdminDashboardTitle = () => {
    return window.innerWidth >= 1440
      ? "Inquiries / Featured Listings"
      : "Inquiries";
  };

  // ---------------------
  // < ---- Methods ---- >
  // ---------------------

  const checkAllCheckbox = () => {
    if (isCheckedAllCheckbox) {
      setIsCheckedAllCheckbox(false);
      setSelectedIds([]);
    } else {
      const getAllInquiryIdArray = inquiryList.map((inquiry) => {
        return inquiry._id;
      });

      setIsCheckedAllCheckbox(true);
      setSelectedIds(getAllInquiryIdArray);
    }
  };

  const onClickCheckbox = (inquiryId) => {
    if (selectedIds.includes(inquiryId)) {
      const removedIdArray = selectedIds.filter((id) => id !== inquiryId);
      setSelectedIds(removedIdArray);
      setIsCheckedAllCheckbox(false);
    } else {
      setSelectedIds([...selectedIds, inquiryId]);
    }
  };

  const getDropdownChange = (value) => {
    comingSoonNotification("Entries sorting");
  };

  const searchbarChange = (query) => {
    searchFeaturedListingName(query);
  };

  const searchFeaturedListingName = (inquiryNameQuery) => {
    const filteredInquiryList = props.inquiriesData.filter((inquiry) => {
      return inquiry.name
        .toLowerCase()
        .includes(inquiryNameQuery.toLowerCase());
    });
    setInquiryList(filteredInquiryList);
  };

  // ---------------------------
  // ---------------------------

  const setViewModal = (boolean, data = {}) => {
    setViewModalObj({
      isShow: boolean,
      data,
    });
  };

  const actionButtonClick = (dataObj) => {
    if (dataObj.type === "view") setViewModal(true, dataObj.data);
  };

  const comingSoonNotification = (featureName) => {
    toast.success(`${featureName} feature will come soon.`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
    });
  };

  useEffect(() => {
    setInquiryList(props.inquiriesData);
  }, [props]);

  return (
    <div className="admin-inquiries__container">
      <AdminViewDashboard
        title={inquiryAdminDashboardTitle()}
        dropdownOptions={sortOptions}
        searchPlaceholder="Search by Listing Name"
        showBulkActions={selectedIds.length}
        getDropdownChange={getDropdownChange}
        searchbarChange={searchbarChange}
        noAddButton={true}
      >
        <AdminViewDashboard.Header />

        <AdminViewDashboard.Body>
          {props.isLoadingData ? (
            <AdminLoader type="inquiry" />
          ) : (
            <table cellSpacing={0}>
              <thead>
                <tr>
                  <th scope="col">
                    <label className="admin-checkbox checkbox--white">
                      <input
                        type="checkbox"
                        checked={isCheckedAllCheckbox}
                        onChange={checkAllCheckbox}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </th>
                  <th scope="col">Id</th>
                  <th scope="col">Listing Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Agent Name</th>
                  <th scope="col">Listing Image</th>
                  <th scope="col">City, Country</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>

              <tbody>
                {inquiryList.map((inquiry, index) => {
                  return (
                    <tr key={index} className={tableRowClass(index)}>
                      <td>
                        <label className="admin-checkbox">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(inquiry._id)}
                            id={inquiry._id}
                            name="inquiryId"
                            onChange={() => onClickCheckbox(inquiry._id)}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </td>
                      <td>{inquiry._id}</td>
                      <td>{inquiry.name}</td>
                      <td>{inquiry.type}</td>
                      <td>{inquiry.agent.name}</td>
                      <td>
                        <img src={inquiry.images[0]} alt={inquiry.name} />
                      </td>
                      <td>
                        {inquiry.city}, {inquiry.country}
                      </td>
                      <td className="button-list">
                        <button
                          type="button"
                          title="View Inquiry"
                          onClick={() =>
                            actionButtonClick({ type: "view", data: inquiry })
                          }
                        >
                          <i className="icon-eye" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </AdminViewDashboard.Body>

        <AdminViewDashboard.Footer />
      </AdminViewDashboard>

      <ViewModal
        viewModalTitle="View Inquiry"
        isShowViewModal={viewModalObj.isShow}
        hideViewModal={() => setViewModal(false)}
      >
        <ViewModal.Header />

        <ViewModal.Body>
          <div className="view-modal__section">
            <h4 className="view-modal__title">Images</h4>
            <div className="view-modal__image-list">
              {viewModalObj.data.images &&
                viewModalObj.data.images.map((image_url, index) => {
                  return (
                    <a
                      href={image_url}
                      className="list__image-preview"
                      key={index}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={image_url}
                        alt={"inquiry " + index}
                        className="image"
                      />
                      <div className="preview__view-image-sign">
                        <i className="icon-eye sign-icon" />
                        <p className="sign-text">View</p>
                      </div>
                    </a>
                  );
                })}
            </div>
          </div>
          <div className="view-modal__section">
            <h4 className="view-modal__title">Id</h4>
            <h6 className="view-modal__subtitle">
              <strong>⊛</strong>
              {viewModalObj.data._id}
            </h6>
          </div>
          <div className="view-modal__section section--row row--2">
            <div className="view-modal__column">
              <h4 className="view-modal__title">Name</h4>
              <h6 className="view-modal__subtitle">
                <strong>⊛</strong>
                {viewModalObj.data.name}
              </h6>
            </div>
            <div className="view-modal__column">
              <h4 className="view-modal__title">Type</h4>
              <h6 className="view-modal__subtitle">
                <strong>⊛</strong>
                {viewModalObj.data.type}
              </h6>
            </div>
          </div>
          <div className="view-modal__section section--row row--2">
            <div className="view-modal__column">
              <h4 className="view-modal__title">Price</h4>
              <h6 className="view-modal__subtitle">
                <strong>⊛</strong>
                {viewModalObj.data.price}
              </h6>
            </div>
            <div className="view-modal__column">
              <h4 className="view-modal__title">Status</h4>
              <h6 className="view-modal__subtitle">
                <strong>⊛</strong>
                {viewModalObj.data.status}
              </h6>
            </div>
          </div>
          <div className="view-modal__section section--row row--2">
            <div className="view-modal__column">
              <h4 className="view-modal__title">Bedroom & Bathroom Count</h4>
              <h6 className="view-modal__subtitle">
                <strong>⊛</strong>
                {viewModalObj.data.bedroom_count} &
                {viewModalObj.data.bathroom_count}
              </h6>
            </div>
            <div className="view-modal__column">
              <h4 className="view-modal__title">Building Size</h4>
              <h6 className="view-modal__subtitle">
                <strong>⊛</strong>
                {viewModalObj.data.building_size} SqFt
              </h6>
            </div>
          </div>
          <div className="view-modal__section section--row row--2">
            <div className="view-modal__column">
              <h4 className="view-modal__title">Is Featured</h4>
              <h6 className="view-modal__subtitle">
                <strong>⊛</strong>
                {viewModalObj.data.is_featured ? "Yes" : "No"}
              </h6>
            </div>
            <div className="view-modal__column">
              <h4 className="view-modal__title">Sale / Rent</h4>
              <h6 className="view-modal__subtitle">
                <strong>⊛</strong>
                {viewModalObj.data.is_renting ? "For Rent" : "For Sale"}
              </h6>
            </div>
          </div>
          <div className="view-modal__section">
            <h4 className="view-modal__title">Description</h4>
            <h6 className="view-modal__subtitle">
              <strong>⊛</strong>
              {viewModalObj.data.description}
            </h6>
          </div>
          <div className="view-modal__section section--row row--2">
            <div className="view-modal__column">
              <h4 className="view-modal__title">Address</h4>
              <h6 className="view-modal__subtitle">
                <strong>⊛</strong>
                {viewModalObj.data.address}
              </h6>
            </div>
            <div className="view-modal__column">
              <h4 className="view-modal__title">Agent Name</h4>
              <h6 className="view-modal__subtitle">
                <strong>⊛</strong>
                {viewModalObj.data.agent && viewModalObj.data.agent.name}
              </h6>
            </div>
          </div>
        </ViewModal.Body>

        <ViewModal.Footer />
      </ViewModal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoadingData: state.AdminReducer.isLoadingData,
    inquiriesData: state.AdminReducer.inquiriesData,
    adminToken: state.LoginReducer.adminToken,
  };
};

export default connect(mapStateToProps, null)(AdminInquiriesComponent);
