import React, { useEffect } from "react";
import { connect } from "react-redux";
import AdminAgentsComponent from "../../components/Admin/AdminAgentsComponent";

import { getAgents } from "../../actionCreators/AdminAction";

const AdminAgents = (props) => {
  const setDeleteModalObjData = (data) => {
    props.setDeleteModalObjData(data);
  };

  useEffect(() => {
    if (!props.agentsData.length) props.getAgents();
  }, [props]);

  return <AdminAgentsComponent setDeleteModalObjData={setDeleteModalObjData} />;
};

const mapStateToProps = (state) => {
  return {
    agentsData: state.AdminReducer.agentsData,
  };
};

const mapDispatchToProps = {
  getAgents,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminAgents);
