import React from "react";
import { getAccountData } from "../../utils/storage/index";
import constants from "../../utils/constants";
import { useHistory } from "react-router-dom";
import mainlogo from "../../assets/images/LOGO-Energy-BC-Transpernt-White.png";
import profilePic from "../../assets/images/download.jpeg";
const Header = () => {
  var accountData = getAccountData();
  const history = useHistory();

  const handleLogOut = () => {
    localStorage.clear();
    history.push(constants.ROUTE.LOGIN.LOGIN);
  };

  return (
    <div className="main-header">
      <div className="main-logo">
        <img src={mainlogo} alt="logo" className="logo-img" />
      </div>
      <div className="profile">
        <div className="bg-transperant environment-name">
          {/* <span>Development Environment */}
          {window.location.origin == "https://ebc-qa.sysopsnetwork.com" 
          ? (
            <span>QA Env</span>
          ) : window.location.origin == "https://ebc-dev.sysopsnetwork.com" 
          ? (
            <span>Dev Env</span>
          ) : (
            <span>Localhost Env</span>
          )}
        </div>

        <div className="profile-person d-flex">
          <span className="profile-logo">
            <img src={profilePic} alt="logo" className="profile-image" />

            <span className="profile-name">
              {accountData
                ? accountData.firstName
                  ? accountData.firstName
                  : ""
                : ""}{" "}
              &nbsp;
              {accountData
                ? accountData.lastName
                  ? accountData.lastName
                  : ""
                : ""}{" "}
              &nbsp;
              {/* GEGDFGFG DFGSFHS */}
              {/* <i className="fas fa-sort-down" /> */}
            </span>
          </span>
          <span className="bell-icon" onClick={handleLogOut}>
            <i className="fas fa-bell" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
