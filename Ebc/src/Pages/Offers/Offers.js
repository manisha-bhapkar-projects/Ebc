import React, { useState, useEffect } from "react";
import CardListTable from "../../Components/CardListTable/CardListTable";
import { Link, useHistory } from "react-router-dom";
import {
  callOffersListApi,
  callOtherOfferFilterApi,
  callMyOfferFilterApi,
} from "../../Action/OffersAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import AddOffers from "../Offers/AddOffers";
import moment from "moment";
import CustomeDropDown from "../../Components/CustomeDropDown/CustomeDropDown";
import {
  Scope_Listing_For_Offers,
  Scope_Listing_Offers,
  Status_List,
  status,
  offer_action_data,
  offer_action,
} from "../../Components/staticDropdownData";
import TextFieldComponent from "../../Components/TextFieldComponent/TextFieldComponent";
import EditOffer from "./EditOffer";
import { useLocation } from "react-router-dom";
import { getAccountData } from "../../utils/storage/index";
import AddTradeForOffer from "../Trade/AddTradeForOffer";
import { callAccountDetailApi } from "../../Action/AccountAction";
import HeaderComponent from "../../Components/HeaderComponent/HeaderComponent";
import DatePicker from "react-datepicker";
import Charts from "../Trade/TradeChart";
import OfferChart from "./OfferChart";
import ChartHeader from "../../Components/ChartHeader/ChartHeader";
import CustomeFilterComponent from "../../Components/CustomeFilterComponent/CustomeFilterComponent";

const Offers = (props) => {
  const [checked, setChecked] = useState(false);
  const [offersData, setOffersData] = useState([]);
  const [offerCol, setOfferCol] = useState([]);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState();
  const [skip, setSkip] = useState(1);
  const [loading, setloading] = useState(false);
  const [isFlag, setIsFlag] = useState(false);
  const [id, setID] = useState("");
  const [isFlagEdit, setIsEditFlag] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const [start_date, setStartingDate] = useState();
  const [statusId, setStatusID] = useState("");
  const [updateFlag, setUpdateFlag] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState("");
  const [path, setPath] = useState("");
  var accountData = getAccountData();
  const [startTS, setDate] = useState();
  const [actionID, setActionID] = useState("");
  const [chartFlag, setChartFlag] = useState(false);

  var accountID = accountData._id;

  useEffect(() => {
    setOfferCol(Offers_Trade_Column);
    getOffersList(limit, skip, status, startTS);
    setPath(location.pathname);
  }, []);

  const updateStatusDropdown = (statusId) => {
    setStatusID(statusId);

    if (statusId == 1 && id == 1) {
      MyOfferFilter(accountID, limit, skip, status[0].value, startTS);
    } else if (statusId == 2 && id == 1) {
      MyOfferFilter(accountID, limit, skip, status[1].value, startTS);
    } else if (statusId == 3 && id == 1) {
      MyOfferFilter(accountID, limit, skip, status[2].value, startTS);
    } else if (statusId == 4 && id == 1) {
      MyOfferFilter(accountID, limit, skip, status[3].value, startTS);
    } else if (statusId == 5 && id == 1) {
      MyOfferFilter(accountID, limit, skip, status[4].value, startTS);
    } else if (statusId == 6 && id == 1) {
      MyOfferFilter(accountID, limit, skip, status[5].value, startTS);
    } else if (statusId == 1 && id == 2) {
      OtherOfferFilter(accountID, limit, skip, status[0].value, startTS);
    } else if (statusId == 2 && id == 2) {
      OtherOfferFilter(accountID, limit, skip, status[1].value, startTS);
    } else if (statusId == 3 && id == 2) {
      OtherOfferFilter(accountID, limit, skip, status[2].value, startTS);
    } else if (statusId == 4 && id == 2) {
      OtherOfferFilter(accountID, limit, skip, status[3].value, startTS);
    } else if (statusId == 5 && id == 2) {
      OtherOfferFilter(accountID, limit, skip, status[4].value, startTS);
    } else if (statusId == 6 && id == 2) {
      OtherOfferFilter(accountID, limit, skip, status[5].value, startTS);
    } else if (statusId == 1 && id == 3) {
      getOfferListData(limit, skip, status[0].value, startTS);
    } else if (statusId == 2 && id == 3) {
      getOfferListData(limit, skip, status[1].value, startTS);
    } else if (statusId == 3 && id == 3) {
      getOfferListData(limit, skip, status[2].value, startTS);
    } else if (statusId == 4 && id == 3) {
      getOfferListData(limit, skip, status[3].value, startTS);
    } else if (statusId == 5 && id == 3) {
      getOfferListData(limit, skip, status[4].value, startTS);
    } else if (statusId == 6 && id == 3) {
      getOfferListData(limit, skip, status[5].value, startTS);
    }
  };

  const getOffersList = (limit, skip, startTS) => {
    if (id == 1) {
      setSkip(1);
      MyOfferFilter(accountID, limit, skip, startTS);
    } else if (id == 2) {
      setSkip(1);
      OtherOfferFilter(accountID, limit, skip, startTS);
    } else if (id == 3) {
      setSkip(1);
      getOfferListData(limit, skip, startTS);
    } else {
      setSkip(1);
      getOfferListData(limit, skip);
    }
  };

  const handlePageChange = (skip) => {
    setSkip(skip);
    getOffersList(limit, skip);
  };
  const handleAddOfferClick = () => {
    setIsFlag(true);
  };

  const UpdateStatusCheckbox = (id) => {
    console.log("checkbox", id);
    setChecked(!checked);
    setUpdateFlag(true);
    setSelectedOffer(id);
  };

  const MyOfferFilter = (accountID, limit, skip, status, startTS) => {
    setloading(true);
    props
      .callMyOfferFilterApiAction(accountID, limit, skip, status, startTS)
      .then((res) => {
        console.log("My bid", res);
        setOffersData(res.data.data);
        setTotal(res.data.total);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const OtherOfferFilter = (accountID, limit, skip, status, startTS) => {
    setloading(true);
    props
      .callOtherOfferFilterApiAction(accountID, limit, skip, status, startTS)
      .then((res) => {
        console.log("other bid", res);
        setOffersData(res.data.data);
        setTotal(res.data.total);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getOfferListData = (limit, skip, status, startTS) => {
    setloading(true);
    props
      .callOffersListApiAction(limit, skip, status, startTS)
      .then((res) => {
        setOffersData(res.data.data);
        setLimit(res.data.limit);
        setTotal(res.data.total);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateDropdown = (id) => {
    setID(id);
    if (id == 1) {
      MyOfferFilter(accountID, limit, skip, undefined, startTS);
    }
    if (id == 2) {
      setOfferCol([
        {
          name: "Accept",
          selector: "_id",
          right: false,
          grow: "0",
          cell: (row) => {
            return (
              <>
                {row.status === "cancelled" ? (
                  ""
                ) : (
                  <input
                    type="checkbox"
                    checked={checked}
                    className="d-ellipsis d-row-ellipsis"
                    onChange={(e) => UpdateStatusCheckbox(row._id)}
                  />
                )}
              </>
            );
          },
        },

        {
          name: "OFFER ID",
          selector: "_id",
          right: false,
          grow: "8",
          cell: (row) => {
            return (
              <>
                <p className="d-ellipsis d-row-ellipsis">{row._id}</p>
              </>
            );
          },
        },
        {
          name: "RATE",
          selector: "rate",
          grow: "2",
        },
        {
          name: "AVAILABLE UNITS",
          selector: "availableUnits",
          grow: "4",
          cell: (row) => {
            return <>{row.availableKWH}</>;
          },
        },
        {
          name: "START DATE",
          selector: "startTS",
          grow: "7",
          cell: (row) => {
            return <>{moment(row.startTS).format("yyyy-MM-DD")}</>;
          },
        },
        {
          name: "STATUS",
          selector: "status",
          grow: "3",
        },
      ]);
      OtherOfferFilter(accountID, limit, skip, undefined, startTS);
    } else {
      setOfferCol(Offers_Trade_Column);
    }
    if (id == 3) {
      getOfferListData(limit, skip, undefined, startTS);
    }
  };

  const handleEditOffer = (id) => {
    setSelectedOffer(id);
    setIsEditFlag(true);
  };

  const handleChangeDate = (date) => {
    console.log("date", date);
    setStartingDate(date);
    const new_date = moment(date).format("MM-DD-yyyy");
    console.log("new_date", new_date);
    if (date == null) {
      setDate("");
    } else {
      setDate(new_date);
    }
  };
  const OfferColumn = [
    {
      name: "OFFER ID",
      selector: "_id",
      right: false,
      grow: "5",
      cell: (row) => {
        console.log("offer row", row);

        if (row.accountId !== accountID) {
          return <p className="d-ellipsis d-row-ellipsis">{row._id}</p>;
        } else {
          if (row.status == "cancelled" || row.status == "deleted") {
            return <p className="d-ellipsis d-row-ellipsis">{row._id}</p>;
          }
          return (
            <Link
              className="d-ellipsis d-row-ellipsis"
              onClick={() => handleEditOffer(row._id)}
            >
              {row._id}
            </Link>
          );
        }
      },
    },
    {
      name: "OFFER KWH",
      selector: "offerKWH",
      grow: "4",
    },
    {
      name: "AVAILABLE KWH",
      selector: "availableKWH",
      grow: "5",
    },
    {
      name: "FILLED KWH",
      selector: "filledKWH",
      grow: "4",
    },
    {
      name: "RATE",
      selector: "rate",
      grow: "3",
    },
    {
      name: "STATUS",
      selector: "status",
      grow: "2",
    },
  ];

  const Offers_Trade_Column = [
    {
      name: "OFFER ID",
      selector: "_id",
      right: false,
      grow: "5",
      cell: (row) => {
        if (row.accountId !== accountID) {
          return <p className="d-ellipsis d-row-ellipsis">{row._id}</p>;
        } else {
          if (row.status == "cancelled" || row.status == "deleted") {
            return <p className="d-ellipsis d-row-ellipsis">{row._id}</p>;
          }
          return (
            <Link
              className="d-ellipsis d-row-ellipsis"
              onClick={() => handleEditOffer(row._id)}
            >
              {row._id}
            </Link>
          );
        }
      },
    },
    {
      name: "RATE",
      selector: "rate",
      grow: "2",
    },
    {
      name: "AVAILABLE KWH",
      selector: "availableKWH",
      grow: "5",
    },
    {
      name: "START DATE",
      selector: "startTS",
      grow: "4",
      cell: (row) => {
        return <>{moment(row.startTS).format("yyyy-MM-DD")}</>;
      },
    },
    {
      name: "STATUS",
      selector: "status",
      grow: "4",
    },
  ];

  const updateActionDropdown = (actionID) => {
    console.log("actionID", actionID);
    setActionID(actionID);
    if (actionID == 1) {
      setIsFlag(true);
    } else if (actionID == 3) {
      setChartFlag(true);
    } else {
      return;
    }
  };
 
  return isFlag ? (
    <AddOffers />
  ) : isFlagEdit ? (
    <EditOffer id={selectedOffer} />
  ) : updateFlag ? (
    <AddTradeForOffer
      id={selectedOffer}
      onSubmitCall={() => props.changePage()}
    />
  ) : chartFlag ? (
    <OfferChart />
  ) : (
    <>
      <HeaderComponent />
      <div className="title-page-content d-flex justify-content-between mr-0 mt-2">
        {location.pathname !== "/trade" ? <h5>Offers</h5> : <></>}
        <>
          <div className="datepicker">
            <DatePicker
              dateFormat="MM-dd-yyyy"
              className="form-control text-field-component custom_text_field"
              selected={start_date}
              placeholderText="Select Date"
              onChange={(date) => handleChangeDate(date)}
            />
          </div>

          <CustomeDropDown
            className="dropdown_custom bids_dropdown"
            data={Scope_Listing_For_Offers}
            placeholder="Select Scope"
            value={Scope_Listing_Offers(id)}
            onSelect={(e) => {
              updateDropdown(e);
            }}
          />

          <CustomeDropDown
            className="dropdown_custom bids_dropdown"
            data={status}
            placeholder="Select Status"
            value={Status_List(statusId)}
            onSelect={(e) => {
              updateStatusDropdown(e);
            }}
          />
        </>
     
        <button
          className="btn btn-icon-text custom-btn"
          onClick={handleAddOfferClick}
        >
          Add Offers
        </button>
        {/* <div>
          <CustomeDropDown
            className="dropdown_custom_bids"
            data={offer_action}
            placeholder="Action"
            value={offer_action_data(actionID)}
            onSelect={(e) => {
              updateActionDropdown(e);
            }}
          />
        </div> */}
      </div>

      {/* <ChartHeader title={true} price="300" /> */}
      <CardListTable
        columns={location.pathname === "/trade" ? offerCol : OfferColumn}
        data={offersData}
        pending={loading}
        pagination={false}
        custompagination
        paginationServer={false}
        noDataString={"No data found"}
        totalListCount={total}
        paginationTotalRows={total}
        paginationPerPage={limit}
        onPageChangedCalled={handlePageChange}
        inputClassName="mt-2"
        className={
          location.pathname === "/trade" ? "bids_table adjust_TableCol" : ""
        }
      />
    </>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callOffersListApiAction: callOffersListApi,
      callOtherOfferFilterApiAction: callOtherOfferFilterApi,
      callMyOfferFilterApiAction: callMyOfferFilterApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Offers);
