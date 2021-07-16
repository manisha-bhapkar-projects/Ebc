import React, { useState, useEffect } from "react";
import TextFieldComponent from "../../Components/TextFieldComponent/TextFieldComponent";
import { CustomeNotification } from "../../Components/CustomeNotification/CustomeNotification";
import constants from "../../utils/constants";
import { useHistory } from "react-router-dom";
import CustomeDropDown from "../../Components/CustomeDropDown/CustomeDropDown";
import { role, role_list } from "../../Components/staticDropdownData";
import { callRegistrationApi, callOrgListApi } from "../../Action/AuthAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { storeOrgID } from "../../utils/storage/index";
import logo from "../../assets/images/LOGO-Energy-BC-Transpernt-White.png";
const Registration = (props) => {
  const history = useHistory();
  const [id, setID] = useState("");
  const [isError, setIsError] = useState({});
  const [isFocus, setIsFocus] = useState({});
  const [orgName, setOrgList] = useState([]);
  const [approverLevel, setApproverList] = useState([]);
  const [roleId, setRoleId] = useState("");
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    orgName: "",
    maxApproverLevel: "",
    fundsBalance: "",
    isApprover: false,
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    state: "",
    country: "",
    mailCode: "",
    approvalValue: "0",
    status: "",
    energyBalance: "",
  });

  useEffect(() => {
    getOrgList();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate(initialValues);
    setIsError(validation);

    props
      .callRegistrationApiAction(initialValues)
      .then((res) => {
        history.push(constants.ROUTE.LOGIN.LOGIN);
        CustomeNotification(
          "success",
          "Registered Successfully",
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

  const getOrgList = () => {
    props
      .callOrgListApiAction()
      .then((res) => {
        setOrgList(
          res.data.data && res.data.data.length
            ? res.data.data.map((x) => {
                return {
                  ...x,
                  id: x._id,
                  value: x.orgName,
                };
              })
            : []
        );
        setApproverList(
          res.data.data && res.data.data.length
            ? res.data.data.map((x) => {
                return {
                  ...x,
                  id: x._id,
                  value: x.maxApproverLevel,
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
    let value = orgName.filter((x) => x._id === id);
    console.log("value", value);
    setInitialValues({
      ...initialValues,
      orgName: value[0].value,
      orgId: id,
    });
    storeOrgID(id);
  };

  const updateApproverDropdown = (id) => {
    console.log("id", id);
    let value = approverLevel.filter((x) => x._id === id);
    console.log("value", value);
    setInitialValues({
      ...initialValues,
      maxApproverLevel: value[0].maxApproverLevel,
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

    if (!values.email) {
      errors.email = "Email is Required";
    }
    if (!values.password) {
      errors.password = "Password is Required";
    }

    return errors;
  };

  const handleFocus = (e) => {
    const validation = validate(initialValues);
    setIsError(validation);
    setIsFocus({ ...isFocus, [e.target.name]: true });
  };

  const updateDropdownForRole = (roleId) => {
    setRoleId(roleId);
    if (roleId == "1") {
      setInitialValues({
        ...initialValues,
        isApprover: false,
      });
    } else {
      setInitialValues({
        ...initialValues,
        isApprover: true,
      });
    }
  };
  console.log("initialvalues", initialValues);

  return (
    <div className="login-Account-banner registartion-content-banner">
      <div className="login-row">
        <div className="main-logo">
          <div className="login-pg-logo">
            <img src={logo} alt="logo" />
          </div>
        </div>
        <div className="login-content ">
          <div className="login-form registartion-from">
            <h2>Registration</h2>
            <form>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <TextFieldComponent
                      className=""
                      name="firstName"
                      id="firstName"
                      placeholder="First Name*"
                      type="text"
                      value={initialValues.firstName}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <TextFieldComponent
                      className=""
                      name="lastName"
                      id="lastName"
                      placeholder="Last Name*"
                      type="text"
                      value={initialValues.lastName}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <TextFieldComponent
                      className=""
                      name="userName"
                      id="userName"
                      placeholder="User Name"
                      type="text"
                      value={initialValues.userName}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <TextFieldComponent
                      className=""
                      name="email"
                      id="email"
                      placeholder="Email id*"
                      type="text"
                      value={initialValues.email}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.email}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <TextFieldComponent
                      className=""
                      name="password"
                      id="password"
                      placeholder="Password*"
                      type="password"
                      value={initialValues.password}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error
                      helperText={isError.password}
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <TextFieldComponent
                      className=""
                      name="fundsBalance"
                      id="fundsBalance"
                      placeholder="Funds Balance"
                      type="text"
                      value={initialValues.fundsBalance}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group custom_from_dropdown">
                    <CustomeDropDown
                      data={orgName}
                      placeholder="Organization Name*"
                      value={initialValues.orgName}
                      onSelect={updateDropdown}
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group custom_from_dropdown">
                    <CustomeDropDown
                      data={role}
                      placeholder="Role"
                      value={role_list(roleId)}
                      onSelect={(e) => {
                        updateDropdownForRole(e);
                      }}
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group custom_from_dropdown">
                    <CustomeDropDown
                      data={approverLevel}
                      placeholder="Max Approver Level"
                      value={initialValues.maxApproverLevel}
                      onSelect={updateApproverDropdown}
                    />
                  </div>
                </div>

                <div className="col-sm-9">
                  <div className="form-group">
                    <TextFieldComponent
                      className=""
                      name="streetAddress1"
                      id="streetAddress1"
                      placeholder="Street Address 1"
                      type="text"
                      value={initialValues.streetAddress1}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>
                <div className="col-sm-9">
                  <div className="form-group">
                    <TextFieldComponent
                      className=""
                      name="streetAddress2"
                      id="streetAddress2"
                      placeholder="Street Address 2"
                      type="text"
                      value={initialValues.streetAddress2}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <TextFieldComponent
                      className=""
                      name="city"
                      id="city"
                      placeholder="City"
                      type="text"
                      value={initialValues.city}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <TextFieldComponent
                      className=""
                      name="state"
                      id="state"
                      placeholder="State"
                      type="text"
                      value={initialValues.state}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <TextFieldComponent
                      className=""
                      name="country"
                      id="country"
                      placeholder="Country"
                      type="text"
                      value={initialValues.country}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <TextFieldComponent
                      className=""
                      name="mailCode"
                      id="mailCode"
                      placeholder="Mail Code"
                      type="text"
                      value={initialValues.mailCode}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>

                <div className="col-sm-12">
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="gridCheck"
                      />
                      <label className="form-check-label" htmlFor="gridCheck">
                        I have read and agree to the
                        <a href="#"> Terms of Service </a>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn" onClick={handleSubmit}>
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callRegistrationApiAction: callRegistrationApi,
      callOrgListApiAction: callOrgListApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Registration);
