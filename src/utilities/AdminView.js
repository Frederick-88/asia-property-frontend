import React from "react";
import "./styles/adminView.scss";

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

class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static Header = Header;
  static Body = Body;
  static Footer = Footer;

  /* content :
  a. navbar
  - title
  - 2 dropdowns = 1 to select the column titles, 1 to select ascending or descending.
  - searchbar
  - add button
  b. body
  - content columns ( using <slot/> because assigning table contents cannot dynamic. we are the one who knows the field inside html loop. But still, the css will be only one. )
  */

  /* props :
  a. navbar: {
    title: '',
    dropdown1: [], ( each object inside consist of -> name: '', value: '' )
    dropdown2: [], ( each object inside consist of -> name: '', value: '' )
    searchPlaceholder: '',
    addButtonText: '',
  }
  */

  /* events :
  a. props.dropdownChange -> change of dropdowns
  b. props.searchbarChange -> change of searchbar
  c. props.addButtonClick -> clicked add button
  */

  // ----------------------
  // < ---- Computed ---- >
  // ----------------------

  //

  // ---------------------
  // < ---- Methods ---- >
  // ---------------------

  dropdownChange = () => {
    this.props.dropdownChange(); // emit event to parent
  };

  searchbarChange = () => {
    this.props.searchbarChange(); // emit event to parent
  };

  addButtonClick = () => {
    this.props.addButtonClick(); // emit event to parent
  };

  render() {
    const { children } = this.props;
    const header = children.find((child) => child.type === Header);
    const body = children.find((child) => child.type === Body);
    const footer = children.find((child) => child.type === Footer);

    const {
      title,
      dropdown1,
      dropdown2, 
      searchPlaceholder, 
      addButtonText 
    } = this.props;

    return (
      <div className="admin-view">
        <header>{header ? header.props.children : null}</header>

        <div className="admin-view__navbar">
          <h4 className="navbar-title">{title}</h4>

          <div className="navbar-tools">
            <div className="dropdown" />
            <div className="search-bar" />
            <div className="add-button" />
          </div>
        </div>

        <div className="admin-view__content">
          {body ? body.props.children : null}
        </div>

        <footer>{footer ? footer.props.children : null}</footer>
      </div>
    );
  }
};

export default AdminView;
