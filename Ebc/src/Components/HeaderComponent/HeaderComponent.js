import React, { useState, useEffect } from "react";
import { callAccountDetailApi } from "../../Action/AccountAction";
import TextFieldComponent from "../../Components/TextFieldComponent/TextFieldComponent";
import { getAccountData } from "../../utils/storage/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const HeaderComponent = (props) => {
  const [initialValues, setInitialValues] = useState({
    _id:"",
    fundsAvailable: 0,
    energyAvailable:""
  });
  var accountData = getAccountData();

  useEffect(() => {
    getAccountInfo(accountData._id);

    // const interval = setInterval(() =>{
    //          getAccountInfo(accountData.accountID)
    // }, 5000)


    // return() => clearInterval(interval)
    
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

  return (
    <div className="main-pg-content trade-title">
      <div className="row">
        <div className="col-md-4">
          <TextFieldComponent
            label="Account ID:"
            labelClassName="custome_label ml-0"
            className="custom_text_field custom_text ml-0"
            name="_id"
            id="_id"
            type="text"
            readOnly
            value={initialValues._id}
          />
        </div>
        <div className="col-md-4">
          <TextFieldComponent
            label="Funds Available:"
            labelClassName="custome_label pl-3"
            className="custom_text_field custom_text ml-0"
            name="fundsAvailable"
            id="fundsAvailable"
            type="text"
            readOnly
            value={initialValues.fundsAvailable.toFixed(2)}

          />
        </div>
        <div className="col-md-4">
          <TextFieldComponent
            label="Energy Available:"
            labelClassName="custome_label pl-3"
            className="custom_text_field custom_text ml-0"
            name="energyAvailable"
            id="energyAvailable"
            type="text"
            readOnly
            value={initialValues.energyAvailable}
          />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callAccountDetailApiAction: callAccountDetailApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(HeaderComponent);
