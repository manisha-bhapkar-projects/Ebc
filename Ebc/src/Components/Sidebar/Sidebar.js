import React, { useEffect, useState } from "react";
import { approver_sidebar, sidebar } from "../../utils/routes/index";
import { NavLink } from "react-router-dom";
import {
  getAccountDataForApprover,
  getAuthTokenForApprover,
  storeAuthTokenForApprover,
  storeAccountDataForApprover,
  getAccountData,
} from "../../utils/storage/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import constants from "../../utils/constants";
import { Link, useHistory } from "react-router-dom";
import { callApproverApi } from "../../Action/ApproverAction";
import { CustomeNotification } from "../CustomeNotification/CustomeNotification";
import { Base64 } from 'js-base64';

const Sidebar = (props) => {
  const history = useHistory();
  let accountData = getAccountData();
  
  useEffect(() => {
    // console.log("ebc account data", accountData);  
    // console.log("approver account data", approverAccountData.approverEmail);
    // console.log("approver account data passwordString", approverAccountData.passwordString);
    // console.log("encodedStringBtoA", encodedStringBtoA);
  }, []);

  const [initialValues, setInitialValues] = useState({
    strategy: "local",
    approverEmail: accountData
      ? accountData.email
        ? accountData.email
        : ""
      : "",
    password: accountData
      ? accountData.passwordString
        ? accountData.passwordString
        : ""
      : "",
    // approverEmail: approverAccountData.approverEmail ,
    // password: approverAccountData.passwordString,

    // approverEmail: "",
    // passwordString: "",
  });

  //   var encodedStringAtoB = 'SGVsbG8gV29ybGQh';

  // // Decode the String
  // var decodedStringAtoB = atob(encodedStringAtoB);
  // console.log(decodedStringAtoB);
  // const request={
  //   strategy:initialValues.strategy,
  //   approverEmail: initialValues.approverEmail,
  //   password: initialValues.passwordString
  // }

  const openApproverApp = () => {
    // alert("Approver app");
    props
      .callApproverApiAction(initialValues)
      .then((res) => {
        // alert("Login api called");
        // debugger;
        // console.log("email and password", res.config.data.email);
        storeAuthTokenForApprover(res.data.accessToken);
        storeAccountDataForApprover(res.data.approver);
        let approverAccountData = getAccountDataForApprover();
        let approver_token = getAuthTokenForApprover();
        // console.log("res.data.approver", res.data.approver);
        // console.log("approverAccountData", approverAccountData);
        // console.log("approver_token", approver_token);
        // alert("auth token");
        let EncodeData = {
          approverAccountData,
          approver_token,
        };
        // alert(" EncodeData token");
        console.log(JSON.stringify(EncodeData));
        let encodedStringBtoA = "";
        try{
          // debugger;
          // encodedStringBtoA = btoa(JSON.stringify(EncodeData));

          //  encodedStringBtoA = window.btoa(encodeURIComponent(JSON.stringify(EncodeData)));
           // var encoded = JSON.stringify(EncodeData).b64encode();
          // console.log( encoded.b64decode() );
          encodedStringBtoA = Base64.encode(JSON.stringify(EncodeData)); 
          // Base64.encode(JSON.stringify(EncodeData));
          // Base64.encode(EncodeData);

          //  encodedStringBtoA = window.btoa(JSON.stringify(EncodeData));

         

          // encodedStringBtoA = btoa(unescape(encodeURIComponent(EncodeData)))
        }catch(err) {
          console.log(err)
        }
        // alert("encodedStringBtoA");
        // console.log("encodedStringBtoA", encodedStringBtoA);


        // setInitialValues(res.data.approver);
        // setInitialValues({
        //   ...initialValues,
        //   approverEmail:res.data.approver.approverEmail,
        //   password:res.data.approver.passwordString
        // });
        // debugger;
        // if(window.location.origin == 'https://ebc-qa.sysopsnetwork.com' || window.location.origin == 'http://ebc-frontend-qa.s3-website.us-east-2.amazonaws.com')
        // {
        //   window.location.href = `https://ebc-approver-frontend-qa.sysopsnetwork.com?data=${encodedStringBtoA}`;
        //   }

        if (window.location.origin == "http://localhost:3000") {
          // debugger;
          // console.log("window.location.origin", window.location.origin);
          window.location.href = `http://localhost:3001?data=${encodedStringBtoA}`;
          // alert("open approver link");
        } else if (
          window.location.origin == "https://ebc-qa.sysopsnetwork.com" ||
          window.location.origin ==
            "http://ebc-frontend-qa.s3-website.us-east-2.amazonaws.com"
        ) {
          window.location.href = `https://ebc-approver-frontend-qa.sysopsnetwork.com?data=${encodedStringBtoA}`;
        } else {
          window.location.href = `https://ebc-approver-frontend-dev.sysopsnetwork.com?data=${encodedStringBtoA}`;
        }
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

    // window.location.href = 'http://localhost:3001/approver?data=ThisisEncryptedString'
    // if(window.location.origin == 'https://ebc-qa.sysopsnetwork.com' || window.location.origin == 'http://ebc-frontend-qa.s3-website.us-east-2.amazonaws.com')
    // {
    //   window.location.href = `https://ebc-approver-frontend-qa.sysopsnetwork.com?data=${encodedStringBtoA}`;
    //   }
    //   else if(window.location.origin == 'http://localhost:3000'){
    //   window.location.href = `http://localhost:3001?data=${encodedStringBtoA}`;
    //   }
    //   else{
    //     window.location.href = `https://ebc-approver-frontend-dev.sysopsnetwork.com?data=${encodedStringBtoA}`;

    //   }
  };

  return (
    <div className="sidebar">
      <div className="sidenav">
        <ul>
          {sidebar.map((item, index) => {
            return item.sidebar ? (
              <li key={index}>
                <NavLink to={item.path} key={index} className={item.cName}>
                  <img src={item.image} />
                  <p>{item.title}</p>
                </NavLink>
              </li>
            ) : null;
          })}
          {accountData
            ? accountData.isAdmin === true
              ? approver_sidebar.map((item, index) => {
                  return item.sidebar ? (
                    <li key={index} onClick={openApproverApp}>
                      <div className="approver_link">
                        <img src={item.image} />
                        <p>{item.title}</p>
                      </div>
                    </li>
                  ) : null;
                })
              : ""
            : ""}
        </ul>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callApproverApiAction: callApproverApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Sidebar);
