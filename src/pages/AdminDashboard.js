import React from "react";
import AdminDashboardComponent from "../components/Admin/AdminDashboardComponent";

import "../assets/styles/admin/admindashboard.scss";

const AdminDashboard = (props) => {
  return (
    <div className="admin-dashboard__container">
      <AdminDashboardComponent />
    </div>
  );
};

export default AdminDashboard;
