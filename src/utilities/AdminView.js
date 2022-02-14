import React, { useEffect, useState } from "react";
import "./styles/adminView.scss";

const Dropdown = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

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

  // -----------------------------------------------------
  const { options, placeholder, value, maxWidth, maxHeight } = props;

  // -------------------------------------------------
  // < --------------------------------------------- >
  // -------------------------------------------------

  const dropdownContentStyle = () => {
    const styleObject = {};
    let maxHeightValue = "300px";

    if (maxHeight) {
      // check if user send "100px" or just 100
      maxHeightValue =
        typeof maxHeight === "string" ? maxHeight : `${maxHeight}px`;
    }

    styleObject.maxHeight = maxHeightValue;

    return styleObject;
  };

  const dropdownClass = () => {
    return isActive ? "global-dropdown is-active" : "global-dropdown";
  };

  // -------------------------------------------------
  // < --------------------------------------------- >
  // -------------------------------------------------

  const closeDropdown = () => {
    setIsActive(false);
  };

  const setValue = (value) => {
    // if nothing is passed, use the first option in given options
    const isValueExist = value || options[0].value;
    if (!isValueExist) {
      console.error("Missing value");
      return;
    }

    setSelectedValue(isValueExist);
    props.getDropdownValue(isValueExist); // emit value to parent
    closeDropdown();
  };

  // -------------------------------------------------
  // < --------------------------------------------- >
  // -------------------------------------------------

  useEffect(() => {
    // if there is no placeholder,
    // use value or first option in the list given
    if (placeholder) {
      return;
    } else if (!placeholder && value) {
      setSelectedValue(value);
    } else {
      setSelectedValue(options[0].value);
    }
  }, [options, placeholder, value]);

  return (
    <div
      className={dropdownClass()}
    >
      <button
        type="button"
        className="global-dropdown__selected"
        onClick={() => setIsActive(!isActive)}
      >
        <i className="icon icon-chevron-down"></i>
      </button>

      <div className="global-dropdown__content" style={dropdownContentStyle()}>
        <ul className="global-dropdown__list">
          {options.map((option) => {
            return (
              <li
                key={option.value}
                onClick={() => setValue(option.value)}
              >
                {option.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
