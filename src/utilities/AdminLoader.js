import React from "react";
import "./styles/adminLoader.scss";

const AdminLoader = (props) => {
  const iconList = {
    listing: "icon-property",
    agent: "icon-agent",
    user: "icon-team",
    inquiry: "icon-money",
  };

  const textList = {
    listing: "Listings",
    agent: "Agents",
    user: "Users",
    inquiry: "Inquiries",
  };

  const iconClass = () => {
    return `loader__middle-icon ${iconList[props.type]}`;
  };

  return (
    <div className="admin-loader__container">
      <div className="admin-loader">
        <div className="loader" />
        <i className={iconClass()} />
      </div>
      <p className="loader__text">Loading {textList[props.type]} ...</p>
    </div>
  );
};

export default AdminLoader;
