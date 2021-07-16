import React from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";
function CustomeDropDown({
  data,
  value,
  drop,
  className,
  filterDropdown,
  noOptionsMessage,
  isDisabled,
  placeholder,
  inputClassName,
  ...rest
}) {
  return (
    <div className="dropdown-component">
      <Dropdown
        drop={drop}
        className={`custom-dropdown ${inputClassName}`}
        focusFirstItemOnShow
        {...rest}
        alignRight
      >
        <Dropdown.Toggle
          disabled={isDisabled}
          id="inputState"
          className={`form-control minimal ${className} `}
          variant="link"
        >
          {value === "" || !data.find((item) => item.value === value)
            ? placeholder
            : value}
        </Dropdown.Toggle>

        <Dropdown.Menu
          flip={false}
          className={`form-control ${filterDropdown ? "filter" : ""}`}
        >
          {data.length === 0 ? (
            <Dropdown.Item disabled className="no-option-message">
              {noOptionsMessage}
            </Dropdown.Item>
          ) : (
            data.map((x) => {
              // console.log("dropdown", x);
              return (
                <Dropdown.Item
                  key={x.id}
                  eventKey={x.id}
                  className={` ${
                    filterDropdown ? "filter" : ""
                  }`}
                  active={x.value === value}
                >
                  {x.value}
                </Dropdown.Item>
              );
            })
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

CustomeDropDown.defaultProps = {
  value: "",
  drop: "down",
  filterDropdown: false,
  className: "",
  inputClassName: "",
  noOptionsMessage: "",
  isDisabled: false,
  placeholder: "Select",
};
CustomeDropDown.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  value: PropTypes.string,
  drop: PropTypes.oneOf(["up", "left", "right", "down"]),
  filterDropdown: PropTypes.bool,
  className: PropTypes.string,
  noOptionsMessage: PropTypes.string,
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.string,
  inputClassName: PropTypes.string,
};

export default CustomeDropDown;
