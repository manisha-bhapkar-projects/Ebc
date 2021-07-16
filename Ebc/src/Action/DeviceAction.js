import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";


// import axios from "axios";
// import { getAuthToken } from "../utils/storage/index";
import io from 'socket.io-client'
import feathers from '@feathersjs/client'
import auth from '@feathersjs/authentication-client'
import { getAuthToken } from "../utils/storage";

// const rest = require("@feathersjs/rest-client");
// var app = feathers();
// var restClient = feathers.rest('http://feathers-api.com');

// const token = getAuthToken();
// config.headers.Authorization = token ? `Bearer ${token}` : "";
// return config;

// function setContent(req, res, next) {
//     res.setHeader('content-type', 'text/plain');
//     res.end();
//   }
// export const callDevice = () => {
//   const header = new Headers();
//   header.Authorization = token ? `Bearer ${token}` : "";

//   var restClient = rest("https://ebc-api-dev.sysopsnetwork.com", {
//     headers: header,
//   });
//   console.log("header", header);

//   app.configure(restClient.axios(axios));
  
//   console.log("app", app.service("devices"));
//   return (_dispatch) => {
//     console.log("_dispatch", _dispatch);
//     app
//       .service("devices")
//       .find()
//       .then((res) => {
//         console.log("res", res);
//       });
//     app.service("devices").find( {connection:{Authorization:restClient}} ) 
//   };
// };

// const restClient = rest('http://other-feathers-api.com', {
//   headers: {
//     Authorization: 'Bearer <Token for other-feathers-api.com>'
//   }
// })






// Feather js start


// export const callDeviceListApi = (limit, skip, total) => {
//   return (_dispatch, _getState) => {
    
//     const socket = io('https://ebc-api-dev.sysopsnetwork.com');
//     const app = feathers();
//     app.configure(feathers.socketio(socket))

//     // app.configure(auth({
//     //   authorization : 'Bearer ' + getAuthToken()
//     // }))

//     try{
//       const arr = app.service('devices').find();
//       console.log("FEATHER ",arr);
        
//     }catch(error){
//       console.log(error)
//     }
//     return fetchClient.get(`${constants.API.DEVICE.DEVICE}`, {
//       limit: limit,
//       skip: skip,
//       total: total,
//     });
//   };
// };


// feather end

export const callDeviceListApi = (limit, skip) => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.DEVICE_LIST.DEVICE}`, 
    {
      params: {
        '$limit': limit,
        '$skip': (skip * 10) - 10,
      },
    }
    );
  };
};

export const callAddDeviceApi = (data) => {
  console.log("Add Device data", data);
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.DEVICE.DEVICE}`, data);
  };
};

export const callGetDeviceDetailAPI = (id) => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.DEVICE.DEVICE}${id}`);
  };
};

export const callEditDeviceAPI = (id, data) => {
  return (_dispatch, _getState) => {
    return fetchClient.patch(`${constants.API.DEVICE.DEVICE}${id}`, data);
  };
};
