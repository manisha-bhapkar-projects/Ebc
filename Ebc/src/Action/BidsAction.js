import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";

export const callBidsListApi = (limit, skip, status, startTS) => {
    console.log("get bid list startTS", startTS);
    console.log("get bid list status", status);

    return (_dispatch, _getState) => {
        return fetchClient.get(`${constants.API.BIDS_LIST.BIDS}`, 
        {
            params: {
              '$limit': limit,
              '$skip': (skip * 10) - 10,
               status: status === "" ? undefined : status,
               'startTS[$gte]': startTS === "" ? undefined : startTS
            },
         
          });
    };
};

export const callOtherBidFilterApi = (data,  limit, skip, status, startTS) => {
    console.log("get my bid list startTS", startTS);
    return (_dispatch, _getState) => {
        return fetchClient.get(`${constants.API.BIDS_LIST.BIDS}`,
           {
        params:{
            'accountId[$ne]' : data,
            '$limit': limit,
            '$skip': (skip * 10) - 10,
             status: status,
             'startTS[$gte]': startTS === "" ? undefined : startTS

         } },
       
         );
    };
};

export const callMyBidFilterApi = (data, limit, skip, status, startTS) => {
    console.log("get other bid list startTS", startTS);

    return (_dispatch, _getState) => {
        return fetchClient.get(`${constants.API.BIDS_LIST.BIDS}`, {
        params:{
            accountId : data,
            '$limit': limit,
            '$skip': (skip * 10) - 10,
             status: status,
             'startTS[$gte]': startTS === "" ? undefined : startTS

         } }
         );
    };
};

export const callAddBidsApi = (data) => {
    return (_dispatch, _getState) => {
        return fetchClient.post(`${constants.API.BIDS.BIDS}`,
            data
        );
      
    };
};

export const callGetBidsDetailAPI = (id) => {
    return (_dispatch, _getState) => {
        return fetchClient.get(`${constants.API.BIDS.BIDS}${id}`,
        );
    };
}

export const callEditBidsAPI = (id, data) => {
    // console.log("iddd", id);
    return (_dispatch, _getState) => {
        return fetchClient.patch(`${constants.API.BIDS.BIDS}${id}`,
            data
        );
    };
}






