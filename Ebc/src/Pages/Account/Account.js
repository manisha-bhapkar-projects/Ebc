import React, { useState, useEffect } from "react";
import TextFieldComponent from "../../Components/TextFieldComponent/TextFieldComponent";
import {
  callAccountDetailApi,
  callSaveAccountData,
} from "../../Action/AccountAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getAccountData } from "../../utils/storage/index";
import { CustomeNotification } from "../../Components/CustomeNotification/CustomeNotification";

const Account = (props) => {
  const [initialValues, setInitialValues] = useState({
    _id: "",
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    fundsAvailable: 0,
    fundsBalance: 0,
  });
  const [isError, setIsError] = useState({});
  const [isFocus, setIsFocus] = useState({});
  const [id, setID] = useState("");
  const [loading, setloading] = useState(false);

  var accountData = getAccountData();

  useEffect(() => {
    getAccountInfo(accountData._id);
  }, []);

  const getAccountInfo = () => {
    props
      .callAccountDetailApiAction(accountData._id)
      .then((res) => {
        setInitialValues(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateDropdown = (id) => {
    console.log("id", id);
    setID(id);
  };
  const handleChangeValue = (e) => {
    setInitialValues({
      ...initialValues,
      [e.target.name]: e.target.value.trim(),
    });
    setIsError({ ...isError, [e.target.name]: "" });
  };

  const handleSaveAccountData = (e) => {
    e.preventDefault();
    props
      .callSaveAccountDataAction(accountData._id, initialValues)
      .then((res) => {
        console.log("res", res);
        CustomeNotification(
          "success",
          "Account Updated Successfully",
          "Success",
          2000
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <ul className="nav-items">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Create</a>
        </li>
        <li>
          <a href="#">Edit</a>
        </li>
        <li>
          <a href="#">Delete</a>
        </li>
      </ul>
      <div className="main-pg-content">
        <h5 className="title-page-content">Account Info</h5>
        <div className="row mr-0">
          <div className="col-sm-5">
            <div className="acount-info add-device-form">
              <form action>
                <div className="form-group row align-items-center">
                  <label
                    htmlFor="accountId"
                    className="col-sm-4 col-form-label"
                  >
                    Account Id:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      name="_id"
                      id="_id"
                      type="text"
                      readOnly
                      value={initialValues._id}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label htmlFor="userName" className="col-sm-4 col-form-label">
                    User Name:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="userName"
                      id="userName"
                      type="text"
                      value={initialValues.userName}
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label
                    htmlFor="firstName"
                    className="col-sm-4 col-form-label"
                  >
                    First Name:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="firstName"
                      id="firstName"
                      type="text"
                      value={initialValues.firstName}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label htmlFor="lastName" className="col-sm-4 col-form-label">
                    Last Name:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="lastName"
                      id="lastName"
                      type="text"
                      value={initialValues.lastName}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label htmlFor="email" className="col-sm-4 col-form-label">
                    Email:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="email"
                      id="email"
                      type="text"
                      value={initialValues.email}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label htmlFor="orgName" className="col-sm-4 col-form-label">
                    Organization Name:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className=""
                      name="orgName"
                      id="orgName"
                      type="text"
                      value={initialValues.orgName}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="fundBalance"
                    className="col-sm-4 col-form-label"
                  >
                    Funds Balance:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      name="fundsBalance"
                      id="fundsBalance"
                      type="text"
                      value={initialValues.fundsBalance.toFixed(2)}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label
                    htmlFor="gpsLocation"
                    className="col-sm-4 col-form-label"
                  >
                    Funds Available:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className="form-control-plaintext"
                      name="fundsAvailable"
                      id="fundsAvailable"
                      type="text"
                      readOnly
                      value={initialValues.fundsAvailable.toFixed(2)}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label htmlFor="orgName" className="col-sm-4 col-form-label">
                    Energy Balance:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      name="energyBalance"
                      id="energyBalance"
                      type="text"
                      value={initialValues.energyBalance}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label htmlFor="orgName" className="col-sm-4 col-form-label">
                    Energy Available:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      name="energyAvailable"
                      id="energyAvailable"
                      type="text"
                      value={initialValues.energyAvailable}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="col-sm-2"></div>
          <div className="col-sm-5">
            <div className="acount-info add-device-form mr-5">
              <form action>
                <div className="form-group row align-items-center">
                  <label
                    htmlFor="approvalValue"
                    className="col-sm-4 col-form-label"
                  >
                    Approval Value:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className="form-control-plaintext"
                      name="approvalValue"
                      id="approvalValue"
                      type="text"
                      readOnly
                      value={initialValues.approvalValue}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label htmlFor="status" className="col-sm-4 col-form-label">
                    Status:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      name="status"
                      id="status"
                      type="text"
                      readOnly
                      value={initialValues.status}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label htmlFor="address1" className="col-sm-4 col-form-label">
                    Street Address1:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      name="address1"
                      id="address1"
                      type="text"
                      value={initialValues.address1}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label htmlFor="address2" className="col-sm-4 col-form-label">
                    Street Address2:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      name="address2"
                      id="address2"
                      type="text"
                      value={initialValues.address2}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label htmlFor="city" className="col-sm-4 col-form-label">
                    City:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      name="city"
                      id="city"
                      type="text"
                      value={initialValues.city}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label htmlFor="state" className="col-sm-4 col-form-label">
                    State:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      name="state"
                      id="state"
                      type="text"
                      value={initialValues.state}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label htmlFor="country" className="col-sm-4 col-form-label">
                    Country:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      name="country"
                      id="country"
                      type="text"
                      value={initialValues.country}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label htmlFor="mailCode" className="col-sm-4 col-form-label">
                    Mail Code:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      name="mailCode"
                      id="mailCode"
                      type="text"
                      value={initialValues.mailCode}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="transactionTS"
                    className="col-sm-4 col-form-label"
                  >
                    Transaction TS:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className="form-control-plaintext"
                      name="transactionTS"
                      id="transactionTS"
                      type="text"
                      readOnly
                      value={initialValues.transactionTS}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="latestBlockchainTxID"
                    className="col-sm-4 col-form-label"
                  >
                    Latest Blockchain TxID:
                  </label>
                  <div className="col-sm-8">
                    <TextFieldComponent
                      className="form-control-plaintext"
                      name="latestBlockchainTxID"
                      id="latestBlockchainTxID"
                      type="text"
                      readOnly
                      value={initialValues.latestBlockchainTxID}
                      onChange={handleChangeValue}
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
            onClick={handleSaveAccountData}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callAccountDetailApiAction: callAccountDetailApi,
      callSaveAccountDataAction: callSaveAccountData,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Account);
