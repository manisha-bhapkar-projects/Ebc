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
} from "../../Components/staticDropdownData";
import { Line } from "react-chartjs-2";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { callBidsListApi } from "../../Action/BidsAction";
import {
  bids_action,
  bids_action_data,
} from "../../Components/staticDropdownData";
import Bids from "../Bids/Bids";
import AddBids from "../Bids/AddBids";
import ChartHeader from "../../Components/ChartHeader/ChartHeader";

const BidsChart = (props) => {
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
    getBidsList();
  }, []);

  const getBidsList = () => {
    props
      .callBidsListApiAction()
      .then((res) => {
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
    // labels: ["Jan", "Feb", "March", "April", "May"],
    // labels: units.map((k) => k.availableKWH),

    // datasets: [
    //   // {
    //   //     label: 'Unit Price ($)',
    //   //     data:units.map(k => k.rate),
    //   //     borderColor:['rgba(255, 206, 86, 0.2)'],
    //   //     backgroundColor:['rgba(255, 206, 86, 0.2)'],
    //   //     pointBackgroundColor:'rgba(255, 206, 86, 0.2)',
    //   //     pointBorderColor:'rgba(255, 206, 86, 0.2)',

    //   // },
    //   {
    //     label: "Available Units (KWH)",
    //     // data:[1, 3, 4, 6, 2],
    //     data: units.map((k) => k.availableKWH),
    //     borderColor: ["rgba(54, 162, 235, 0.2)"],
    //     backgroundColor: ["rgba(54, 162, 235, 0.2)"],
    //     pointBackgroundColor: "rgba(54, 162, 235, 0.2)",
    //     pointBorderColor: "rgba(54, 162, 235, 0.2)",
    //   },

    // ],
    labels: units.map((k) => k.availableKWH),
    datasets: [
      // {
      //     label: 'Unit Price ($)',
      //     data:units.map(k => k.rate),
      //     borderColor:['rgba(255, 206, 86, 0.2)'],
      //     backgroundColor:['rgba(255, 206, 86, 0.2)'],
      //     pointBackgroundColor:'rgba(255, 206, 86, 0.2)',
      //     pointBorderColor:'rgba(255, 206, 86, 0.2)',

      // },
      {
        label: "Rate ($)",
        // data:[1, 3, 4, 6, 2],
        data: units.map((k) => k.rate),
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
      text: "Bids Graph Representation",
    },
    // scales: {
    //   yAxes: [
    //     {
    //       ticks: {
    //         // min: 0,
    //         // max:10,
    //         // stepsize:1
    //         // callback: value => `$${(value)}`
    //       },
    //     },
    //   ],
    // },

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
      setListFlag(true);
    } else if (actionID == 3) {
      setChartFlag(true);
    }
  };
  return isFlag ? (
    <AddBids />
  ) : listFlag ? (
    <Bids />
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
            data={bids_action}
            placeholder="Action"
            value={bids_action_data(actionID)}
            onSelect={(e) => {
              updateActionDropdown(e);
            }}
          />
        </div>
      </div>
      <ChartHeader
      title={true}
      price="200"/>
      {/* <div className="row mt-1">
        <div className="col">
          <small>
            <b className="chart-title">Total Units</b>
          </small>
          <br />
          <small> 4545</small>
        </div>
        <div className="col">
          <small>
            <b className="chart-title">Mean</b>
          </small>
          <br />
          <small> 465</small>
        </div>
        <div className="col">
          <small>
            <b className="chart-title">Median</b>
          </small>
          <br />
          <small> 351</small>
        </div>
        <div className="col">
          <small>
            <b className="chart-title">Mode</b>
          </small>
          <br />
          <small> 154</small>
        </div>
        <div className="col">
          <small>
            <b className="chart-title">High Price</b>
          </small>
          <br />
          <small> 531</small>
        </div>
        <div className="col">
          <small>
            <b className="chart-title">Low Price</b>
          </small>
          <br />
          <small> 454</small>
        </div>
      </div> */}
      <div className="mt-3">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callBidsListApiAction: callBidsListApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(BidsChart);
