import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FileUploader } from "react-drag-drop-files";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { createAgent, updateAgent } from "../../actionCreators/AdminAction";

import AdminViewDashboard from "../../utilities/AdminViewDashboard";
import ViewModal from "../../utilities/ViewModal";
import EditAddModal from "../../utilities/EditAddModal";
import AdminLoader from "../../utilities/AdminLoader";

const AdminAgentsComponent = (props) => {
  const currentUrlQuery = useLocation().search;
  const allowedUploadFileTypes = ["JPEG", "PNG", "JPG"];
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
      name: "Email",
      value: "email",
    },
    {
      name: "Phone Number",
      value: "phone_number",
    },
    {
      name: "City, Country",
      value: "city_country",
    },
  ];

  const [isCheckedAllCheckbox, setIsCheckedAllCheckbox] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [agentList, setAgentList] = useState([]);
  const [viewModalObj, setViewModalObj] = useState({
    isShow: false,
    data: {},
  });
  const [editAddImage, setEditAddImage] = useState("");
  const [editAddModalObj, setEditAddModalObj] = useState({
    isShow: false,
    type: "create",
    data: {},
  });

  // ----------------------
  // < ---- Computed ---- >
  // ----------------------

  const tableRowClass = (index) => {
    return agentList.length === index + 1 ? "table-row--is-last" : "";
  };

  const getImageUrl = (file) => {
    const isHttpsUrl = typeof file === "string" && file.includes("http");
    return isHttpsUrl ? file : URL.createObjectURL(file);
  };

  const formatIdText = (id) => {
    const get8Letter = id.slice(0, 8);
    return get8Letter + "...";
  };

  // ---------------------
  // < ---- Methods ---- >
  // ---------------------

  const checkAllCheckbox = () => {
    if (isCheckedAllCheckbox) {
      setIsCheckedAllCheckbox(false);
      setSelectedIds([]);
    } else {
      const getAllAgentIdArray = agentList.map((agent) => {
        return agent._id;
      });

      setIsCheckedAllCheckbox(true);
      setSelectedIds(getAllAgentIdArray);
    }
  };

  const onClickCheckbox = (agentId) => {
    if (selectedIds.includes(agentId)) {
      const removedIdArray = selectedIds.filter((id) => id !== agentId);
      setSelectedIds(removedIdArray);
      setIsCheckedAllCheckbox(false);
    } else {
      setSelectedIds([...selectedIds, agentId]);
    }
  };

  const getDropdownChange = (value) => {
    comingSoonNotification("Entries sorting");
  };

  const searchbarChange = (query) => {
    searchAgentName(query);
  };

  const searchAgentName = (agentNameQuery) => {
    const filteredAgentList = props.agentsData.filter((agent) => {
      return agent.name.toLowerCase().includes(agentNameQuery.toLowerCase());
    });
    setAgentList(filteredAgentList);
  };

  const addButtonClick = (value) => {
    setEditAddModalObj({
      isShow: true,
      type: "create",
      data: {},
    });
    setEditAddImage("");
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
      showEditAddModal(dataObj.data);
      setEditAddImage(dataObj.data.image);
    } else if (dataObj.type === "delete") {
      props.setDeleteModalObjData({
        isShow: true,
        text: `Are you sure to delete this "${dataObj.data.name}" agent?`,
        deleteActionType: "delete-agent",
        deleteData: dataObj.data,
      });
    }
  };

  const onClickEditAddModalConfirmButton = () => {
    const { data } = editAddModalObj;
    if (
      !data.name ||
      !data.email ||
      !data.phone_number ||
      !data.country ||
      !data.city ||
      !editAddImage
    ) {
      // check empty fields
      return toast.success("Please fill all the required fields.", {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 5000,
      });
    } else {
      // FormData is used for API requests that have image files inside
      const agentFormData = new FormData();
      agentFormData.append("image", editAddImage);
      agentFormData.append("name", editAddModalObj.data.name);
      agentFormData.append("email", editAddModalObj.data.email);
      agentFormData.append("phone_number", editAddModalObj.data.phone_number);
      agentFormData.append("country", editAddModalObj.data.country);
      agentFormData.append("city", editAddModalObj.data.city);

      if (editAddModalObj.type === "create") {
        props.createAgent({
          token: props.adminToken,
          agentData: agentFormData,
        });
      } else if (editAddModalObj.type === "update") {
        props.updateAgent({
          agentId: editAddModalObj.data._id,
          token: props.adminToken,
          agentData: agentFormData,
        });
      }

      hideEditAddModal();
    }
  };

  const handleEditAddFileUpload = (newFile) => {
    setEditAddImage(newFile);
  };

  const deleteEditAddFile = () => {
    setEditAddImage("");
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
    const params = new URLSearchParams(currentUrlQuery);
    const getShowAddModalQuery = params.get("show_add_modal");

    if (getShowAddModalQuery === "true") addButtonClick();
  }, [currentUrlQuery]); // eslint-disable-line

  useEffect(() => {
    setAgentList(props.agentsData);
  }, [props]);

  return (
    <div className="admin-agents__container">
      <AdminViewDashboard
        title="Agents"
        dropdownOptions={sortOptions}
        searchPlaceholder="Search by Name"
        subjectText="Agent"
        showBulkActions={selectedIds.length}
        getDropdownChange={getDropdownChange}
        searchbarChange={searchbarChange}
        addButtonClick={addButtonClick}
      >
        <AdminViewDashboard.Header />

        <AdminViewDashboard.Body>
          {props.isLoadingData ? (
            <AdminLoader type="agent" />
          ) : (
            <table cellSpacing={0}>
              {/* defining width for table-cells. */}
              <colgroup>
                <col style={{ width: "5%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "20%" }} />
              </colgroup>
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
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Image</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">City, Country</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>

              <tbody>
                {agentList.map((agent, index) => {
                  return (
                    <tr key={index} className={tableRowClass(index)}>
                      <td>
                        <label className="admin-checkbox">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(agent._id)}
                            id={agent._id}
                            name="agentId"
                            onChange={() => onClickCheckbox(agent._id)}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </td>
                      <td>{formatIdText(agent._id)}</td>
                      <td>{agent.name}</td>
                      <td>{agent.email}</td>
                      <td>
                        <img src={agent.image} alt={agent.name} />
                      </td>
                      <td>{agent.phone_number}</td>
                      <td>
                        {agent.city}, {agent.country}
                      </td>
                      <td className="button-list">
                        <button
                          type="button"
                          title="View Agent"
                          onClick={() =>
                            actionButtonClick({ type: "view", data: agent })
                          }
                        >
                          <i className="icon-eye" />
                        </button>
                        <button
                          type="button"
                          title="Update Agent"
                          onClick={() =>
                            actionButtonClick({ type: "update", data: agent })
                          }
                        >
                          <i className="icon-edit" />
                        </button>
                        <button
                          type="button"
                          title="Delete Agent"
                          onClick={() =>
                            actionButtonClick({ type: "delete", data: agent })
                          }
                        >
                          <i className="icon-delete-solid" />
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
        viewModalTitle="View Agent"
        isShowViewModal={viewModalObj.isShow}
        hideViewModal={() => setViewModal(false)}
      >
        <ViewModal.Header />

        <ViewModal.Body>
          <div className="view-modal__section">
            <h4 className="view-modal__title">Image</h4>

            <a
              href={viewModalObj.data.image}
              className="list__image-preview"
              target="_blank"
              rel="noreferrer"
            >
              {viewModalObj.data.image && (
                <img
                  src={viewModalObj.data.image}
                  alt="agent-pic"
                  className="image"
                />
              )}
              <div className="preview__view-image-sign">
                <i className="icon-eye sign-icon" />
                <p className="sign-text">View</p>
              </div>
            </a>
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
              <h4 className="view-modal__title">Email</h4>
              <h6 className="view-modal__subtitle">
                <strong>⊛</strong>
                {viewModalObj.data.email}
              </h6>
            </div>
          </div>
          <div className="view-modal__section">
            <h4 className="view-modal__title">Phone Number</h4>
            <h6 className="view-modal__subtitle">
              <strong>⊛</strong>
              {viewModalObj.data.phone_number}
            </h6>
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
        subjectText="Agent"
        hideEditAddModal={hideEditAddModal}
        onClickEditAddModalConfirmButton={onClickEditAddModalConfirmButton}
      >
        <EditAddModal.Header />
        <EditAddModal.Body>
          <div className="modal__content">
            <div className="content__image-upload-section">
              <h4 className="section-title">Upload your Agent image here</h4>
              <div className="section-controller">
                <div className={"controller__file-upload-container"}>
                  <FileUploader
                    multiple={false}
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

                {editAddImage && (
                  <div className="controller__file-preview-list list--margin-top">
                    <div className="list__image-preview">
                      <img
                        src={getImageUrl(editAddImage)}
                        alt="uploaded-agent"
                        className="image"
                      />
                      <button
                        type="button"
                        title="Delete Image"
                        className="image__delete-button icon-delete-solid"
                        onClick={deleteEditAddFile}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="content__details-section">
              <h4 className="section-title">
                Add your Agent description and necessary information from here
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
                    <label className="input-label" htmlFor="email">
                      Email
                    </label>
                  </div>
                  <input
                    className="input"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={editAddModalObj.data.email || ""}
                    onChange={(event) => handleEditAddInputChange(event)}
                  />
                </div>
                <div className="input-row row--1">
                  <div className="input-label__container">
                    <p className="required-mark">*</p>
                    <label className="input-label" htmlFor="phone_number">
                      Phone Number
                    </label>
                  </div>
                  <input
                    className="input"
                    id="phone_number"
                    name="phone_number"
                    type="number"
                    placeholder="Phone Number"
                    value={editAddModalObj.data.phone_number || ""}
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
    adminToken: state.LoginReducer.adminToken,
  };
};

const mapDispatchToProps = {
  createAgent,
  updateAgent,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminAgentsComponent);
