import React from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const AdminSettingsComponent = (props) => {
  const history = useHistory();
  const settingsList = [
    {
      title: "Staff Members",
      subtitle: "Manage your team or Asia Property members.",
      value: "staff-members",
      icon: "icon-team",
    },
    {
      title: "Account Settings",
      subtitle: "View and update your account settings.",
      value: "account-settings",
      icon: "icon-user-line",
    },
    {
      title: "Add Listing",
      subtitle: "Add a new Asia Property listing.",
      value: "add-listing",
      icon: "icon-property",
    },
    {
      title: "Add User",
      subtitle: "Add a new Asia Property user.",
      value: "add-user",
      icon: "icon-user",
    },
    {
      title: "Add Agent",
      subtitle: "Add a new Asia Property agent.",
      value: "add-agent",
      icon: "icon-agent",
    },
    {
      title: "Add Inquiry",
      subtitle: "Add a new Asia Property inquiry.",
      value: "add-inquiry",
      icon: "icon-coins",
    },
  ];

  // ---------------------
  // < ---- Methods ---- >
  // ---------------------

  const onClickSettingButton = (type) => {
    if (type === "account-settings") props.setAccountSettingsModal(true);
    else if (type === "staff-members") history.push("/admin/users");
    else if (type === "add-listing")
      history.push("/admin/listings?show_add_modal=true");
    else if (type === "add-user")
      history.push("/admin/users?show_add_modal=true");
    else if (type === "add-agent")
      history.push("/admin/agents?show_add_modal=true");
    else if (type === "add-inquiry") comingSoonNotification("Add inquiry");
  };

  const comingSoonNotification = (featureName) => {
    toast.success(`${featureName} feature will come soon.`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
    });
  };

  return (
    <div className="admin-settings__container">
      {settingsList.map((setting, index) => {
        return (
          <button
            type="button"
            key={index}
            className="setting-button"
            onClick={() => onClickSettingButton(setting.value)}
          >
            <i className={"setting-icon " + setting.icon} />
            <div className="setting-header">
              <h4 className="item-title">{setting.title}</h4>
              <h4 className="item-subtitle">{setting.subtitle}</h4>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default AdminSettingsComponent;
