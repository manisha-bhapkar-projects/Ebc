import React, { useState } from "react";
import TextFieldComponent from "../../Components/TextFieldComponent/TextFieldComponent";
import "../../assets/css/style.css";
import { callAddDeviceApi } from "../../Action/DeviceAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { CustomeNotification } from "../../Components/CustomeNotification/CustomeNotification";
import constants from "../../utils/constants";
import { useHistory } from "react-router-dom";

const AddNewDevice = (props) => {
  const [date, setDate] = useState(null);
  const [isOpenDate, setIsOpenDate] = useState(false);
  const history = useHistory();
  const [initialValues, setInitialValues] = useState({
    deviceName: "",
    deviceGroup: "",
    manufacturer: "",
    manufacturerId: "",
    modelId: "",
    serialId: "",
    deviceType: "",
    deviceSubType: "",
    commissionDate: "",
    endServiceDate: "",
    storageKWH: 0,
    capacityKVA: 0,
  });
  const [isError, setIsError] = useState({});
  const [isFocus, setIsFocus] = useState({});

  const request = {
    deviceName: initialValues.deviceName,
    deviceGroup: initialValues.deviceGroup,
    manufacturer: initialValues.manufacturer,
    manufacturerId: initialValues.manufacturerId,
    modelId: initialValues.modelId,
    serialId: initialValues.serialId,
    deviceType: initialValues.deviceType,
    deviceSubType: initialValues.deviceSubType,
    commissionDate: initialValues.commissionDate,
    endServiceDate: initialValues.endServiceDate,
    storageKWH: parseInt(initialValues.storageKWH),
    capacityKVA: parseInt(initialValues.capacityKVA),
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate(initialValues);
    setIsError(validation);

    props
      .callAddDeviceApiAction(request)
      .then((res) => {
        history.push(constants.ROUTE.SIDEBAR.DEVICE);
        CustomeNotification(
          "success",
          "Device Added Successfully",
          "Success",
          2000
        );
      })
      .catch((error) => {
        if (error?.response?.data?.message) {
          CustomeNotification(
            "error",
            error.response.data.message,
            "Error",
            2500,
            () => {}
          );
        }
      });
  };

  const handleChangeValue = (e) => {
    setInitialValues({
      ...initialValues,
      [e.target.name]: e.target.value,
    });
    setIsError({ ...isError, [e.target.name]: "" });
  };
  {
    console.log("initialValues", initialValues);
  }
  const validate = (values) => {
    let errors = {};
    return errors;
  };

  const handleFocus = (e) => {
    const validation = validate(initialValues);
    setIsError(validation);
    setIsFocus({ ...isFocus, [e.target.name]: true });
  };

  return (
    <div>
      <div className="main-pg-content mr-5">
        <h5 className="title-page-content"> Add New Device</h5>
        <div className="row">
          <div className="col-sm-5">
            <div className="acount-info add-device-form">
              <form action>
                <div className="form-group row align-items-center">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-4 col-form-label"
                  >
                    Device Name:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="deviceName"
                      id="deviceName"
                      type="text"
                      value={initialValues.deviceName}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.deviceName}
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-4 col-form-label"
                  >
                    Device Group:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="deviceGroup"
                      id="deviceGroup"
                      type="text"
                      value={initialValues.deviceGroup}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.deviceGroup}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-4 col-form-label"
                  >
                    Manufacturer:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="manufacturer"
                      id="manufacturer"
                      type="text"
                      value={initialValues.manufacturer}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.manufacturer}
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-4 col-form-label"
                  >
                    Manufacturer Id:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="manufacturerId"
                      id="manufacturerId"
                      type="text"
                      value={initialValues.manufacturerId}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.manufacturerId}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label htmlFor="modelID" className="col-sm-4 col-form-label">
                    Modal ID:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="modelId"
                      id="modelId"
                      type="text"
                      value={initialValues.modelId}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.modelId}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label htmlFor="serialID" className="col-sm-4 col-form-label">
                    Serial ID:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="serialId"
                      id="serialId"
                      type="text"
                      value={initialValues.serialId}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.serialId}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-sm-2" />
          <div className="col-sm-5">
            <div className="acount-info add-device-form">
              <form action>
                <div className="form-group row align-items-center">
                  <label
                    htmlFor="deviceType"
                    className="col-sm-4 col-form-label"
                  >
                    Device Type:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="deviceType"
                      id="deviceType"
                      type="text"
                      value={initialValues.deviceType}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.deviceType}
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label
                    htmlFor="deviceSubType"
                    className="col-sm-4 col-form-label"
                  >
                    Device Sub Type:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="deviceSubType"
                      id="deviceSubType"
                      type="text"
                      value={initialValues.deviceSubType}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.deviceSubType}
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label
                    htmlFor="capacityKVA"
                    className="col-sm-4 col-form-label"
                  >
                    Capacity KVA:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="capacityKVA"
                      id="capacityKVA"
                      type="text"
                      value={initialValues.capacityKVA}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.capacityKVA}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="storageKWH"
                    className="col-sm-4 col-form-label"
                  >
                    Storage KWH:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="storageKWH"
                      id="storageKWH"
                      type="text"
                      value={initialValues.storageKWH}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.storageKWH}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="commissionDate"
                    className="col-sm-4 col-form-label"
                  >
                    Commission Date:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="commissionDate"
                      id="commissionDate"
                      type="date"
                      value={initialValues.commissionDate}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.commissionDate}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="endServiceDate"
                    className="col-sm-4 col-form-label"
                  >
                    End Service Date:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="endServiceDate"
                      id="endServiceDate"
                      type="date"
                      value={initialValues.endServiceDate}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.endServiceDate}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="page-nav-btn">
          <button
            className="btn btn-icon-text mb-2 mb-md-0 custom-btn"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callAddDeviceApiAction: callAddDeviceApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(AddNewDevice);
