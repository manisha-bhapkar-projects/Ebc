import Account from "../../Pages/Account/Account";
import Device from "../../Pages/Device/Device";
import Trade from "../../Pages/Trade/Trade";
import constants from "../constants";
import accountImg from '../../Icons/Account.png';
import devicetImg from "../../Icons/Device.png";
import tradeImg from "../../Icons/Trade.png";
import TradeMenu from "../../Pages/TradeMenu/TradeMenu";
import Offers from "../../Pages/Offers/Offers";
import offerImg from "../../Icons/Offer.png";
import Bids from "../../Pages/Bids/Bids";
import approverImg from "../../Icons/Approver.png";


export const sidebar = [
    {
        title: "Account",
        path: constants.ROUTE.SIDEBAR.ACCOUNT,
        component: Account,
        image: accountImg,
        cName:"",
        sidebar: true,
        children:[]
    },
    {
        title:"Device",
        path: constants.ROUTE.SIDEBAR.DEVICE,
        image: devicetImg,
        component:Device,
        cName:"",
        sidebar:true,
        children:[]
    },
    {
        title:"Offers",
        path: constants.ROUTE.SIDEBAR.OFFERS,
        image: offerImg,
        component:Offers,
        cName:"",
        sidebar: true,
        children:[]
    },
    {
        title:"Bids",
        path: constants.ROUTE.SIDEBAR.BIDS,
        image: offerImg,
        component:Bids,
        cName:"",
        sidebar: true,
        children:[]
    },
    {
        title:"Trade",
        path: constants.ROUTE.SIDEBAR.TRADE,
        image: tradeImg,
        component:TradeMenu,
        cName:"",
        sidebar: true,
        children:[]
    }
]


export const approver_sidebar = [
    {
        title: "Approver Menu",
        image: approverImg,
        cName:"",
        sidebar: true,
        children:[]
    },
    
 
]



