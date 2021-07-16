import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";
import axios from "axios";


export const callApproverApi = (data) => (_dispatch, _getState) => {
    return fetchClient.post(`${constants.APPROVER_LOGIN.LOGIN}`,
      data
    );
};


// export const callApproverApi = (data) => {
//   return() =>{
//     return axios.post("https://ebc-approvers-dev.sysopsnetwork.com/authentication", data)
//   }
// }