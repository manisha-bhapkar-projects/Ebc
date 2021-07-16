import React, { useState, useEffect } from "react";
import TextFieldComponent from "../../Components/TextFieldComponent/TextFieldComponent";
import "../../assets/css/style.css";
import { callAddOffersApi } from "../../Action/OffersAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { CustomeNotification } from "../../Components/CustomeNotification/CustomeNotification";
import { useHistory, useLocation } from "react-router-dom";
import { callDeviceListApi } from "../../Action/DeviceAction";
import Offers from "./Offers";

const AddOffers = (props) => {
  const history = useHistory();
  const [deviceData, setDeviceData] = useState([]);
  const [isFlag, setIsFlag] = useState(false);
  const location = useLocation();
  const [initialValues, setInitialValues] = useState({
    deviceId: "000000000000000000000000",
    deviceName: "default device",
    offerKWH: "",
    rate: "",
    startTS: "",
    endTS: "",
  });

  const [isError, setIsError] = useState({});
  const [isFocus, setIsFocus] = useState({});

  useEffect(() => {
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
                  availableKWN: x.availableKWN,
                };
              })
            : []
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate(initialValues);
    setIsError(validation);

    props
      .callAddOffersApiAction({ ...initialValues })
      .then((res) => {
        setIsFlag(true);
        CustomeNotification(
          "success",
          "Offer Added Successfully",
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

  const updateDropdown = (id) => {
    let value = deviceData.filter((x) => x._id === id);
    setInitialValues({
      ...initialValues,
      deviceName: value[0].value,
      deviceId: id,
      availableKWN: value[0].availableKWN,
    });
  };

  const handleChangeValue = (e) => {
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
  const handleBackClick = (e) => {
    setIsFlag(true);
  };
  return isFlag ? (
    <Offers />
  ) : (
    <div>
      <div className="main-pg-content mr-5">
        <h4 className="title-page-content"> Add Offers
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
                    Rate:
                  </label>
                  <div className="col-sm-8">
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
                  <div className="col-sm-8">
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
                  <div className="col-sm-8">
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
              </form>
            </div>
          </div>
        </div>
        <div className="page-nav-btn">
          <button
            className=" btn btn-icon-text mb-2 mb-md-0 custom-btn"
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
      callAddOffersApiAction: callAddOffersApi,
      callDeviceListApiAction: callDeviceListApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(AddOffers);
