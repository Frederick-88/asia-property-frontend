import React from "react";
import AdminSettingsComponent from "../../components/Admin/AdminSettingsComponent";

const AdminSettings = (props) => {
  const setAccountSettingsModal = (boolean) => {
    props.setAccountSettingsModal(boolean);
  };

  return (
    <AdminSettingsComponent setAccountSettingsModal={setAccountSettingsModal} />
  );
};

export default AdminSettings;
