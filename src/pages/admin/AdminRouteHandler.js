import React, { useState } from "react";
import { connect } from "react-redux";
import { useRouteMatch, Switch, Route } from "react-router-dom";

import {
  deleteListing,
  deleteUser,
  deleteAgent,
} from "../../actionCreators/AdminAction";

import AdminNavbar from "../../components/Admin/AdminNavbar";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import "../../assets/styles/admin/adminnavbar.scss";
import "../../assets/styles/admin/adminsidebar.scss";
import "../../assets/styles/admin/admin.scss";

import AdminDashboard from "./AdminDashboard";
import AdminListings from "./AdminListings";
import AdminUsers from "./AdminUsers";
import AdminAgents from "./AdminAgents";
import AdminInquiries from "./AdminInquiries";
import AdminSettings from "./AdminSettings";

import AccountSettingsModal from "../../components/AccountSettingsModal";
import DeleteModal from "../../utilities/DeleteModal";

const AdminRouteHandler = (props) => {
  const routeMatcher = useRouteMatch(); // match current path ( e.g '/admin', '/admin/settings' ) depend on which route it's in
  const [deleteModalObj, setDeleteModalObj] = useState({
    isShow: false,
    title: "Warning",
    text: "Are you sure to delete this user?",
    deleteData: {},
    deleteActionType: "delete-user",
  });
  const [isAccountSettingsModalShow, setIsAccountSettingsModalShow] =
    useState(false);

  const setAccountSettingsModal = (boolean) => {
    setIsAccountSettingsModalShow(boolean);
  };

  const setDeleteModalObjData = (data) => {
    setDeleteModalObj({
      isShow: data.isShow,
      title: data.title || deleteModalObj.title,
      text: data.text || deleteModalObj.text,
      deleteData: data.deleteData || deleteModalObj.deleteData,
      deleteActionType:
        data.deleteActionType || deleteModalObj.deleteActionType,
    });
  };

  const onClickDeleteModalConfirmButton = () => {
    if (deleteModalObj.deleteActionType === "delete-listing") {
      props.deleteListing({
        listingId: deleteModalObj.deleteData._id,
        token: props.adminToken,
      });
    } else if (deleteModalObj.deleteActionType === "delete-user") {
      props.deleteUser({
        userId: deleteModalObj.deleteData._id,
        token: props.adminToken,
      });
    } else if (deleteModalObj.deleteActionType === "delete-agent") {
      props.deleteAgent({
        agentId: deleteModalObj.deleteData._id,
        token: props.adminToken,
      });
    }
  };

  const hideDeleteModal = () => {
    setDeleteModalObjData({ isShow: false });
  };

  return (
    <main className="admin-site__container">
      <AdminSidebar />
      <section className="admin-content__container">
        <AdminNavbar setAccountSettingsModal={setAccountSettingsModal} />
        <div className="admin-content">
          <Switch>
            <Route exact path={routeMatcher.path}>
              <AdminDashboard />
            </Route>

            <Route exact path={`${routeMatcher.path}/listings`}>
              <AdminListings setDeleteModalObjData={setDeleteModalObjData} />
            </Route>

            <Route exact path={`${routeMatcher.path}/users`}>
              <AdminUsers setDeleteModalObjData={setDeleteModalObjData} />
            </Route>

            <Route exact path={`${routeMatcher.path}/agents`}>
              <AdminAgents setDeleteModalObjData={setDeleteModalObjData} />
            </Route>

            <Route exact path={`${routeMatcher.path}/inquiries`}>
              <AdminInquiries />
            </Route>

            <Route exact path={`${routeMatcher.path}/settings`}>
              <AdminSettings
                setAccountSettingsModal={setAccountSettingsModal}
              />
            </Route>
          </Switch>
        </div>
      </section>

      <AccountSettingsModal
        isAdmin={true}
        isAccountSettingsModalShow={isAccountSettingsModalShow}
        hideModal={() => setAccountSettingsModal(false)}
      />
      <DeleteModal
        isShowDeleteModal={deleteModalObj.isShow}
        deleteModalTitle={deleteModalObj.title}
        deleteModalText={deleteModalObj.text}
        hideDeleteModal={hideDeleteModal}
        onClickDeleteModalConfirmButton={onClickDeleteModalConfirmButton}
      />
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    adminToken: state.LoginReducer.adminToken,
  };
};

const mapDispatchToProps = {
  deleteListing,
  deleteUser,
  deleteAgent,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminRouteHandler);
