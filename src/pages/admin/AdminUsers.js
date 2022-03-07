import React, { useEffect } from "react";
import { connect } from "react-redux";
import AdminUsersComponent from "../../components/Admin/AdminUsersComponent";

import { getUsers } from "../../actionCreators/AdminAction";

const AdminUsers = (props) => {
  const setDeleteModalObjData = (data) => {
    props.setDeleteModalObjData(data);
  };

  useEffect(() => {
    if (!props.usersData.length) props.getUsers();
  }, [props]);

  return <AdminUsersComponent setDeleteModalObjData={setDeleteModalObjData} />;
};

const mapStateToProps = (state) => {
  return {
    usersData: state.AdminReducer.usersData,
  };
};

const mapDispatchToProps = {
  getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers);
