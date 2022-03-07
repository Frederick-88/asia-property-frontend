import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FileUploader } from "react-drag-drop-files";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { createListing, updateListing } from "../../actionCreators/AdminAction";

import AdminViewDashboard from "../../utilities/AdminViewDashboard";
import ViewModal from "../../utilities/ViewModal";
import EditAddModal from "../../utilities/EditAddModal";
import Dropdown from "../../utilities/Dropdown";
import AdminLoader from "../../utilities/AdminLoader";

import AdminListingCard from "./children/AdminListingCard";

const AdminListingsComponent = (props) => {
  const currentUrlQuery = useLocation().search;
  const allowedUploadFileTypes = ["JPEG", "PNG", "JPG", "WEBP"];
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
      name: "Is Featured",
      value: "is_featured",
    },
    {
      name: "Is Renting",
      value: "is_renting",
    },
    {
      name: "Status",
      value: "status",
    },
  ];
  const listingTypeOptions = [
    {
      name: "Apartment",
      value: "apartment",
    },
    {
      name: "House Cluster",
      value: "house-cluster",
    },
    {
      name: "House",
      value: "house",
    },
    {
      name: "Villa",
      value: "villa",
    },
  ];
  const listingStatusOptions = [
    {
      name: "Available",
      value: "available",
    },
    {
      name: "Sold",
      value: "sold",
    },
    {
      name: "Rented",
      value: "rented",
    },
  ];
  const listingIsFeaturedOptions = [
    {
      name: "Yes",
      value: "yes",
    },
    {
      name: "No",
      value: "no",
    },
  ];
  const listingRentSaleOptions = [
    {
      name: "For Sale",
      value: "no",
    },
    {
      name: "For Rent",
      value: "yes",
    },
  ];
  const [listingAgentOptions, setListingAgentOptions] = useState([
    {
      name: "",
      value: "",
    },
  ]);

  // ---------------------------
  // ---------------------------

  const [selectedIds, setSelectedIds] = useState([]);
  const [listingList, setListingList] = useState([]);
  const [viewModalObj, setViewModalObj] = useState({
    isShow: false,
    data: {},
  });
  const [editAddFiles, setEditAddFiles] = useState([]);
  const [editAddModalObj, setEditAddModalObj] = useState({
    isShow: false,
    type: "create",
    data: {},
  });

  // ----------------------
  // < ---- Computed ---- >
  // ----------------------

  const getImageUrl = (file) => {
    const isHttpsUrl = typeof file === "string" && file.includes("http");
    return isHttpsUrl ? file : URL.createObjectURL(file);
  };

  // ---------------------
  // < ---- Methods ---- >
  // ---------------------

  const onClickCheckbox = (listingId) => {
    if (selectedIds.includes(listingId)) {
      const removedIdArray = selectedIds.filter((id) => id !== listingId);
      setSelectedIds(removedIdArray);
    } else {
      setSelectedIds([...selectedIds, listingId]);
    }
  };

  const getDropdownChange = (value, type = "admin-view-dashboard") => {
    if (type === "admin-view-dashboard")
      comingSoonNotification("Entries sorting");
    if (type.includes("edit-add")) {
      const getFieldName = type.split("edit-add-")[1];

      setEditAddModalObj({
        isShow: editAddModalObj.isShow,
        type: editAddModalObj.type,
        data: {
          ...editAddModalObj.data,
          [getFieldName]: value,
        },
      });
    }
  };

  const searchbarChange = (query) => {
    searchListingName(query);
  };

  const searchListingName = (listingNameQuery) => {
    const filteredListingList = props.listingsData.filter((listing) => {
      return listing.name
        .toLowerCase()
        .includes(listingNameQuery.toLowerCase());
    });
    setListingList(filteredListingList);
  };

  const addButtonClick = (value) => {
    setEditAddModalObj({
      isShow: true,
      type: "create",
      data: {
        type: listingTypeOptions[0].value,
        status: listingStatusOptions[0].value,
        is_featured: listingIsFeaturedOptions[0].value,
        is_renting: listingRentSaleOptions[0].value,
        agent_id: listingAgentOptions[0].value,
      },
    });
    setEditAddFiles([]);
  };

  // ---------------------------
  // ---------------------------

  const setViewModal = (boolean, data = {}) => {
    setViewModalObj({
      isShow: boolean,
      data,
    });
  };

  const showEditAddModal = (data) => {
    setEditAddModalObj({
      isShow: true,
      type: "update",
      data,
    });
  };

  const hideEditAddModal = () => {
    setEditAddModalObj({
      isShow: false,
      type: editAddModalObj.type,
      data: {},
    });
  };

  // ---------------------------
  // ---------------------------

  const actionButtonClick = (dataObj) => {
    if (dataObj.type === "view") {
      setViewModal(true, dataObj.data);
    } else if (dataObj.type === "update") {
      const editDataObj = { ...dataObj.data }; // avoid direct mutation of state
      const isFeaturedValue = editDataObj.is_featured ? "yes" : "no";
      const isRentingValue = editDataObj.is_renting ? "yes" : "no";

      editDataObj.agent_id = editDataObj.agent._id;
      editDataObj.is_featured = isFeaturedValue;
      editDataObj.is_renting = isRentingValue;

      showEditAddModal(editDataObj);
      setEditAddFiles(dataObj.data.images);
    } else if (dataObj.type === "delete") {
      props.setDeleteModalObjData({
        isShow: true,
        text: `Are you sure to delete this "${dataObj.data.name}" listing?`,
        deleteActionType: "delete-listing",
        deleteData: dataObj.data,
      });
    }
  };

  const onClickEditAddModalConfirmButton = () => {
    const { data } = editAddModalObj;
    if (
      !editAddFiles.length ||
      !data.name ||
      !data.type ||
      !data.price ||
      !data.status ||
      !data.bedroom_count ||
      !data.bathroom_count ||
      !data.building_size ||
      !data.is_featured ||
      !data.is_renting ||
      !data.description ||
      !data.address ||
      !data.country ||
      !data.city ||
      !data.agent_id
    ) {
      // check empty fields
      return toast.success("Please fill all the required fields.", {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 5000,
      });
    } else {
      // FormData is used for API requests that have image files inside
      const listingFormData = new FormData();
      const isFeaturedValue =
        editAddModalObj.data.is_featured === "yes" ? true : false;
      const isRentingValue =
        editAddModalObj.data.is_renting === "yes" ? true : false;

      editAddFiles.forEach((file) => {
        listingFormData.append("images[]", file);
      });
      listingFormData.append("name", editAddModalObj.data.name);
      listingFormData.append("agent", editAddModalObj.data.agent_id);
      listingFormData.append("type", editAddModalObj.data.type);
      listingFormData.append("price", editAddModalObj.data.price);
      listingFormData.append("is_featured", isFeaturedValue);
      listingFormData.append("is_renting", isRentingValue);
      listingFormData.append(
        "bedroom_count",
        editAddModalObj.data.bedroom_count
      );
      listingFormData.append(
        "bathroom_count",
        editAddModalObj.data.bathroom_count
      );
      listingFormData.append(
        "building_size",
        editAddModalObj.data.building_size
      );
      listingFormData.append("description", editAddModalObj.data.description);
      listingFormData.append("status", editAddModalObj.data.status);
      listingFormData.append("address", editAddModalObj.data.address);
      listingFormData.append("country", editAddModalObj.data.country);
      listingFormData.append("city", editAddModalObj.data.city);

      if (editAddModalObj.type === "create") {
        props.createListing({
          token: props.adminToken,
          listingData: listingFormData,
        });
      } else if (editAddModalObj.type === "update") {
        props.updateListing({
          listingId: editAddModalObj.data._id,
          token: props.adminToken,
          listingData: listingFormData,
        });
      }

      hideEditAddModal();
    }
  };

  const handleEditAddFileUpload = (newFile) => {
    const getNewFileLength = newFile.length;
    const getCurrentEditAddFilesLength = editAddFiles.length;
    const newFilesData = [];

    for (let index = 0; index < getCurrentEditAddFilesLength; index++) {
      newFilesData.push(editAddFiles[index]);
    }
    for (let index = 0; index < getNewFileLength; index++) {
      newFilesData.push(newFile[index]);
    }

    setEditAddFiles(newFilesData);
  };

  const deleteEditAddFile = (fileIndex) => {
    const deletedData = editAddFiles.filter((file, index) => {
      if (index === fileIndex) return false;
      return true;
    });
    setEditAddFiles(deletedData);
  };

  const handleEditAddInputChange = (event) => {
    setEditAddModalObj({
      isShow: editAddModalObj.isShow,
      type: editAddModalObj.type,
      data: {
        ...editAddModalObj.data,
        [event.currentTarget.name]: event.currentTarget.value,
      },
    });
  };

  const comingSoonNotification = (featureName) => {
    toast.success(`${featureName} feature will come soon.`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
    });
  };

  useEffect(() => {
    const mapToDropdownOptions = props.agentsData.map((agent) => {
      return {
        name: agent.name + " - " + agent.city + ", " + agent.country,
        value: agent._id,
      };
    });

    setListingAgentOptions(mapToDropdownOptions);
  }, [props.agentsData]);

  useEffect(() => {
    const params = new URLSearchParams(currentUrlQuery);
    const getShowAddModalQuery = params.get("show_add_modal");

    if (getShowAddModalQuery === "true") addButtonClick();
  }, [currentUrlQuery]); // eslint-disable-line

  useEffect(() => {
    setListingList(props.listingsData);
  }, [props]);

  return (
    <div className="admin-listings__container">
      <AdminViewDashboard
        title="Listings"
        dropdownOptions={sortOptions}
        searchPlaceholder="Search by Listing Name"
        subjectText="Listing"
        showBulkActions={selectedIds.length}
        getDropdownChange={getDropdownChange}
        searchbarChange={searchbarChange}
        addButtonClick={addButtonClick}
        noScroller={true}
      >
        <AdminViewDashboard.Header />

        <AdminViewDashboard.Body>
          {props.isLoadingData ? (
            <AdminLoader type="listing" />
          ) : (
            <div className="listing-list">
              {listingList.map((listing, index) => {
                return (
                  <div className="listing-card-container" key={index}>
                    <AdminListingCard
                      isAdmin={true}
                      data={listing}
                      selectedIds={selectedIds}
                      actionButtonClick={actionButtonClick}
                      onClickCheckbox={onClickCheckbox}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </AdminViewDashboard.Body>

        <AdminViewDashboard.Footer />
      </AdminViewDashboard>

      <ViewModal
        viewModalTitle="View Listing"
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
                        alt={"listing " + index}
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
                {viewModalObj.data.bedroom_count} &{" "}
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
          <div className="view-modal__section section--row row--2">
            <div className="view-modal__column">
              <h4 className="view-modal__title">Country</h4>
              <h6 className="view-modal__subtitle">
                <strong>⊛</strong>
                {viewModalObj.data.country}
              </h6>
            </div>
            <div className="view-modal__column">
              <h4 className="view-modal__title">City</h4>
              <h6 className="view-modal__subtitle">
                <strong>⊛</strong>
                {viewModalObj.data.city}
              </h6>
            </div>
          </div>
        </ViewModal.Body>

        <ViewModal.Footer />
      </ViewModal>

      <EditAddModal
        isShow={editAddModalObj.isShow}
        editAddModalObjType={editAddModalObj.type}
        subjectText="Listing"
        hideEditAddModal={hideEditAddModal}
        onClickEditAddModalConfirmButton={onClickEditAddModalConfirmButton}
      >
        <EditAddModal.Header />
        <EditAddModal.Body>
          <div className="modal__content">
            <div className="content__image-upload-section">
              <h4 className="section-title">Upload your Listing image here</h4>
              <div className="section-controller">
                <div className={"controller__file-upload-container"}>
                  <FileUploader
                    multiple={true}
                    handleChange={handleEditAddFileUpload}
                    name="editAddFileUpload"
                    types={allowedUploadFileTypes}
                  />
                  <div className="controller__file-upload-input">
                    <i className="icon-upload input-icon" />
                    <span className="input-text">
                      <p className="text--green">Drag/Upload</p>
                      <p className="text--normal">your image here</p>
                    </span>
                  </div>
                </div>

                <div
                  className={
                    "controller__file-preview-list " +
                    (editAddFiles.length ? "list--margin-top" : "")
                  }
                >
                  {editAddFiles.map((file, index) => {
                    return (
                      <div key={index} className="list__image-preview">
                        <img
                          src={getImageUrl(file)}
                          alt={file.name}
                          className="image"
                        />
                        <button
                          type="button"
                          title="Delete Image"
                          className="image__delete-button icon-delete-solid"
                          onClick={() => deleteEditAddFile(index)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="content__details-section">
              <h4 className="section-title">
                Add your Listing description and necessary information from here
              </h4>
              <div className="section-controller content__input-list">
                <div className="input-row row--1">
                  <div className="input-label__container">
                    <p className="required-mark">*</p>
                    <label className="input-label" htmlFor="name">
                      Name
                    </label>
                  </div>
                  <input
                    className="input"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={editAddModalObj.data.name || ""}
                    onChange={(event) => handleEditAddInputChange(event)}
                  />
                </div>
                <div className="input-row row--1">
                  <div className="input-label__container">
                    <p className="required-mark">*</p>
                    <label className="input-label" htmlFor="type">
                      Type
                    </label>
                  </div>
                  <Dropdown
                    extraClass="dropdown"
                    maxWidth="100%"
                    options={listingTypeOptions}
                    value={editAddModalObj.data.type}
                    getDropdownValue={(event) =>
                      getDropdownChange(event, "edit-add-type")
                    }
                    isDark
                  />
                </div>
                <div className="input-row row--1">
                  <div className="input-label__container">
                    <p className="required-mark">*</p>
                    <label className="input-label" htmlFor="price">
                      Price (USD)
                    </label>
                  </div>
                  <input
                    className="input"
                    id="price"
                    name="price"
                    type="text"
                    placeholder="Price"
                    value={editAddModalObj.data.price || ""}
                    onChange={(event) => handleEditAddInputChange(event)}
                  />
                </div>
                <div className="input-row row--1">
                  <div className="input-label__container">
                    <p className="required-mark">*</p>
                    <label className="input-label">Status</label>
                  </div>
                  <Dropdown
                    extraClass="dropdown"
                    maxWidth="100%"
                    options={listingStatusOptions}
                    value={editAddModalObj.data.status}
                    getDropdownValue={(event) =>
                      getDropdownChange(event, "edit-add-status")
                    }
                    isDark
                  />
                </div>
                <div className="input-row row--1">
                  <div className="input-label__container">
                    <p className="required-mark">*</p>
                    <label className="input-label" htmlFor="bedroom_count">
                      Bedroom Count
                    </label>
                  </div>
                  <input
                    className="input"
                    id="bedroom_count"
                    name="bedroom_count"
                    type="number"
                    placeholder="Bedroom Count"
                    value={editAddModalObj.data.bedroom_count || ""}
                    onChange={(event) => handleEditAddInputChange(event)}
                  />
                </div>
                <div className="input-row row--1">
                  <div className="input-label__container">
                    <p className="required-mark">*</p>
                    <label className="input-label" htmlFor="bathroom_count">
                      Bathroom Count
                    </label>
                  </div>
                  <input
                    className="input"
                    id="bathroom_count"
                    name="bathroom_count"
                    type="number"
                    placeholder="Bathroom Count"
                    value={editAddModalObj.data.bathroom_count || ""}
                    onChange={(event) => handleEditAddInputChange(event)}
                  />
                </div>
                <div className="input-row row--1">
                  <div className="input-label__container">
                    <p className="required-mark">*</p>
                    <label className="input-label" htmlFor="building_size">
                      Building Size (SqFt)
                    </label>
                  </div>
                  <input
                    className="input"
                    id="building_size"
                    name="building_size"
                    type="number"
                    placeholder="Building Size"
                    value={editAddModalObj.data.building_size || ""}
                    onChange={(event) => handleEditAddInputChange(event)}
                  />
                </div>
                <div className="input-row row--1">
                  <div className="input-label__container">
                    <p className="required-mark">*</p>
                    <label className="input-label">Is Featured</label>
                  </div>
                  <Dropdown
                    extraClass="dropdown"
                    maxWidth="100%"
                    options={listingIsFeaturedOptions}
                    value={editAddModalObj.data.is_featured}
                    getDropdownValue={(event) =>
                      getDropdownChange(event, "edit-add-is_featured")
                    }
                    isDark
                  />
                </div>
                <div className="input-row row--1">
                  <div className="input-label__container">
                    <p className="required-mark">*</p>
                    <label className="input-label">Sale / Rent</label>
                  </div>
                  <Dropdown
                    extraClass="dropdown"
                    maxWidth="100%"
                    options={listingRentSaleOptions}
                    value={editAddModalObj.data.is_renting}
                    getDropdownValue={(event) =>
                      getDropdownChange(event, "edit-add-is_renting")
                    }
                    isDark
                  />
                </div>
                <div className="input-row row--1">
                  <div className="input-label__container">
                    <p className="required-mark">*</p>
                    <label className="input-label">Agent</label>
                  </div>
                  <Dropdown
                    extraClass="dropdown"
                    maxWidth="100%"
                    options={listingAgentOptions}
                    value={editAddModalObj.data.agent_id || -1}
                    getDropdownValue={(event) =>
                      getDropdownChange(event, "edit-add-agent_id")
                    }
                    isDark
                  />
                </div>
                <div className="input-row row--1">
                  <div className="input-label__container">
                    <p className="required-mark">*</p>
                    <label className="input-label" htmlFor="description">
                      Description
                    </label>
                  </div>
                  <textarea
                    className="input input--textarea"
                    rows="3"
                    id="description"
                    name="description"
                    placeholder="Description"
                    value={editAddModalObj.data.description || ""}
                    onChange={(event) => handleEditAddInputChange(event)}
                  />
                </div>
                <div className="input-row row--1">
                  <div className="input-label__container">
                    <p className="required-mark">*</p>
                    <label className="input-label" htmlFor="address">
                      Address
                    </label>
                  </div>
                  <textarea
                    className="input input--textarea"
                    rows="4"
                    id="address"
                    name="address"
                    placeholder="Address"
                    value={editAddModalObj.data.address || ""}
                    onChange={(event) => handleEditAddInputChange(event)}
                  />
                </div>
                <div className="input-row row--2">
                  <div className="input-column">
                    <div className="input-label__container">
                      <p className="required-mark">*</p>
                      <label className="input-label" htmlFor="country">
                        Country
                      </label>
                    </div>
                    <input
                      className="input"
                      id="country"
                      name="country"
                      type="text"
                      placeholder="Country"
                      value={editAddModalObj.data.country || ""}
                      onChange={(event) => handleEditAddInputChange(event)}
                    />
                  </div>
                  <div className="input-column">
                    <div className="input-label__container">
                      <p className="required-mark">*</p>
                      <label className="input-label" htmlFor="city">
                        City
                      </label>
                    </div>
                    <input
                      className="input"
                      id="city"
                      name="city"
                      type="text"
                      placeholder="City"
                      value={editAddModalObj.data.city || ""}
                      onChange={(event) => handleEditAddInputChange(event)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </EditAddModal.Body>
        <EditAddModal.Footer />
      </EditAddModal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoadingData: state.AdminReducer.isLoadingData,
    agentsData: state.AdminReducer.agentsData,
    listingsData: state.AdminReducer.listingsData,
    adminToken: state.LoginReducer.adminToken,
  };
};

const mapDispatchToProps = {
  createListing,
  updateListing,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminListingsComponent);
