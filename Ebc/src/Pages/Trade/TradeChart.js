import React, { useEffect, useState } from "react";
import HeaderComponent from "../../Components/HeaderComponent/HeaderComponent";
import moment from "moment";
import DatePicker from "react-datepicker";
import CustomeDropDown from "../../Components/CustomeDropDown/CustomeDropDown";
import {
  Status_List,
  status,
  Scope_Listing,
  Scope_Listing_Status,
  trade_action_data,
  trade_action,
} from "../../Components/staticDropdownData";
import { Line } from "react-chartjs-2";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { callTradeApi } from "../../Action/TradeAction";
import Trade from "./Trade";
import ChartHeader from "../../Components/ChartHeader/ChartHeader";

const TradeChart = (props) => {
  const [start_date, setStartingDate] = useState();
  const [createdAt, setDate] = useState();
  const [id, setID] = useState("");
  const [statusId, setStatusID] = useState("");
  const [units, setUnits] = useState([]);
  const [availableKWH, setAvailableKWH] = useState([]);
  const [actionID, setActionID] = useState("");
  const [chartFlag, setChartFlag] = useState(false);
  const [listFlag, setListFlag] = useState(false);
  const [isFlag, setIsFlag] = useState(false);

  useEffect(() => {
    getTradeList();
  }, []);

  const getTradeList = () => {
    props
      .callTradeApiAction()
      .then((res) => {
        console.log("trade res", res);
        setUnits(res.data.data);
        setAvailableKWH(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
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

  const data = {
    labels: units.map((k) => k.matchKWH),
    datasets: [
      {
        label: "Rate ($)",
        data: units.map((k) => k.matchRate),
        borderColor: ["rgba(54, 162, 235, 0.2)"],
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        pointBackgroundColor: "rgba(54, 162, 235, 0.2)",
        pointBorderColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };
  const options = {
    title: {
      display: true,
      text: "Trade Graph Representation",
    },

    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Rate ($)",
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Available Units (KWH)",
          },
        },
      ],
    },
  };

  const updateActionDropdown = (actionID) => {
    console.log("actionID", actionID);
    setActionID(actionID);
    if (actionID == 1) {
      setIsFlag(true);
    } else if (actionID == 2) {
      setChartFlag(true);
    }
  };
  return isFlag ? (
    <Trade />
  ) : (
    <div>
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
          data={Scope_Listing}
          placeholder="Select Scope"
          value={Scope_Listing_Status(id)}
        />

        <CustomeDropDown
          className="dropdown_custom bids_dropdown"
          data={status}
          placeholder="Select Status"
          value={Status_List(statusId)}
        />

        <div>
          <CustomeDropDown
            className="dropdown_custom_bids"
            data={trade_action}
            placeholder="Action"
            value={trade_action_data(actionID)}
            onSelect={(e) => {
              updateActionDropdown(e);
            }}
          />
        </div>
      </div>
      <ChartHeader title={true} price="400" />
      <div className="mt-3">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callTradeApiAction: callTradeApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(TradeChart);
