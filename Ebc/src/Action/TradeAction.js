import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";

export const callTradeApi = (limit, skip, status, createdAt) => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.TRADELIST.TRADE}`, 
    {
      params: {
        '$limit': limit,
        '$skip': (skip * 10) - 10,
         status: status === "" ? undefined : status,
         'createdAt[$gte]': createdAt === "" ? undefined : createdAt

      },
    });
  };
};

export const callAddTradeApi = (data) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.TRADELIST.TRADE}`, data);
  };
};

export const callGetTradeDetailAPI = (id) => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.TRADE.TRADE}${id}`);
  };
};


export const callOtherTradeFilterApi = (data, limit, skip, status, createdAt) => {
  console.log("data in trade other action",data);
  console.log("skip",skip);
  return (_dispatch, _getState) => {
      return fetchClient.get(`${constants.API.TRADELIST.TRADE}`, {
      params:{
        '$and[0][sellerAccountId][$ne]': data,
        '$and[1][buyerAccountId][$ne]' : data,
        '$limit': limit,
        '$skip': (skip * 10) - 10,
        status: status === "" ? undefined : status,
         'createdAt[$gte]': createdAt === "" ? undefined : createdAt


       } }
       );
  };
};

export const callMyTradeFilterApi = (data, limit, skip, status, createdAt) => {
  console.log("data in trade my action",data);
  console.log("skip",skip);
  return (_dispatch, _getState) => {
      return fetchClient.get(`${constants.API.TRADELIST.TRADE}`, {
      params:{
          '$or[0][sellerAccountId]': data,
          '$or[1][buyerAccountId]' : data,
          '$limit': limit,
          '$skip': (skip * 10) - 10,
          status: status === "" ? undefined : status,
           'createdAt[$gte]': createdAt === "" ? undefined : createdAt


        } }
       );
  };
};