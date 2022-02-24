import React from "react";
import Dropdown from "./Dropdown";
import { toast } from "react-toastify";

import "./styles/adminViewDashboard.scss";

// Vue Slot in React Reference -> https://medium.com/@srph/react-imitating-vue-slots-eab8393f96fd
// Important! Header, Body & Footer are necessary part in React, removing 1 of them either in this component / on the usage will lead to an error

const Header = () => {
  return null;
};

const Body = () => {
  return null;
};

const Footer = () => {
  return null;
};

class AdminViewDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQueryInput: '',
    };
  }

  static Header = Header;
  static Body = Body;
  static Footer = Footer;

  // ---------------------
  // < ---- Computed ---- >
  // ---------------------

  BulkActionSection = () => {
    if (this.props.showBulkActions) {
      return (
        <div className="bulk-button-list">
          <button type="text" className="action-button button--margin-y" onClick={this.comingSoonNotification}>
            <i className="icon-edit" />
            <p>Bulk Update</p>
          </button>
          <button type="text" className="action-button" onClick={this.comingSoonNotification}>
            <i className="icon-delete-solid" />
            <p>Bulk Delete</p>
          </button>
        </div>
      );
    } 

    return null;
  };

  // ---------------------
  // < ---- Methods ---- >
  // ---------------------
  
  getDropdownChange = (value) => {
    this.props.getDropdownChange(value); // emit event to parent
  };

  addButtonClick = () => {
    this.props.addButtonClick(); // emit event to parent
  };

  handleSearchKeyDown = (event) => {
    const searchQueryInput = this.state.searchQueryInput;
    if (event.key === 'Enter') this.props.searchbarChange(searchQueryInput); // emit event to parent
  };

  handleSearchInput = (event) => {
    let { value } = event.currentTarget;
    this.setState({ searchQueryInput: value });
  };

  comingSoonNotification = () => {
    toast.success('Bulk actions feature will come soon.', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
    });
  };

  render() {
    const { children } = this.props;
    const header = children.find((child) => child.type === Header);
    const body = children.find((child) => child.type === Body);
    const footer = children.find((child) => child.type === Footer);

    const {
      title,
      dropdownOptions,
      searchPlaceholder, 
      subjectText,
      showBulkActions,
      noScroller,
    } = this.props;

    const {
      getDropdownChange,
      addButtonClick,
      handleSearchKeyDown,
      handleSearchInput,
      BulkActionSection,
    } = this;

    return (
      <div className="admin-view">
        <header>{header ? header.props.children : null}</header>

        <div className="admin-view__navbar">
          <h4 className="navbar-title">{title}</h4>

          <div className="navbar-tools">
            <div className="dropdown">
              <Dropdown
                options={dropdownOptions}
                getDropdownValue={getDropdownChange}
                isDark
              />
            </div>
            <input
              className="search-bar"
              placeholder={searchPlaceholder}
              onChange={(event) => handleSearchInput(event)}
              onKeyDown={(event) => handleSearchKeyDown(event)}
            />
            <button type="text" className={"action-button " + (!showBulkActions ? "button--long" : '')} onClick={addButtonClick}>
              <i className="icon-add" />
              <p>Add {subjectText}</p>
            </button>

            {BulkActionSection()}

          </div>
        </div>

        <div className={"admin-view__content " + (noScroller ? 'content--no-scroller' : '')}>
          {body ? body.props.children : null}
        </div>

        {/* pagination */}

        <footer>{footer ? footer.props.children : null}</footer>
      </div>
    );
  }
};

export default AdminViewDashboard;
