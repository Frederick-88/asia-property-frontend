import React, { useEffect } from "react";
import { connect } from "react-redux";
import AdminInquiriesComponent from "../../components/Admin/AdminInquiriesComponent";

import { getInquiries } from "../../actionCreators/AdminAction";

const AdminInquiries = (props) => {
  useEffect(() => {
    if (!props.inquiriesData.length) props.getInquiries();
  }, [props]);

  return <AdminInquiriesComponent />;
};

const mapStateToProps = (state) => {
  return {
    inquiriesData: state.AdminReducer.inquiriesData,
  };
};

const mapDispatchToProps = {
  getInquiries,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminInquiries);
