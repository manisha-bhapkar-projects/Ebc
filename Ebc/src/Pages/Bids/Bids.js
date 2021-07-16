import React, { useState, useEffect } from "react";
import CardListTable from "../../Components/CardListTable/CardListTable";
import { Link, useHistory } from "react-router-dom";
import {
  callBidsListApi,
  callMyBidFilterApi,
  callOtherBidFilterApi,
} from "../../Action/BidsAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import AddBids from "./AddBids";
import EditBids from "./EditBids";
import moment from "moment";
import CustomeDropDown from "../../Components/CustomeDropDown/CustomeDropDown";
import {
  Scope_Listing,
  Scope_Listing_Status,
  Status_List,
  status,
} from "../../Components/staticDropdownData";
import { useLocation } from "react-router-dom";
import { getAccountData } from "../../utils/storage/index";
import AddTradeForBid from "../Trade/AddTradeForBid";
import HeaderComponent from "../../Components/HeaderComponent/HeaderComponent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  bids_action,
  bids_action_data,
} from "../../Components/staticDropdownData";
import Charts from "../Trade/TradeChart";
import BidsChart from "./BidsChart";
import ChartHeader from "../../Components/ChartHeader/ChartHeader";
import { chart_title } from "../../Components/staticDropdownData";
import CustomeFilterComponent from "../../Components/CustomeFilterComponent/CustomeFilterComponent";

const Bids = (props) => {
  const [checked, setChecked] = useState(false);
  const [bidsData, setBidsData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState();
  const [skip, setSkip] = useState(1);
  const [loading, setloading] = useState(false);
  const [isFlag, setIsFlag] = useState(false);
  const [chartFlag, setChartFlag] = useState(false);
  const [isFlagEdit, setIsEditFlag] = useState(false);
  const [selectedBid, setSelectedBid] = useState(0);
  const [id, setID] = useState("");
  const [statusId, setStatusID] = useState("");
  const [accountId, setAccountId] = useState("");
  const [start_date, setStartingDate] = useState();
  const [tradecol, setBidCol] = useState([]);
  const [bidId, setBidId] = useState("");
  const location = useLocation();
  const history = useHistory();
  const [updateFlag, setUpdateFlag] = useState(false);
  var accountData = getAccountData();
  const [path, setPath] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [startTS, setDate] = useState();
  const [actionID, setActionID] = useState("");

  var accountID = accountData._id;
  const Bid_Trade_Column = [
    {
      name: "BID ID",
      selector: "_id",
      right: false,
      grow: "7",
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
              onClick={() => handleEditBids(row._id)}
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
      cell: (row) => {
        return <div className="d-ellipsis d-row-ellipsis">{row.rate}</div>;
      },
    },
    {
      name: "AVAILABLE UNITS",
      selector: "availableKWH",
      grow: "4",
      cell: (row) => {
        return (
          <div className="d-ellipsis d-row-ellipsis">{row.availableKWH}</div>
        );
      },
    },
    {
      name: "START DATE",
      selector: "startTS",
      grow: "5",
      cell: (row) => {
        return (
          <>
            <p className="d-ellipsis d-row-ellipsis">
              {moment(row.startTS).format("yyyy-MM-DD")}
            </p>
          </>
        );
      },
    },

    {
      name: "STATUS",
      selector: "status",
      grow: "5",
      cell: (row) => {
        return <div className="d-ellipsis d-row-ellipsis">{row.status}</div>;
      },
    },
  ];

  useEffect(() => {
    console.log("status value", status[0].value);
    setBidCol(Bid_Trade_Column);
    getBidsList(limit, skip, status, startTS);
    setPath(location.pathname);
    console.log("accountID", accountID);
    console.log("chart_title", chart_title);
   
  }, []);

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

  const getBidsList = (limit, skip, startTS) => {
    if (id == 1) {
      setSkip(1);
      MyBidFilter(accountID, limit, skip, startTS);
    } else if (id == 2) {
      setSkip(1);
      OtherBidFilter(accountID, limit, skip, startTS);
    } else if (id == 3) {
      setSkip(1);
      getBidsListFilter(limit, skip, startTS);
    } else {
      setloading(true);
      setSkip(1);
      props
        .callBidsListApiAction(limit, skip)
        .then((res) => {
          console.log("Bids response", res);
          setBidsData(res.data.data);
          setBidId(res.data.data[0]._id);
          setAccountId(res.data.data[0].accountId);
          setLimit(res.data.limit);
          setTotal(res.data.total);
          setloading(false);
        })
        .catch((error) => {
          console.log(error);
          setloading(false);
        });
    }
  };

  const handlePageChange = (skip) => {
    setSkip(skip);
    getBidsList(limit, skip);
  };

  const handleEditBids = (id) => {
    setSelectedBid(id);
    setIsEditFlag(true);
  };

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

  const updateDropdown = (id) => {
    console.log("dropdown id", id);
    setID(id);
    if (id == 1) {
      MyBidFilter(accountID, limit, skip, undefined, startTS);
    }
    if (id == 2) {
      setBidCol([
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
                    className="d-ellipsis d-row-ellipsis"
                    checked={checked}
                    onChange={(e) => UpdateStatusCheckbox(row._id)}
                  />
                )}
              </>
            );
          },
        },
        {
          name: "BID ID",
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
          cell: (row) => {
            return <div className="d-ellipsis d-row-ellipsis">{row.rate}</div>;
          },
        },
        {
          name: "AVAILABLE UNITS",
          selector: "availableKWH",
          grow: "3",
          cell: (row) => {
            return (
              <div className="d-ellipsis d-row-ellipsis">
                {row.availableKWH}
              </div>
            );
          },
        },
        {
          name: "START DATE",
          selector: "startTS",
          grow: "7",
          cell: (row) => {
            return (
              <>
                <p className="d-ellipsis d-row-ellipsis">
                  {moment(row.startTS).format("yyyy-MM-DD")}
                </p>
              </>
            );
          },
        },

        {
          name: "STATUS",
          selector: "status",
          grow: "3",
          cell: (row) => {
            return (
              <div className="d-ellipsis d-row-ellipsis">{row.status}</div>
            );
          },
        },
      ]);
      OtherBidFilter(accountID, limit, skip, undefined, startTS);
    } else {
      setBidCol(Bid_Trade_Column);
    }
    if (id == 3) {
      getBidsListFilter(limit, skip, undefined, startTS);
    }
  };

  const MyBidFilter = (accountID, limit, skip, status, startTS) => {
    console.log(" my bid filter startTS", startTS);
    setloading(true);
    props
      .callMyBidFilterApiAction(accountID, limit, skip, status, startTS)
      .then((res) => {
        console.log("open status", res);
        setBidsData(res.data.data);
        setTotal(res.data.total);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const OtherBidFilter = (accountID, limit, skip, status, startTS) => {
    setloading(true);
    props
      .callOtherBidFilterApiAction(accountID, limit, skip, status, startTS)
      .then((res) => {
        setBidsData(res.data.data);
        setTotal(res.data.total);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getBidsListFilter = (limit, skip, status, startTS) => {
    setloading(true);
    props
      .callBidsListApiAction(limit, skip, status, startTS)
      .then((res) => {
        setBidsData(res.data.data);
        setTotal(res.data.total);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateStatusDropdown = (statusId) => {
    console.log("statusId", statusId);
    setStatusID(statusId);
    if (statusId == 1 && id == 1) {
      MyBidFilter(accountID, limit, skip, status[0].value, startTS);
    } else if (statusId == 2 && id == 1) {
      MyBidFilter(accountID, limit, skip, status[1].value, startTS);
    } else if (statusId == 3 && id == 1) {
      MyBidFilter(accountID, limit, skip, status[2].value, startTS);
    } else if (statusId == 4 && id == 1) {
      MyBidFilter(accountID, limit, skip, status[3].value, startTS);
    } else if (statusId == 5 && id == 1) {
      MyBidFilter(accountID, limit, skip, status[4].value, startTS);
    } else if (statusId == 6 && id == 1) {
      MyBidFilter(accountID, limit, skip, status[5].value, startTS);
    } else if (statusId == 1 && id == 2) {
      OtherBidFilter(accountID, limit, skip, status[0].value, startTS);
    } else if (statusId == 2 && id == 2) {
      OtherBidFilter(accountID, limit, skip, status[1].value, startTS);
    } else if (statusId == 3 && id == 2) {
      OtherBidFilter(accountID, limit, skip, status[2].value, startTS);
    } else if (statusId == 4 && id == 2) {
      OtherBidFilter(accountID, limit, skip, status[3].value, startTS);
    } else if (statusId == 5 && id == 2) {
      OtherBidFilter(accountID, limit, skip, status[4].value, startTS);
    } else if (statusId == 6 && id == 2) {
      OtherBidFilter(accountID, limit, skip, status[5].value, startTS);
    } else if (statusId == 1 && id == 3) {
      getBidsListFilter(limit, skip, status[0].value, startTS);
    } else if (statusId == 2 && id == 3) {
      getBidsListFilter(limit, skip, status[1].value, startTS);
    } else if (statusId == 3 && id == 3) {
      getBidsListFilter(limit, skip, status[2].value, startTS);
    } else if (statusId == 4 && id == 3) {
      getBidsListFilter(limit, skip, status[3].value, startTS);
    } else if (statusId == 5 && id == 3) {
      getBidsListFilter(limit, skip, status[4].value, startTS);
    } else if (statusId == 6 && id == 3) {
      getBidsListFilter(limit, skip, status[5].value, startTS);
    }
  };

  const UpdateStatusCheckbox = (id) => {
    setChecked(!checked);
    setUpdateFlag(true);
    setSelectedBid(id);
  };
  const BidColumn = [
    {
      name: "BID ID",
      selector: "_id",
      right: false,
      grow: "5",
      cell: (row) => {
        console.log("bid row", row);

        if (row.accountId !== accountID) {
          return <p className="d-ellipsis d-row-ellipsis">{row._id}</p>;
        } else {
          if (row.status == "cancelled" || row.status == "deleted") {
            return <p className="d-ellipsis d-row-ellipsis">{row._id}</p>;
          }
          return (
            <Link
              className="d-ellipsis d-row-ellipsis"
              onClick={() => handleEditBids(row._id)}
            >
              {row._id}
            </Link>
          );
        }
      },
    },

    {
      name: "BID KWH",
      selector: "bidKWH",
      grow: "3",
    },
    {
      name: "AVAILABLE KWH",
      selector: "availableKWH",
      grow: "5",
    },
    {
      name: "FILLED KWH",
      selector: "filledKWH",
      grow: "3",
    },
    {
      name: "RATE",
      selector: "rate",
      grow: "3",
    },
    {
      name: "STATUS",
      selector: "status",
      grow: "3",
    },
  ];
  const handleAddBids = () => {
    setIsFlag(true);
  };
  return isFlag ? (
    <AddBids />
  ) : isFlagEdit ? (
    <EditBids id={selectedBid} />
  ) : updateFlag ? (
    <AddTradeForBid id={selectedBid} onSubmitCall={() => props.changePage()} />
  ) : chartFlag ? (
    <BidsChart />
  ) : (
    <>
      <HeaderComponent />
      <CustomeFilterComponent
        title="Bids"
        handleChangeDate={handleChangeDate}
        start_date={start_date}
        Scope_Listing={Scope_Listing}
        id={id}
        status={status}
        statusId={statusId}
        updateStatusDropdown={updateStatusDropdown}
        bids_action={bids_action}
        actionID={actionID}
        updateActionDropdown={updateActionDropdown}
        updateDropdown={updateDropdown}
        handleAddBids={handleAddBids}
      />
      {/* <ChartHeader title={true} price="200" /> */}
      <CardListTable
        columns={path === "/trade" ? tradecol : BidColumn}
        data={bidsData}
        pending={loading}
        pagination={false}
        custompagination
        paginationServer={false}
        noDataString={"No data found"}
        pageNo={pageNo}
        totalListCount={total}
        paginationTotalRows={total}
        paginationPerPage={limit}
        onPageChangedCalled={handlePageChange}
        inputClassName="mt-2"
        className={path === "/trade" ? "bids_table adjust_TableCol" : ""}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callBidsListApiAction: callBidsListApi,
      callMyBidFilterApiAction: callMyBidFilterApi,
      callOtherBidFilterApiAction: callOtherBidFilterApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Bids);
