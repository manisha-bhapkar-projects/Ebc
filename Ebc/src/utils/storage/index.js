import constants from "../constants";
export const storeAuthToken = (_token) => {
  if (_token) {
    localStorage.setItem(constants.STORAGE.AUTH.TOKEN, _token);
  } else {
    localStorage.removeItem(constants.STORAGE.AUTH.TOKEN);
  }
};

export const storeAccountData = (_token) => {

  if (_token) {
    var accountObject ={
      email:_token.email, 
      accountID:_token._id,
      org_id:_token.orgId,
      firstName:_token.firstName,
      lastName:_token.lastName,
      fundsAvailable:_token.fundsAvailable,
      energyAvailable:_token.energyAvailable,
      isAdmin: _token.isAdmin,
      
    };
    localStorage.setItem(constants.STORAGE.AUTH.ACCOUNT_DATA, JSON.stringify(_token));
  } else {
    localStorage.removeItem(constants.STORAGE.AUTH.ACCOUNT_DATA);
  }
};
export const getAccountData = () => {
  return JSON.parse(localStorage.getItem(constants.STORAGE.AUTH.ACCOUNT_DATA));

};

export const getAuthToken = () => {
  return localStorage.getItem(constants.STORAGE.AUTH.TOKEN);
};

export const storeOrgID = (_token) => {
  if (_token) {
    localStorage.setItem(constants.STORAGE.AUTH.ORG_ID, _token);
  } else {
    localStorage.removeItem(constants.STORAGE.AUTH.ORG_ID);
  }
};

export const storeRefreshToken = (_token) => {
  if (_token) {
    localStorage.setItem(constants.STORAGE.AUTH.REF_TOKEN, _token);
  } else {
    localStorage.removeItem(constants.STORAGE.AUTH.REF_TOKEN);
  }
};

export const getRefreshToken = () => {
  return localStorage.getItem(constants.STORAGE.AUTH.REF_TOKEN);
};

export const storeAdminData = (_data) => {
  if (_data) {
    localStorage.setItem(
      constants.STORAGE.AUTH.ADMIN_DATA,
      JSON.stringify(_data)
    );
  } else {
    localStorage.removeItem(constants.STORAGE.AUTH.ADMIN_DATA);
  }
};


export const storeAuthTokenForApprover = (_token) => {
  if (_token) {
    localStorage.setItem(constants.STORAGE.AUTH.APPROVER_TOKEN, _token);
  } else {
    localStorage.removeItem(constants.STORAGE.AUTH.APPROVER_TOKEN);
  }
};


export const getAuthTokenForApprover = () => {
  return localStorage.getItem(constants.STORAGE.AUTH.APPROVER_TOKEN);
};

export const storeAccountDataForApprover = (_token) => {
  if (_token) {
    localStorage.setItem(constants.STORAGE.AUTH.APPROVER_ACCOUNT_DATA, JSON.stringify(_token));
  } else {
    localStorage.removeItem(constants.STORAGE.AUTH.APPROVER_ACCOUNT_DATA);
  }
};

export const getAccountDataForApprover = () => {
  return JSON.parse(localStorage.getItem(constants.STORAGE.AUTH.APPROVER_ACCOUNT_DATA));

};