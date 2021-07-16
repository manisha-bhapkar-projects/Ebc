import React, { useState, useEffect } from "react";
import TextFieldComponent from "../../Components/TextFieldComponent/TextFieldComponent";
import "../../assets/css/style.css";
import {
  callEditBidsAPI,
  callGetBidsDetailAPI,
  callBidsListApi,
} from "../../Action/BidsAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { CustomeNotification } from "../../Components/CustomeNotification/CustomeNotification";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { callDeviceListApi } from "../../Action/DeviceAction";
import Bids from "../Bids/Bids";
import Trade from "./Trade";
import { callAddTradeApi } from "../../Action/TradeAction";

const AddTradeForBid = (props) => {
  const history = useHistory();
  const [bidsData, setBidsData] = useState([]);
  const [deviceData, setDeviceData] = useState([]);
  const [isError, setIsError] = useState({});
  const [isFocus, setIsFocus] = useState({});
  const id = props.id;
  const [isFlag, setIsFlag] = useState(false);
  const [isFlagBidListFlag, setFlagBidListFlag] = useState(true);
  const location = useLocation();
  const [bidId, setBidId] = useState("");
  const [isTradeAdded, setIsTradeAdded] = useState("AddTradeForBid");
  const [isBidCancelled, setIsBidCancelled] = useState(false);
  const [initialValues, setInitialValues] = useState({
    deviceId: "000000000000000000000000",
    deviceName: "default device",
    bidKWH: "",
    rate: "",
    startTS: "",
    endTS: "",
    matchKWH: "",
    availableKWH: "",
    _id: "",
    status: "",
  });

  useEffect(() => {
    getBidDetails(id);
    getBidsList();
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

  const getBidsList = () => {
    props
      .callBidsListApiAction()
      .then((res) => {
        setBidsData(
          res.data.data.map((x) => {
            return {
              ...x,
              id: x._id,
              value: x.deviceName,
            };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getBidDetails = (id) => {
    props
      .callGetBidsDetailAPIAction(id)
      .then((res) => {
        setBidId(res.data._id);
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
  const updateDropdown = (id) => {
    let value = deviceData.filter((x) => x._id === id);
    setInitialValues({
      ...initialValues,
      deviceName: value[0].value,
      deviceId: id,
    });
  };

  const request = {
    matchKWH: parseInt(initialValues.matchKWH),
    bidId,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate(initialValues);
    setIsError(validation);
    props
      .callAddTradeApiAction(request)
      .then((res) => {
        setIsFlag(true);
        if (props.onSubmitCall) {
          props.onSubmitCall();
        }
        CustomeNotification(
          "success",
          "Trade Added Successfully",
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
    console.log("onchange", e.target.value);
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

  const handleCancel = (e) => {
    if (isBidCancelled === false) {
      setIsBidCancelled(true);
      CustomeNotification("error", "Trade Cancelled", "Error", 2500, () => {});
    }
  };

  return isFlag ? (
    <Trade isFlag={isFlag} />
  ) : isBidCancelled ? (
    <Bids />
  ) : (
    <div>
      <div className="main-pg-content mr-5">
        <h4 className="title-page-content"> Add Trade For Bid</h4>
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
                    Bid ID:
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
                    Status:
                  </label>
                  <div className="col-sm-8">
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
                <div className="form-group row align-items-center">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-4 col-form-label"
                  >
                    Bid KWH:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="bidKWH"
                      id="bidKWH"
                      type="text"
                      readOnly
                      value={initialValues.bidKWH}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.bidKWH}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-4 col-form-label"
                  >
                    Match KWH:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="matchKWH"
                      id="matchKWH"
                      type="text"
                      value={initialValues.matchKWH}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.matchKWH}
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
                      readOnly
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
                      readOnly
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
                    Rate:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="rate"
                      id="rate"
                      type="text"
                      readOnly
                      value={initialValues.rate}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.rate}
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
                      readOnly
                      value={initialValues.availableKWH}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.availableKWH}
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
          <button
            className="btn btn-icon-text mb-2 mb-md-0 custom-btn"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callAddTradeApiAction: callAddTradeApi,
      callGetBidsDetailAPIAction: callGetBidsDetailAPI,
      callBidsListApiAction: callBidsListApi,
      callDeviceListApiAction: callDeviceListApi,
      callEditBidsAPIAction: callEditBidsAPI,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(AddTradeForBid);
