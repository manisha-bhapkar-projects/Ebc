import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";
import { getRefreshToken }  from '../utils/storage'

export const callAccountDetailApi = ( accountID ) => {
    // console.log("id", accountID);
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.ACCOUNT.ACCOUNT_DETAILS}${accountID}`, 
    );
  };
};

export const callSaveAccountData = ( accountID, data ) => {
  // console.log("id", accountID);
return (_dispatch, _getState) => {
  return fetchClient.patch(`${constants.API.ACCOUNT.ACCOUNT_DETAILS}${accountID}`, data
  );
};
};