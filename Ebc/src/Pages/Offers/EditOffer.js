import React, { useState, useEffect } from "react";
import TextFieldComponent from "../../Components/TextFieldComponent/TextFieldComponent";
import "../../assets/css/style.css";
import {
  callEditOffersAPI,
  callGetOffersDetailAPI,
} from "../../Action/OffersAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { CustomeNotification } from "../../Components/CustomeNotification/CustomeNotification";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { callDeviceListApi } from "../../Action/DeviceAction";
import Offers from "./Offers";
import { useLocation } from "react-router-dom";

const EditOffers = (props) => {
  const history = useHistory();
  const [deviceData, setDeviceData] = useState([]);
  const [isFlag, setIsFlag] = useState(false);
  const [isOfferCancelled, setIsOfferCancelled] = useState(false);

  const location = useLocation();

  const [initialValues, setInitialValues] = useState({
    deviceId: "",
    deviceName: "",
    offerKWH: "",
    rate: "",
    startTS: "",
    endTS: "",
    status: "",
    availableKWH: "",
    _id: "",
  });

  const [isError, setIsError] = useState({});
  const [isFocus, setIsFocus] = useState({});
  const id = props.id;

  useEffect(() => {
    getOffersDetails(id);
    getDeviceList();
  }, []);

  const getDeviceList = () => {
    props
      .callDeviceListApiAction()
      .then((res) => {
        setDeviceData(
          res.data.data && res.data.data.length
            ? res.data.data.map((x) => {
                return {
                  ...x,
                  id: x._id,
                  value: x.deviceName,
                };
              })
            : []
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateDropdown = (id) => {
    let value = deviceData.filter((x) => x._id === id);
    setInitialValues({
      ...initialValues,
      deviceName: value[0].value,
      deviceId: id,
    });
  };

  const getOffersDetails = (id) => {
    props
      .callGetOffersDetailAPIAction(id)
      .then((res) => {
        console.log(res.data.startTS);
        console.log(
          "date",
          moment(res.data.startTS).format("yyyy-MM-DDThh:mm")
        );
        setInitialValues({
          ...res.data,
          startTS: moment(res.data.startTS).format("yyyy-MM-DDThh:mm"),
          endTS: moment(res.data.endTS).format("yyyy-MM-DDThh:mm"),
        });
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const request = {
    offerKWH: initialValues.offerKWH,
    rate: initialValues.rate,
    startTS: initialValues.startTS,
    endTS: initialValues.endTS,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate(initialValues);
    setIsError(validation);

    props
      .callEditOffersAPIAction(id, request)
      .then((res) => {
        setIsFlag(true);
        CustomeNotification(
          "success",
          "Offer Updated Successfully",
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
    console.log(e.target.value);
    setInitialValues({
      ...initialValues,
      [e.target.name]: e.target.value,
    });
    setIsError({ ...isError, [e.target.name]: "" });
  };

  const validate = (values) => {
    let errors = {};
    return errors;
  };

  const handleFocus = (e) => {
    const validation = validate(initialValues);
    setIsError(validation);
    setIsFocus({ ...isFocus, [e.target.name]: true });
  };

  const requestCancelled = {
    status: "cancelled",
    offerKWH: initialValues.offerKWH,
  };
  const handleCancle = (e) => {
    props
      .callEditOffersAPIAction(id, requestCancelled)
      .then((res) => {
        setIsOfferCancelled(true);
        CustomeNotification("error", "Offer Update Canceled", "error", 2000);
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
  const handleBackClick = (e) => {
    setIsFlag(true);
  };
  return isFlag ? (
    <Offers />
  ) : isOfferCancelled ? (
    <Offers />
  ) : (
    <div>
      <div className="main-pg-content mr-5">
        <h4 className="title-page-content"> Edit Offers
        <button
            className={`${
              location.pathname !== "/trade"
                ? "btn btn-icon-text mb-2 mb-md-3  offer-back-btn1"
                : "btn btn-icon-text mb-2 mb-md-3  offer-back-btn"
            }`}
            onClick={handleBackClick}
          >
            Back
          </button>
        </h4>
        <div className="row">
          <div
            className={`${
              location.pathname === "/trade" ? "col-sm-6" : "col-sm-5"
            }`}
          >
            <div className="acount-info add-device-form">
              <form action>
                <div className="form-group row align-items-center">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-4 col-form-label"
                  >
                    Offer ID:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      name="_id"
                      id="_id"
                      type="text"
                      readOnly
                      className="form-control-plaintext"
                      value={initialValues._id}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-4 col-form-label"
                  >
                    Offer KWH:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="offerKWH"
                      id="offerKWH"
                      type="text"
                      value={initialValues.offerKWH}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.offerKWH}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-4 col-form-label"
                  >
                    Available KWH:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="availableKWH"
                      id="availableKWH"
                      type="text"
                      value={initialValues.availableKWH}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.availableKWH}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-4 col-form-label"
                  >
                    Rate:
                  </label>
                  <div className="col-sm-8 mb-2">
                    <TextFieldComponent
                      className=""
                      name="rate"
                      id="rate"
                      type="text"
                      value={initialValues.rate}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.rate}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div
            className={`${
              location.pathname === "/trade" ? "d-none" : "col-sm-2"
            }`}
          />
          <div
            className={`${
              location.pathname === "/trade" ? "col-sm-6" : "col-sm-5"
            }`}
          >
            <div className="acount-info add-device-form">
              <form action>
                <div className="form-group row align-items-center">
                  <label
                    htmlFor="endServiceDate"
                    className="col-sm-4 col-form-label"
                  >
                    Start TS:
                  </label>
                  <div className="col-sm-8 mb-2">
                    <TextFieldComponent
                      className=""
                      name="startTS"
                      id="startTS"
                      type="datetime-local"
                      value={initialValues.startTS}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.startTS}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="endServiceDate"
                    className="col-sm-4 col-form-label"
                  >
                    End TS:
                  </label>
                  <div className="col-sm-8 mb-2">
                    <TextFieldComponent
                      className=""
                      name="endTS"
                      id="endTS"
                      type="datetime-local"
                      value={initialValues.endTS}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.endTS}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-4 col-form-label"
                  >
                    Status:
                  </label>
                  <div className="col-sm-8 mb-2">
                    <TextFieldComponent
                      className=""
                      name="status"
                      id="status"
                      type="text"
                      readOnly
                      value={initialValues.status}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.status}
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

          {initialValues.availableKWH === initialValues.offerKWH ? (
            <button
              className="btn btn-icon-text mb-2 mb-md-0 custom-btn"
              onClick={handleCancle}
            >
              Delete
            </button>
          ) : (
            <button
              className="btn btn-icon-text mb-2 mb-md-0 custom-btn"
              onClick={handleCancle}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callGetOffersDetailAPIAction: callGetOffersDetailAPI,
      callEditOffersAPIAction: callEditOffersAPI,
      callDeviceListApiAction: callDeviceListApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(EditOffers);
