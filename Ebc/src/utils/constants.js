let API_URL = 'https://ebc-api-dev.sysopsnetwork.com/';

console.log(window.location.origin);
if(window.location.origin == 'https://ebc-qa.sysopsnetwork.com' || 
window.location.origin == 'http://ebc-frontend-qa.s3-website.us-east-2.amazonaws.com'){
API_URL = 'https://ebc-api-qa.sysopsnetwork.com/';
}


// const API_URL = process.env.REACT_APP_API_URL;



// console.log(" process.env",  process.env);
// const API_URL_DEV = process.env.REACT_APP_API_URL;
// const API_URL_QA = process.env.REACT_APP_API_URL;

    

export default {
    API: {
        BASEURL: {
            URL: API_URL,
        },
        LOGIN: {
            LOGIN: "/authentication",
            SIGNUP: "/accounts/",
            ORG_LIST: "/orgs",
        },
        ACCOUNT: {
            ACCOUNT_DETAILS: "/accounts/",
        },
        DEVICE: {
            DEVICE: "/devices/",
        },
        DEVICE_LIST: {
            DEVICE: "/devices",
        },
        OFFERS: {
            OFFERS: "/offers/",
        },
        OFFERS_LIST: {
            OFFERS: "/offers",
        },
        BIDS: {
            BIDS: "/bids/",
        },
        BIDS_LIST: {
            BIDS: "/bids",
        },
        BIDS_FILTER: {
            BIDS_FILTER: "/bids",
        },
        TRADE:{
            TRADE:"/trades/"
        },
        TRADELIST:{
            TRADE:"/trades"
        },
       
    },

    APPROVER_LOGIN:{
        LOGIN:"https://ebc-approvers-dev.sysopsnetwork.com/authentication"
    },


    STORAGE: {
        AUTH: {
            TOKEN: "auth-token",
            REF_TOKEN: "refresh-token",
            ACCOUNT_DATA: "account-data",
            ORG_ID: "org_id",
            APPROVER_TOKEN:"/approver-token",
            APPROVER_ACCOUNT_DATA:"/approver-account-data"
        },
    },
    ROUTE: {
        LOGIN: {
            LOGIN: "/",
            REGISTRATION: "/registration",

        },
        SIDEBAR: {
            DEVICE: "/device",
            ACCOUNT: "/account",
            TRADE: "/trade",
            OFFERS:"/offers",
            BIDS:"/bids"
        },
        DEVICE: {
            ADD_DEVICE: "/device/add-device",
            EDIT_DEVICE: "/device/edit-device/",
            EDIT_DEVICE_BY_ID: "/device/edit-device/:id",
        },

        OFFERS: {
            ADD_OFFERS: "/offers/add-offers",
            EDIT_OFFERS: "/offers/edit-offers/",
            EDIT_OFFERS_BY_ID: "/offers/edit-offers/:id",
        },

        BIDS: {
            ADD_BIDS: "/bids/add-bids",
            EDIT_BIDS: "/bids/edit-bids/",
            EDIT_BIDS_BY_ID: "/bids/edit-bids/:id",
        },
        
        TRADE: {
           BIDS_TRADE:"/trade/bids",
           ADD_BIDS_TRADE:"/trade/bids/add-bids",
           EDIT_BIDS_TRADE:"/trade/bids/edit-bids",
           EDIT_BIDS_TRADE_BY_ID:"/trade/bids/edit-bids/:id",

        }
    },
};

