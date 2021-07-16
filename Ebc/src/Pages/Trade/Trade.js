import React, { useState, useEffect } from "react";
import CardListTable from "../../Components/CardListTable/CardListTable";
import { Link, useHistory } from "react-router-dom";
import {
  callTradeApi,
  callOtherTradeFilterApi,
  callMyTradeFilterApi,
} from "../../Action/TradeAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Scope_Listing_For_Trade,
  Scope_Listing_Status_Trade,
  status,
  Status_List_for_trade,
  status_for_trade,
  trade_action_data,
  trade_action,
} from "../../Components/staticDropdownData";
import CustomeDropDown from "../../Components/CustomeDropDown/CustomeDropDown";
import moment from "moment";
import TradeDetails from "./TradeDetails";
import { getAccountData } from "../../utils/storage/index";
import { callAccountDetailApi } from "../../Action/AccountAction";
import HeaderComponent from "../../Components/HeaderComponent/HeaderComponent";
import DatePicker from "react-datepicker";
import TradeChart from "./TradeChart";
import ChartHeader from "../../Components/ChartHeader/ChartHeader";

const Trade = (props) => {
  const [tradeData, setTradeData] = useState([]);
  const [tradecol, setTradeCol] = useState([]);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState();
  const [skip, setSkip] = useState(1);
  const [loading, setloading] = useState(false);
  const [isId, setId] = useState(1);
  const [start_date, setStartingDate] = useState();
  const [statusId, setStatusID] = useState("");
  const history = useHistory();
  const [isDetailsFlag, setIsDetailsFlag] = useState(false);
  const [tradeId, setTradeId] = useState("");
  const [path, setPath] = useState("");
  const [id, setID] = useState("");
  const [createdAt, setDate] = useState();
  const [actionID, setActionID] = useState("");
  const [chartFlag, setChartFlag] = useState(false);
  const [isFlag, setIsFlag] = useState(false);

  var accountData = getAccountData();
  var accountID = accountData._id;

  useEffect(() => {
    setTradeCol(TradeColumn);
    getTradeList(limit, skip, status, createdAt);
  }, []);

  const getTradeList = (limit, skip, status, createdAt) => {
    if (id == 1) {
      setSkip(1);
      MyTradeData(accountID, limit, skip, status, createdAt);
    } else if (id == 2) {
      setSkip(1);
      OtherTradeData(accountID, limit, skip, status, createdAt);
    } else if (id == 3) {
      setSkip(1);
      getTradeListData(limit, skip);
    } else {
      setSkip(1);
      getTradeListData(limit, skip);
    }
  };

  const handlePageChange = (skip) => {
    setSkip(skip);
    getTradeList(limit, skip);
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

  const MyTradeData = (accountID, limit, skip, status, createdAt) => {
    props
      .callMyTradeFilterApiAction(accountID, limit, skip, status, createdAt)
      .then((res) => {
        setTotal(res.data.total);
        setTradeData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const OtherTradeData = (accountID, limit, skip, status, createdAt) => {
    props
      .callOtherTradeFilterApiAction(accountID, limit, skip, status, createdAt)
      .then((res) => {
        setTradeData(res.data.data);
        setTotal(res.data.total);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTradeListData = (limit, skip, status, createdAt) => {
    setloading(true);
    props
      .callTradeApiAction(limit, skip, status, createdAt)
      .then((res) => {
        setTradeData(res.data.data);
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
      MyTradeData(accountID, limit, skip, undefined, createdAt);
    } else if (id == 2) {
      OtherTradeData(accountID, limit, skip, undefined, createdAt);
    } else if (id == 3) {
      getTradeListData(limit, skip, undefined, createdAt);
    }
  };

  const updateStatusDropdown = (statusId) => {
    setStatusID(statusId);
    if (statusId == 1 && id == 1) {
      MyTradeData(accountID, limit, skip, status_for_trade[0].value, createdAt);
    } else if (statusId == 1 && id == 2) {
      OtherTradeData(
        accountID,
        limit,
        skip,
        status_for_trade[0].value,
        createdAt
      );
    } else if (statusId == 1 && id == 3) {
      getTradeListData(limit, skip, status_for_trade[0].value, createdAt);
    }
  };

  const handleTradeDetails = (id) => {
    setIsDetailsFlag(true);
    setTradeId(id);
  };
  const updateActionDropdown = (actionID) => {
    console.log("actionID", actionID);
    setActionID(actionID);
    if (actionID == 1) {
      setIsFlag(true);
    } else if (actionID == 2) {
      setChartFlag(true);
    } else {
      return;
    }
  };

  const TradeColumn = [
    {
      name: "TRADE ID",
      selector: "tradeID",
      right: false,
      grow: "5",
      cell: (row) => {
        return (
          <>
            <Link onClick={() => handleTradeDetails(row._id)}>{row._id}</Link>
          </>
        );
      },
    },
    {
      name: "SELLER ACCOUNT ID",
      selector: "sellerAccountId",
      grow: "5",
    },
    {
      name: "BUYER ACCOUNT ID",
      selector: "buyerAccountId",
      grow: "5",
    },

    {
      name: "STATUS",
      selector: "status",
      grow: "2",
    },
    {
      name: "OFFER ID",
      selector: "offerId",
      grow: "4",
    },
    {
      name: "BID ID",
      selector: "bidId",
      grow: "3",
    },
  ];
  return isDetailsFlag ? (
    <TradeDetails id={tradeId} />
  ) : chartFlag ? (
    <TradeChart />
  ) : (
    <>
      <HeaderComponent />
      <div className="title-page-content d-flex justify-content-between mr-0 mt-2">
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
          data={Scope_Listing_For_Trade}
          placeholder="Select Scope"
          value={Scope_Listing_Status_Trade(id)}
          onSelect={(e) => {
            updateDropdown(e);
          }}
        />

        <CustomeDropDown
          className="dropdown_custom bids_dropdown"
          data={status_for_trade}
          placeholder="Select Status"
          value={Status_List_for_trade(statusId)}
          onSelect={(e) => {
            updateStatusDropdown(e);
          }}
        />
        {/* <div>
          <CustomeDropDown
            className="dropdown_custom_bids"
            data={trade_action}
            placeholder="Action"
            value={trade_action_data(actionID)}
            onSelect={(e) => {
              updateActionDropdown(e);
            }}
          />
        </div> */}
      </div>
      {/* <ChartHeader title={true} price="400" /> */}

      <CardListTable
        columns={tradecol}
        data={tradeData}
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
        className="bids_table adjust_TableCol"
      />
    </>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callTradeApiAction: callTradeApi,
      callOtherTradeFilterApiAction: callOtherTradeFilterApi,
      callMyTradeFilterApiAction: callMyTradeFilterApi,
      callAccountDetailApiAction: callAccountDetailApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Trade);
