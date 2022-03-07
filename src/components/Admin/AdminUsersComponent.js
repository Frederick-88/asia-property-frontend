import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FileUploader } from "react-drag-drop-files";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { createUser, updateUser } from "../../actionCreators/AdminAction";

import AdminViewDashboard from "../../utilities/AdminViewDashboard";
import ViewModal from "../../utilities/ViewModal";
import EditAddModal from "../../utilities/EditAddModal";
import Dropdown from "../../utilities/Dropdown";
import AdminLoader from "../../utilities/AdminLoader";

const AdminUsersComponent = (props) => {
  const currentUrlQuery = useLocation().search;
  const allowedUploadFileTypes = ["JPEG", "PNG", "JPG"];
  const sortOptions = [
    {
      name: "Id",
      value: "id",
    },
    {
      name: "Username",
      value: "username",
    },
    {
      name: "Role",
      value: "role",
    },
    {
      name: "Email",
      value: "email",
    },
    {
      name: "Phone Number",
      value: "phone_number",
    },
  ];
  const listingRoleOptions = [
    {
      name: "User",
      value: "user",
    },
    {
      name: "Admin",
      value: "admin",
    },
  ];
  const [isCheckedAllCheckbox, setIsCheckedAllCheckbox] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [userList, setUserList] = useState([]);
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
    return userList.length === index + 1 ? "table-row--is-last" : "";
  };

  const getImageUrl = (file) => {
    const isHttpsUrl = typeof file === "string" && file.includes("http");
    return isHttpsUrl ? file : URL.createObjectURL(file);
  };

  // ---------------------
  // < ---- Methods ---- >
  // ---------------------

  const checkAllCheckbox = () => {
    if (isCheckedAllCheckbox) {
      setIsCheckedAllCheckbox(false);
      setSelectedIds([]);
    } else {
      const getAllUserIdArray = userList.map((user) => {
        return user._id;
      });

      setIsCheckedAllCheckbox(true);
      setSelectedIds(getAllUserIdArray);
    }
  };

  const onClickCheckbox = (userId) => {
    if (selectedIds.includes(userId)) {
      const removedIdArray = selectedIds.filter((id) => id !== userId);
      setSelectedIds(removedIdArray);
      setIsCheckedAllCheckbox(false);
    } else {
      setSelectedIds([...selectedIds, userId]);
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
    searchUsername(query);
  };

  const searchUsername = (usernameQuery) => {
    const filteredUserList = props.usersData.filter((user) => {
      return user.username.toLowerCase().includes(usernameQuery.toLowerCase());
    });
    setUserList(filteredUserList);
  };

  const addButtonClick = () => {
    setEditAddModalObj({
      isShow: true,
      type: "create",
      data: {
        role: listingRoleOptions[0].value,
      },
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
        text: `Are you sure to delete this "${dataObj.data.username}" user?`,
        deleteActionType: "delete-user",
        deleteData: dataObj.data,
      });
    }
  };

  const onClickEditAddModalConfirmButton = () => {
    const { data } = editAddModalObj;

    if (
      !editAddImage ||
      (editAddModalObj.type === "create" && !data.password) ||
      !data.username ||
      !data.email ||
      !data.role ||
      !data.phone_number
    ) {
      // check empty fields
      return toast.success("Please fill all the required fields.", {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 5000,
      });
    } else {
      // FormData is used for API requests that have image files inside
      const userFormData = new FormData();
      userFormData.append("image", editAddImage);
      userFormData.append("username", data.username.toLowerCase());
      userFormData.append("email", data.email);
      userFormData.append("role", data.role);
      userFormData.append("phone_number", data.phone_number);

      if (editAddModalObj.type === "create") {
        userFormData.append("password", data.password);

        props.createUser({
          token: props.adminToken,
          userData: userFormData,
        });
      } else if (editAddModalObj.type === "update") {
        props.updateUser({
          userId: data._id,
          token: props.adminToken,
          userData: userFormData,
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
    setUserList(props.usersData);
  }, [props]);

  return (
    <div className="admin-users__container">
      <AdminViewDashboard
        title="Users"
        dropdownOptions={sortOptions}
        searchPlaceholder="Search by Username"
        subjectText="User"
        showBulkActions={selectedIds.length}
        getDropdownChange={getDropdownChange}
        searchbarChange={searchbarChange}
        addButtonClick={addButtonClick}
      >
        <AdminViewDashboard.Header />

        <AdminViewDashboard.Body>
          {props.isLoadingData ? (
            <AdminLoader type="user" />
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
                  <th scope="col">Username</th>
                  <th scope="col">Role</th>
                  <th scope="col">Email</th>
                  <th scope="col">Image</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>

              <tbody>
                {userList.map((user, index) => {
                  return (
                    <tr key={index} className={tableRowClass(index)}>
                      <td>
                        <label className="admin-checkbox">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(user._id)}
                            id={user._id}
                            name="userId"
                            onChange={() => onClickCheckbox(user._id)}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </td>
                      <td>{user._id}</td>
                      <td>{user.username}</td>
                      <td>{user.role}</td>
                      <td>{user.email}</td>
                      <td>
                        <img src={user.image} alt={user.username} />
                      </td>
                      <td>{user.phone_number}</td>
                      <td className="button-list">
                        <button
                          type="button"
                          title="View User"
                          onClick={() =>
                            actionButtonClick({ type: "view", data: user })
                          }
                        >
                          <i className="icon-eye" />
                        </button>
                        <button
                          type="button"
                          title="Update User"
                          onClick={() =>
                            actionButtonClick({ type: "update", data: user })
                          }
                        >
                          <i className="icon-edit" />
                        </button>
                        <button
                          type="button"
                          title="Delete User"
                          onClick={() =>
                            actionButtonClick({ type: "delete", data: user })
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
        viewModalTitle="View User"
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
                  alt="user-pic"
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
              <h4 className="view-modal__title">Username</h4>
              <h6 className="view-modal__subtitle">
                <strong>⊛</strong>
                {viewModalObj.data.username}
              </h6>
            </div>
            <div className="view-modal__column">
              <h4 className="view-modal__title">Role</h4>
              <h6 className="view-modal__subtitle">
                <strong>⊛</strong>
                {viewModalObj.data.role}
              </h6>
            </div>
          </div>
          <div className="view-modal__section section--row row--2">
            <div className="view-modal__column">
              <h4 className="view-modal__title">Email</h4>
              <h6 className="view-modal__subtitle">
                <strong>⊛</strong>
                {viewModalObj.data.email}
              </h6>
            </div>
            <div className="view-modal__column">
              <h4 className="view-modal__title">Phone Number</h4>
              <h6 className="view-modal__subtitle">
                <strong>⊛</strong>
                {viewModalObj.data.phone_number}
              </h6>
            </div>
          </div>
        </ViewModal.Body>

        <ViewModal.Footer />
      </ViewModal>

      <EditAddModal
        isShow={editAddModalObj.isShow}
        editAddModalObjType={editAddModalObj.type}
        subjectText="User"
        hideEditAddModal={hideEditAddModal}
        onClickEditAddModalConfirmButton={onClickEditAddModalConfirmButton}
      >
        <EditAddModal.Header />
        <EditAddModal.Body>
          <div className="modal__content">
            <div className="content__image-upload-section">
              <h4 className="section-title">Upload your User image here</h4>
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
                        alt="uploaded-user"
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
                Add your User description and necessary information from here
              </h4>
              <div className="section-controller content__input-list">
                <div className="input-row row--1">
                  <div className="input-label__container">
                    <p className="required-mark">*</p>
                    <label className="input-label" htmlFor="username">
                      Username
                    </label>
                  </div>
                  <input
                    className="input"
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={editAddModalObj.data.username || ""}
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
                    <label className="input-label" htmlFor="role">
                      Role
                    </label>
                  </div>
                  <Dropdown
                    extraClass="dropdown"
                    maxWidth="100%"
                    options={listingRoleOptions}
                    value={editAddModalObj.data.role}
                    getDropdownValue={(event) =>
                      getDropdownChange(event, "edit-add-role")
                    }
                    isDark
                  />
                </div>
                {editAddModalObj.type === "create" && (
                  <div className="input-row row--1">
                    <div className="input-label__container">
                      <p className="required-mark">*</p>
                      <label className="input-label" htmlFor="password">
                        Password
                      </label>
                    </div>
                    <input
                      className="input"
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={editAddModalObj.data.password || ""}
                      onChange={(event) => handleEditAddInputChange(event)}
                    />
                  </div>
                )}
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
    usersData: state.AdminReducer.usersData,
    adminToken: state.LoginReducer.adminToken,
  };
};

const mapDispatchToProps = {
  createUser,
  updateUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUsersComponent);
