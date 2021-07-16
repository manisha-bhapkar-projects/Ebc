import React, { useState, useEffect } from "react";
import TextFieldComponent from "../../Components/TextFieldComponent/TextFieldComponent";
import "../../assets/css/style.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { callGetTradeDetailAPI } from "../../Action/TradeAction";

const TradeDetails = (props) => {
  const history = useHistory();
  const [isError, setIsError] = useState({});
  const [isFocus, setIsFocus] = useState({});
  const id = props.id;
  const location = useLocation();
  const [initialValues, setInitialValues] = useState({
    _id: "",
    sellerAccountId: "",
    sellerDeviceId: "",
    offerId: "",
    buyerAccountId: "",
    buyerDeviceID: "",
    buyerOrgID: "",
    bidId: "",
    status: "",
    matchTS: "",
    matchRate: "",
    matchKWH: "",
    matchPaymentDue: "",
    tradeTS: "",
    lastTransactionTXId: "",
  });

  useEffect(() => {
    getTradeDetails(id);
    console.log("trade details id", id);
  }, []);

  const getTradeDetails = (id) => {
    props
      .callGetTradeDetailAPIAction(id)
      .then((res) => {
        setInitialValues(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate(initialValues);
    setIsError(validation);
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

  return (
    <div>
      <div className="main-pg-content mr-5">
        <h4 className="title-page-content"> Trade Details</h4>
        <div className="row">
          <div className="col-sm-6">
            <div className="acount-info add-device-form">
              <form action>
                <div className="form-group row align-items-center">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-4 col-form-label"
                  >
                    Trade ID:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="_id"
                      id="_id"
                      type="text"
                      readOnly
                      value={initialValues._id}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError._id}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-4 col-form-label"
                  >
                    Seller Account ID:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="sellerAccountId"
                      id="sellerAccountId"
                      type="text"
                      readOnly
                      value={initialValues.sellerAccountId}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.sellerAccountId}
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-4 col-form-label"
                  >
                    Seller Org ID:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="sellerOrgID"
                      id="sellerOrgID"
                      type="text"
                      readOnly
                      value={initialValues.sellerOrgID}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.sellerOrgID}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-4 col-form-label"
                  >
                    Offer ID:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="offerId"
                      id="offerId"
                      type="text"
                      readOnly
                      value={initialValues.offerId}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.offerId}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-4 col-form-label"
                  >
                    Buyer Account ID:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="buyerAccountId"
                      id="buyerAccountId"
                      type="text"
                      readOnly
                      value={initialValues.buyerAccountId}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.buyerAccountId}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-4 col-form-label"
                  >
                    Buyer Org ID:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="buyerOrgID"
                      id="buyerOrgID"
                      type="text"
                      readOnly
                      value={initialValues.buyerOrgID}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.buyerOrgID}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-4 col-form-label"
                  >
                    Last Transaction TXId:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="lastTransactionTXId"
                      id="lastTransactionTXId"
                      type="text"
                      readOnly
                      value={initialValues.lastTransactionTXId}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.lastTransactionTXId}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="d-none" />
          <div className="col-sm-6">
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
                      className=""
                      name="bidId"
                      id="bidId"
                      type="text"
                      readOnly
                      value={initialValues.bidId}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.bidId}
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
                    Match TS:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="matchTS"
                      id="matchTS"
                      type="text"
                      readOnly
                      value={initialValues.matchTS}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.matchTS}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-4 col-form-label"
                  >
                    Match Rate:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="matchRate"
                      id="matchRate"
                      type="text"
                      readOnly
                      value={initialValues.matchRate}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.matchRate}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-4 col-form-label"
                  >
                    Match Units:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="matchKWH"
                      id="matchKWH"
                      type="text"
                      readOnly
                      value={initialValues.matchKWH}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.matchKWH}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-4 col-form-label"
                  >
                    Match Payment Due:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="matchPaymentDue"
                      id="matchPaymentDue"
                      type="text"
                      readOnly
                      value={initialValues.matchPaymentDue}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.matchPaymentDue}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-4 col-form-label"
                  >
                    Trade TS:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="tradeTS"
                      id="tradeTS"
                      type="text"
                      readOnly
                      value={initialValues.tradeTS}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.tradeTS}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="page-nav-btn"></div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callGetTradeDetailAPIAction: callGetTradeDetailAPI,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(TradeDetails);
