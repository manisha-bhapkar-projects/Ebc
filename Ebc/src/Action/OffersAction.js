import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";

export const callOffersListApi = (limit, skip, status, startTS) => {
    return (_dispatch, _getState) => {
        return fetchClient.get(`${constants.API.OFFERS_LIST.OFFERS}`,
            {
                params: {
                  '$limit': limit,
                  '$skip': (skip * 10) - 10,
                   status: status,
                  'startTS[$gte]': startTS === "" ? undefined : startTS

                },
              });
    };
};


export const callOtherOfferFilterApi = (data, limit, skip, status, startTS) => {
    return (_dispatch, _getState) => {
        return fetchClient.get(`${constants.API.OFFERS_LIST.OFFERS}`, {
        params:{
            'accountId[$ne]' : data,
            '$limit': limit,
            '$skip': (skip * 10) - 10,
             status: status,
             'startTS[$gte]': startTS === "" ? undefined : startTS

         } }
         );
    };
};

export const callMyOfferFilterApi = (data, limit, skip, status, startTS) => {
    return (_dispatch, _getState) => {
        return fetchClient.get(`${constants.API.OFFERS_LIST.OFFERS}`, {
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

export const callAddOffersApi = (data) => {
    return (_dispatch, _getState) => {
        return fetchClient.post(`${constants.API.OFFERS.OFFERS}`,
            data
        );
    };
};

export const callGetOffersDetailAPI = (id) => {
    return (_dispatch, _getState) => {
        return fetchClient.get(`${constants.API.OFFERS.OFFERS}${id}`,
        );
    };
}

export const callEditOffersAPI = (id, data) => {
    console.log("iddd", id);
    return (_dispatch, _getState) => {
        return fetchClient.patch(`${constants.API.OFFERS.OFFERS}${id}`,
            data
        );
    };
}






