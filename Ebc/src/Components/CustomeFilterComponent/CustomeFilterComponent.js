import React from "react";
import TextFieldComponent from "../../Components/TextFieldComponent/TextFieldComponent";
import CustomeDropDown from "../../Components/CustomeDropDown/CustomeDropDown";
import PropTypes from "prop-types";
import {
  Scope_Listing,
  Scope_Listing_Status,
  Status_List,
  status,
} from "../../Components/staticDropdownData";
import {
  bids_action,
  bids_action_data,
} from "../../Components/staticDropdownData";
import DatePicker from "react-datepicker";
import { useLocation } from "react-router-dom";

const CustomeFilterComponent = ({
  handleChangeDate,
  start_date,
  Scope_Listing,
  id,
  status,
  statusId,
  updateStatusDropdown,
  bids_action,
  actionID,
  updateActionDropdown,
  title,  
  updateDropdown,
  handleAddBids,
  ...rest
}) => {
  const location = useLocation();

  return (
    <div className="title-page-content d-flex mt-2 justify-content-between mr-0">
      {location.pathname !== "/trade" ? <h5>{title}</h5> : <></>}
      <>
        <div className="datepicker">
          <DatePicker
            dateFormat="MM-dd-yyyy"
            className="form-control text-field-component custom_text_field"
            selected={start_date}
            placeholderText="Select Date"
            onChange={handleChangeDate}
          />
        </div>

        <CustomeDropDown
          className="dropdown_custom bids_dropdown"
          data={Scope_Listing}
          placeholder="Select Scope"
          value={Scope_Listing_Status(id)}
          onSelect={updateDropdown}
        />

        <CustomeDropDown
          className="dropdown_custom bids_dropdown"
          data={status}
          placeholder="Select Status"
          value={Status_List(statusId)}
          onSelect={updateStatusDropdown}
        />
      </>
      {/* <div> */}
        {/* <CustomeDropDown
          className="dropdown_custom_bids"
          data={bids_action}
          placeholder="Action"
          value={bids_action_data(actionID)}
          onSelect={updateActionDropdown}
        /> */}

      <button
          className="btn  btn-icon-text custom-btn"
          onClick={handleAddBids}
        >
          Add Bids
        </button>
      {/* </div> */}
    </div>
  );
};

CustomeFilterComponent.defaultProps = {
  textFieldLabelClassName: "",
  textFieldClassName: "",
  textFieldName: "",
  textFieldId: "",
  textFieldType: "",
  textFieldValue: "",
  textFieldOnChange: () => {},
  count: 2,
  dropdown_1_className: "",
  dropdown_1_placeholder: "",
  dropdown_1_value: "",
  dropdown_1_onSelect: () => {},
  dropdown_2_className: "",
  dropdown_2_placeholder: "",
  dropdown_2_value: "",
  dropdown_2_onSelect: () => {},
  btnClassName: "",
  btnOnClick: () => {},
};

CustomeFilterComponent.propTypes = {
  textFieldLabelClassName: PropTypes.string,
  textFieldClassName: PropTypes.string,
  textFieldName: PropTypes.string,
  textFieldId: PropTypes.string,
  textFieldType: PropTypes.string,
  textFieldValue: PropTypes.string,
  textFieldOnChange: PropTypes.func,
  count: PropTypes.number,
  dropdown_1_className: PropTypes.string,
  dropdown_1_data: PropTypes.instanceOf(Array).isRequired,
  dropdown_1_placeholder: PropTypes.string,
  dropdown_1_value: PropTypes.string,
  dropdown_1_onSelect: PropTypes.func,
  dropdown_2_className: PropTypes.string,
  dropdown_2_data: PropTypes.instanceOf(Array).isRequired,
  dropdown_2_placeholder: PropTypes.string,
  dropdown_2_value: PropTypes.string,
  dropdown_2_onSelect: PropTypes.func,
  btnClassName: PropTypes.string,
  btnOnClick: PropTypes.func,
};
export default CustomeFilterComponent;

// <CustomeFilterComponent
// count={customeFieldCount}
// textFieldLabelClassName="custome_label"
// textFieldClassName="custome_label"
// textFieldName="startTS"
// textFieldId="startTS"
// textFieldType="date"
// textFieldValue={moment(startTS).format("yyyy-MM-DD")}
// textFieldOnChange={handleChangeDate}
// dropdown_1_data={Scope_Listing}
// dropdown_1_className="dropdown_custom bids_dropdown"
// dropdown_1_placeholder="Select Scope"
// dropdown_1_value={Scope_Listing_Status(id)}
// dropdown_1_onSelect={(e) => {
//   updateDropdown(e);
// }}
// dropdown_2_data={status}
// dropdown_2_className="dropdown_custom bids_dropdown"
// dropdown_2_placeholder="Select Status"
// dropdown_2_value={Status_List(statusId)}
// dropdown_2_onSelect={(e) => {
//   updateStatusDropdown(e);
// }}
// btnClassName="btn  btn-icon-text mb-2 mb-md-0 custom-btn"
// btnOnClick={handleAddBids}
// btnTitle="Add Bids"
// />
