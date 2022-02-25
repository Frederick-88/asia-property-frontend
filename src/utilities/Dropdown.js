import React, { useEffect, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import "./styles/dropdown.scss";

const Dropdown = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const {
    extraClass,
    options,
    placeholder,
    value,
    maxWidth,
    maxHeight,
    isDark,
  } = props;

  // -------------------------------------------------
  // < --------------------------------------------- >
  // -------------------------------------------------

  const selectedOptionName = () => {
    const selectedOption = options.find(
      (option) => option.value === selectedValue
    );

    if (selectedOption && selectedOption.name) return selectedOption.name;
    return placeholder;
  };

  const dropdownStyle = () => {
    const styleObject = {};
    let maxWidthValue = "300px";

    if (maxWidth) {
      // check if user send "100px" or just 100
      maxWidthValue = typeof maxWidth === "string" ? maxWidth : `${maxWidth}px`;
    }

    styleObject.maxWidth = maxWidthValue;

    return styleObject;
  };

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
    const cssClass = ["global-dropdown"];

    if (isDark) cssClass.push("is-dark");
    if (isActive) cssClass.push("is-active");
    if (extraClass) cssClass.push(extraClass);

    return cssClass.join(" ");
  };

  const liClass = (option) => {
    const isSelected = option.value === selectedValue;
    return isSelected
      ? "global-dropdown__item is-selected"
      : "global-dropdown__item";
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

  const reactClickOutside = useDetectClickOutside({
    onTriggered: closeDropdown,
  });

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
      ref={reactClickOutside}
      style={dropdownStyle()}
    >
      <button
        type="button"
        className="global-dropdown__selected"
        onClick={() => setIsActive(!isActive)}
      >
        <span className="name">{selectedOptionName()}</span>
        <i className="icon icon-chevron-down"></i>
      </button>

      <div className="global-dropdown__content" style={dropdownContentStyle()}>
        <ul className="global-dropdown__list">
          {options.map((option) => {
            return (
              <li
                key={option.value}
                className={liClass(option)}
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
