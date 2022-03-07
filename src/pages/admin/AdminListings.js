import React, { useEffect } from "react";
import { connect } from "react-redux";
import AdminListingsComponent from "../../components/Admin/AdminListingsComponent";

import { getListings, getAgents } from "../../actionCreators/AdminAction";

const AdminListings = (props) => {
  const setDeleteModalObjData = (data) => {
    props.setDeleteModalObjData(data);
  };

  useEffect(() => {
    if (!props.listingsData.length) props.getListings();
    if (!props.agentsData.length) props.getAgents();
  }, []); // eslint-disable-line

  return (
    <AdminListingsComponent setDeleteModalObjData={setDeleteModalObjData} />
  );
};

const mapStateToProps = (state) => {
  return {
    listingsData: state.AdminReducer.listingsData,
    agentsData: state.AdminReducer.agentsData,
  };
};

const mapDispatchToProps = {
  getListings,
  getAgents,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminListings);
